import { CDN_PREFIX, TOOL_LIST, DT_SERVICE } from "../../../utils/constant";

const [ADULT, REFINE] = DT_SERVICE;

Page({
  data: {
    TOOL_LIST,
    DT_SERVICE: [ADULT, REFINE],
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
