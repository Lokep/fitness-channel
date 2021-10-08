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
    id: null,
    DIET_LIST,
    info: {},
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
      getDietPlanDetail({ id }).then((res) => {
        if (res.result === 1) {
          this.setData({
            info: res.data,
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
});
