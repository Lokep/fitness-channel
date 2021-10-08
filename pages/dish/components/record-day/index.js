import dayjs from "dayjs";
import {
  getClockRecordByDate,
  getDietPlanByDate,
  getDietRecordByDate,
} from "../../../../api/dish";
import { getCache } from "../../../../utils/util";

const MONTH_TIME_STAMP = 30 * 24 * 3600 * 1000;

Component({
  options: {
    styleIsolation: "shared",
  },

  properties: {},

  data: {
    mealType: "1",
    dietPlan: {},
    show: false,
    date: handleDate(new Date()),
    minDate: new Date(2020, 8, 17).getTime(),
    maxDate: new Date().getTime() + MONTH_TIME_STAMP,
    dayCount: 0,
    dayNum: 0,
    planId: null,
    planName: null,
    mealRecords: new Array(3),
  },

  attached() {
    this.getDietRecordByDate();
    this.getDietPlanByDate();
    this.getClockRecordByDate();
  },

  methods: {
    handleMealTypeChange(e) {
      this.setData({
        mealType: e.detail.name,
      });
      this.getClockRecordByDate();
    },

    showCalendar() {
      this.setData({
        show: true,
      });
    },

    onClose() {
      this.setData({
        show: false,
      });
    },
    onConfirm(e) {
      console.log(e);
      this.setData({
        date: handleDate(e.detail),
      });
      this.onClose();
    },

    getClockRecordByDate() {
      const { mealType, date, mealRecords } = this.data;
      const { memberId } = getCache("loginInfo");
      getClockRecordByDate({
        memberId,
        mealType,
        date: handleDate(date),
      }).then((res) => {
        if (res.result === 1) {
          mealRecords[Number(mealType) - 1] = res.data;
          this.setData({
            mealRecords,
          });
        }
      });
    },

    getDietPlanByDate() {
      const { date } = this.data;
      const { memberId } = getCache("loginInfo");
      getDietPlanByDate({
        memberId,
        date: handleDate(date),
      }).then((res) => {
        if (res.result === 1) {
          const { dayCount, dayNum, planId, planName } = res.data;

          this.setData({
            dayCount,
            dayNum,
            planId,
            planName,
          });
        }
      });
    },

    getDietRecordByDate() {
      const { date } = this.data;
      const { memberId } = getCache("loginInfo");
      getDietRecordByDate({
        memberId,
        date: handleDate(date),
      }).then((res) => {
        if (res.result === 1) {
          const {
            suggestTake,
            canTake,
            heat,
            protein,
            suggestProtein,
            fat,
            suggestFat,
            carbonWater,
            suggestCarbon,
          } = res.data || {};
          this.setData({
            dietPlan: {
              suggestTake,
              canTake,
              heat,
              protein,
              suggestProtein,
              fat,
              suggestFat,
              carbonWater,
              suggestCarbon,
            },
          });
        }
      });
    },

    handleRecordDetailNavigation({ currentTarget }) {
      const { id } = currentTarget.dataset;
      wx.navigateTo({
        url: "/pages/dish/detail/index?id=" + id,
      });
    },
  },

  observers: {
    date(v) {
      this.attached();
      // this.getDietPlanByDate()
      // this.getClockRecordByDate();
    },
  },
});

function handleTime(date) {
  return dayjs(date).format("YYYY-MM-DD hh:mm:ss");
}

function handleDate(date) {
  return dayjs(date).format("YYYY-MM-DD");
}
