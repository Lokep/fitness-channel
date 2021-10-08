import dayjs from "dayjs";
import { getClockRecordByDate } from "../../../../api/dish";
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
  },

  attached() {
    this.getClockRecordByDate();
  },

  methods: {
    handleMealTypeChange(e) {
      this.setData({
        mealType: e.detail.name,
      });
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
      const { mealType, date } = this.data;
      const { memberId } = getCache("loginInfo");
      getClockRecordByDate({
        memberId,
        mealType,
        date: handleTime(date),
      }).then((res) => {
        if (res.result === 1) {
        }
      });
    },
  },

  observers: {
    date(v) {
      this.getClockRecordByDate();
    },
  },
});

function handleTime(date) {
  return dayjs(date).format("YYYY-MM-DD hh:mm:ss");
}

function handleDate(date) {
  return dayjs(date).format("YYYY-MM-DD");
}
