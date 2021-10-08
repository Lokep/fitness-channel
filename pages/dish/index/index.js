Page({
  data: {
    hasPlan: true,
    dayType: 0,
  },

  handleDayTypeChange({ currentTarget }) {
    const { index } = currentTarget.dataset;
    this.setData({
      dayType: index,
    });
  },
});
