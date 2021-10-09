import dayjs from "dayjs";
// import { drawChart } from "../../../utils/drawChart";
import { getCache } from "../../../utils/util";
import { getSleepRecordsByDate, getSleepRecords } from "../../../api/sleep";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    today: dayjs().format("YYYY-MM-DD"),
    todayInfo: null,

    // onInitChart: function () {},
    sportRecords: [],
    average: 0,
    averageArr: [],
    beginTime: "",
    endTime: "",
  },
  onLoad(options) {
    this.getDate();
  },
  onShow() {
    this.getDate();
  },
  async getDate() {
    this.getSleepRecordsByDate();
    await this.getSleepRecords();
    // onInitChart.call(this);
  },
  /* 日周月切换 ,以及 chart*/
  toggleSelect(e) {
    const { index: current } = e.currentTarget.dataset;

    this.setData(
      {
        current,
      },
      function () {
        if (current) {
          this.getSleepRecords();
          // onInitChart.call(this);
        }
      }
    );
  },
  /* 按日期获取日睡眠记录 */
  getSleepRecordsByDate() {
    const { memberId } = getCache("loginInfo");
    const { today: date } = this.data;
    getSleepRecordsByDate({
      date,
      memberId,
    }).then((res) => {
      this.setData({
        todayInfo: res.data,
      });
    });
  },
  /** 获取时间范围内的运动记录 */
  getSleepRecords() {
    const { current } = this.data;
    const { memberId } = getCache("loginInfo");
    let beginTime = "",
      endTime = "";
    // if (current) {
    beginTime = dayjs()
      .startOf(current === 1 ? "week" : "month")
      .format("YYYY-MM-DD");
    endTime = dayjs()
      .endOf(current === 1 ? "week" : "month")
      .format("YYYY-MM-DD");

    return getSleepRecords({
      beginTime,
      endTime,
      memberId,
    }).then((res) => {
      if (res.result === 1) {
        const average = res.average || 0;
        const averageArr = average.split("-");
        this.setData({
          average,
          averageArr,
          sportRecords: res.data || [],
          beginTime,
          endTime,
        });
      }
    });
    // }
  },
  toDetailView() {
    const {
      todayInfo: { id, hour, minute, date: date },
    } = this.data;
    if (hour == 0 || minute == 0) {
      wx.navigateTo({
        url: `/pages/sleep/clock/clock?id=${id}&date=${date}`,
      });
    } else {
      wx.navigateTo({
        url: `/pages/sleep/clock/detail?date=${date}`,
      });
    }
  },
});
