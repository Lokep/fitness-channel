const MENU = [
  {
    id: 1,
    imgUrl: "../../../assets/images/icon_mine_health.png",
    title: "健康信息",
    path: "/pages/health/info/index",
  },
  {
    id: 2,
    imgUrl: "../../../assets/images/icon_mine_environment.png",
    title: "我的环境",
    path: "/pages/environment/index/index",
  },
  {
    id: 3,
    imgUrl: "../../../assets/images/icon_mine_diet.png",
    title: "我的饮食计划",
    path: "/pages/dish/index/index",
  },
  {
    id: 4,
    imgUrl: "../../../assets/images/icon_mine_sport.png",
    title: "我的运动计划",
    path: "/pages/sport/index/index",
  },
  {
    id: 5,
    imgUrl: "../../../assets/images/icon_mine_sport.png",
    title: "我的课程",
    path: "/pages/course/index/index",
  },
];

Page({
  data: {
    MENU,
  },

  handleMenuNavigation({ currentTarget }) {
    const { url = "" } = currentTarget.dataset;
    if (!url) return;

    wx.navigateTo({ url });
  },
});
