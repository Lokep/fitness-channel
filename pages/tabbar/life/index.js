const LIST = [
  {
    id: 1,
    imgUrl: "../../../assets/images/img_environment.png",
    title: "",
    path: "/pages/environment/index/index",
  },
  {
    id: 2,
    imgUrl: "../../../assets/images/img_diet.png",
    title: "",
    path: "/pages/dish/index/index",
  },
  {
    id: 3,
    imgUrl: "../../../assets/images/img_sport.png",
    title: "",
    path: "/pages/sport/clock/index",
  },
  {
    id: 4,
    imgUrl: "../../../assets/images/img_sleep.png",
    title: "",
    path: "/pages/sleep/index/index",
  },
];

Page({
  data: {
    LIST,
  },

  handleNavigation({ currentTarget }) {
    const { path } = currentTarget.dataset;

    if (path) {
      wx.navigateTo({
        url: path,
      });
    }
  },
});
