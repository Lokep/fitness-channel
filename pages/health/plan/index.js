import { getDietPlanDetail, receiveDietPlan } from "../../../api/dish";
import { getCache, throttle } from "../../../utils/util";

const DIET_LIST = [
  {
    type: "BREAKFAST",
    title: "早餐",
    icon: "/assets/images/icon_diet_breakfast.png",
    content: "无糖豆浆(1杯)+面食(1碗)+水果(1份)",
    calories: ["热量 400千卡", "蛋白 2.7克", "碳水 0.7克", "脂肪 3.0克"],
  },
  {
    type: "LUNCH",
    title: "午餐",
    icon: "/assets/images/icon_diet_lunch.png",
    content: "无糖豆浆(1杯)+面食(1碗)+水果(1份)",
    calories: ["热量 400千卡", "蛋白 2.7克", "碳水 0.7克", "脂肪 3.0克"],
  },
  {
    type: "DINNER",
    title: "晚餐",
    icon: "/assets/images/icon_diet_dinner.png",
    content: "无糖豆浆(1杯)+面食(1碗)+水果(1份)",
    calories: ["热量 400千卡", "蛋白 2.7克", "碳水 0.7克", "脂肪 3.0克"],
  },
];

Page({
  data: {
    swiperCurrent: 0,
    id: null,
    DIET_LIST,
    info: {
      ruleList: [],
    },
    ruleListArr: [],
  },

  onLoad({ id = "" }) {
    if (id) {
      this.setData({
        id,
      });
      this.getDietPlanDetail();
    }
  },

  acceptPlan: throttle(() => {}, 1000),

  getDietPlanDetail() {
    const { id = "" } = this.data;
    if (id) {
      getDietPlanDetail({
        id,
      }).then((res) => {
        let ruleListArr = [];
        if (res.plan.ruleList instanceof Array) {
          res.plan.ruleList.forEach((item) => {
            const idx = item.mealType;
            ruleListArr[idx - 1] = ruleListArr[idx - 1] || [];
            ruleListArr[idx - 1].push(item);
          });
        }
        if (res.result === 1) {
          this.setData({
            info: res.plan,
            ruleListArr,
            // ruleListArr:arraySplit(res.plan.ruleList, 3)
          });
        }
      });
    }
  },

  receiveDietPlan() {
    const { id = "" } = this.data;
    const { memberId = "" } = getCache("loginInfo");
    if (id) {
      receiveDietPlan({
        id,
        memberId,
      }).then((res) => {
        if (res.result === 1) {
          wx.showToast({
            title: "领取成功",
            icon: "none",
          });

          let timeOut = setTimeout(() => {
            wx.navigateBack();
            clearTimeout(timeOut);
          }, 1000);
        }
      });
    }
  },
  checkOtherPlans() {
    const url = "pages/health/index/index";
    const routes = getCurrentPages();
    console.log(routes);
    if (routes.length < 2) {
      wx.navigateTo({
        url: "/" + url,
      });
    } else {
      const { route } = routes[routes.length - 2];
      if (route === url) {
        wx.navigateBack();
      } else {
        wx.navigateTo({
          url: "/" + url,
        });
      }
    }
  },
  bindchange(e) {
    const { current: swiperCurrent } = e.detail;
    console.log(e);
    this.setData({
      swiperCurrent,
    });
  },
  prev() {
    let { swiperCurrent } = this.data;
    if (swiperCurrent > 0) {
      swiperCurrent -= 1;
      this.setData({
        swiperCurrent,
      });
    }
  },
  next() {
    let { swiperCurrent, ruleListArr } = this.data;
    if (swiperCurrent < ruleListArr.length - 1) {
      swiperCurrent += 1;
      this.setData({
        swiperCurrent,
      });
    }
  },
});
