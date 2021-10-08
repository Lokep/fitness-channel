import { getCourseList } from "../../../api/course";

Page({
  data: {
    pageNum: 0,
    pageSize: 10,
    isDone: true,
    canPullDown: true,
    courseList: [],
  },

  onShow() {
    this.getCourseList();
  },

  onReachBottom() {
    this.getCourseList();
  },

  getCourseList() {
    const { pageNum, pageSize, isDone, canPullDown, courseList } = this.data;

    if (!isDone) return;

    if (!canPullDown) {
      wx.showToast({
        title: "已加载全部",
        icon: "none",
      });
      return;
    }

    getCourseList({
      pageNum: pageNum + 1,
      pageSize,
    }).then((res) => {
      if (res.result === 1) {
        const list = res.data || [];

        this.setData({
          courseList: [...courseList, ...list],
          canPullDown: list.length >= pageSize,
          isDone: true,
        });
      }
    });
  },
});
