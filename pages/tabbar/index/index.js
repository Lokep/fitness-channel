import { getMemberInfo } from "../../../api/index";
import { checkIsDietHabbitComplete, getTodayDietPlan } from "../../../api/dish";
import { getCache } from "../../../utils/util";
import { getSportInfo } from "../../../api/sport";

Page({
  data: {
    dietPlan: null,
    isDietPlanComplete: false,

    height: null,
    bmi: null,
    weight: null,
    blood: null,
    standardWeight: null,

    suggestConsume: null,
    consumeFeat: null,
    needConsume: null,
  },

  onShow() {
    Promise.all([
      /** *********** 饮食相关 ************************ */
      this.getTodayDietPlan(),
      this.checkIsDietHabbitComplete(),

      /********************************************** */
      this.getMemberInfo(),
      this.getSportInfo(),
    ]);
  },

  /** 饮食相关 */
  getTodayDietPlan() {
    const { memberId = "" } = getCache("loginInfo");
    return getTodayDietPlan({
      memberId,
    }).then((res) => {
      if (res.result === 1) {
        this.setData({
          dietPlan: res.data,
        });
      }
    });
  },

  checkIsDietHabbitComplete() {
    const { memberId = "" } = getCache("loginInfo");
    return checkIsDietHabbitComplete({
      memberId,
    }).then((res) => {
      if (res.result === 1) {
        this.setData({
          isDietPlanComplete: res.data,
        });
      }
    });
  },

  handleDietPlanNavigation() {
    // const { memberId } = getCache('loginInfo')
    const { isDietPlanComplete } = this.data;
    if (isDietPlanComplete) {
      wx.navigateTo({ url: "/pages/dish/index/index" });
    } else {
      wx.navigateTo({ url: "/pages/health/index/index" });
    }
  },
  /** **************************************** */
  getMemberInfo() {
    const { memberId = "" } = getCache("loginInfo");
    /** "blood|血型 1:A 2:B 3:AB 4:O 5:未知" */
    const enum_blood = ["--", "A", "B", "AB", "O", "未知"];

    return getMemberInfo({ memberId }).then((res) => {
      if (res.result === 1 || res.data) {
        const {
          height = "",
          bmi = "",
          weight = "",
          blood = "",
          standardWeight = "",
        } = res.data || {};
        this.setData({
          height,
          bmi,
          weight,
          blood: enum_blood[blood],
          standardWeight,
        });
      }
    });
  },

  getSportInfo() {
    const { memberId = "" } = getCache("loginInfo");
    getSportInfo({
      memberId,
    }).then((res) => {
      if (res.result === 1 || res.data) {
        // "suggestConsume|推荐消耗": 1000,
        // "consumeFeat|已消耗热量": 500,
        // "needConsume|还需消耗热量": 500,
        const {
          suggestConsume = "",
          consumeFeat = "",
          needConsume = "",
        } = res.data || {};
        this.setData({
          suggestConsume,
          consumeFeat,
          needConsume,
        });
      }
    });
  },
});
