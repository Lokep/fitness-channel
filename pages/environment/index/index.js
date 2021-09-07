const ENV_ARGS = [
  {
    type: "AIR",
    icon: "/assets/images/icon_air.png",
    label: "空气质量",
    value: "",
    warn: false,
  },
  {
    type: "PM2.5",
    icon: "/assets/images/icon_pm.png",
    label: "PM2.5",
    value: "",
    warn: true,
  },
  {
    type: "FORMALDEHYDE",
    icon: "/assets/images/icon_formaldehyde.png",
    label: "甲醛",
    value: "0.01优",
    warn: false,
  },
];

Page({
  data: {
    envArgs: ENV_ARGS,
  },
  handleRoomNavigation({ currentTarget }) {
    const { room } = currentTarget.dataset;
    wx.navigateTo({
      url: "/pages/environment/room/index?room=" + room,
    });
  },
});
