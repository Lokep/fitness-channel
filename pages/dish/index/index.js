import dayjs from "dayjs";
import { getDietRecordList } from "../../../api/dish";
import { getCache } from "../../../utils/util";
Page({
  data: {
    hasPlan: true,
    dayType: 0,
    count: 0,

    beginTime: "",
    endTime: "",
    sportRecords: [],
  },
  /* 为了领取添加计划返回后刷新数据 */
  onShow() {
    let { count } = this.data;
    count += 1;
    this.setData({
      count,
    });
    this.getDietRecordList();
  },
  handleDayTypeChange({ currentTarget }) {
    const { index } = currentTarget.dataset;
    this.setData(
      {
        dayType: Number(index),
      },
      () => {
        if (index) {
          this.getDietRecordList();
        }
      }
    );
  },
  /* 饮食打卡 */
  getDietRecordList() {
    const { dayType: current } = this.data;
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

    return getDietRecordList({
      beginTime,
      endTime,
      memberId,
    }).then((res) => {
      let sportRecords = res.data || [];
      // sportRecords.reverse();
      if (res.result === 1) {
        this.setData({
          average: res.average || 0,
          sportRecords,
          beginTime,
          endTime,
        });
      }
    });
  },
});
