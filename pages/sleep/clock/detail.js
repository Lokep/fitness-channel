// pages/sport/clock/index.js
import dayjs from "dayjs";
import {
  getCache
} from "../../../utils/util";
import {
  getSleepRecordsByDate,
} from "../../../api/sleep"
Page({
  data: {
    date: dayjs().format("YYYY-MM-DD"),
    id: "",
    picUrl: "",
    describe: "",
    hour: "",
    minute: "",
    advice: ""
  },
  onLoad: function ({
    date
  }) {
    this.setData({
      date
    })
    this.getSleepRecordsByDate()
  },
  /* 按日期获取日睡眠记录 */
  getSleepRecordsByDate() {
    const {
      memberId
    } = getCache("loginInfo");
    const {
      date
    } = this.data;
    getSleepRecordsByDate({
      date,
      memberId,
    }).then(res => {
      this.setData({
        ...res.data
      })
    })
  },
})
