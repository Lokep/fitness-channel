import { checkIsDietHabbitComplete, getDietPlanList } from "../../../api/dish";
import { checkIsMemberInfoComplete } from "../../../api/index";
import { getCache } from "../../../utils/util";

Page({
  data: {
    planList: [],
    isDone: false,
    pageNum: 0,
    pageSize: 10,
    total: 0,
    isMemberInfoComplete: false,
    isDietHabbitComplete: false,
  },

  onShow() {
    this.checkIsMemberInfoComplete();
    this.getDietPlanList();
  },

  checkIsMemberInfoComplete() {
    const { memberId = "" } = getCache("loginInfo");
    checkIsMemberInfoComplete({
      memberId,
    }).then((res) => {
      if (res.result === 1) {
        this.setData({
          isMemberInfoComplete: res.data,
        });
      }
    });
  },

  checkIsDietHabbitComplete() {
    const { memberId = "" } = getCache("loginInfo");
    checkIsDietHabbitComplete({ memberId }).then((res) => {
      if (res.result === 1) {
        this.setData({
          isDietHabbitComplete: res.data,
        });
      }
    });
  },

  getDietPlanList() {
    this.setData({ isDone: false });
    getDietPlanList({
      pageNum: 1,
      pageSize: 10,
    }).then((res) => {
      if (res.result === 1) {
        this.setData({
          planList: res.data,
          total: res.total,
        });
      }

      this.setData({
        isDone: true,
      });
    });
  },
});
