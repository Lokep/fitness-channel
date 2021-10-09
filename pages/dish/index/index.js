Page({
  data: {
    hasPlan: true,
    dayType: 0,
    count: 0,
  },
  /* 为了领取添加计划返回后刷新数据 */
  onShow() {
    let { count } = this.data;
    count += 1;
    this.setData({
      count,
    });
  },
  handleDayTypeChange({ currentTarget }) {
    const { index } = currentTarget.dataset;
    this.setData({
      dayType: index,
    });
  },
});
