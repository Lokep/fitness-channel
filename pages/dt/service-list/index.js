import { DT_SERVICE } from "../../../utils/constant";

Page({
  data: {
    DT_SERVICE,
  },

  handleServiceItem({ currentTarget }) {
    const { disable, url } = currentTarget.dataset;

    if (disable) {
      wx.showToast({
        title: "暂时无法享用该服务哦~",
        icon: "none",
      });
    } else {
      wx.navigateTo({ url });
    }
  },
});
