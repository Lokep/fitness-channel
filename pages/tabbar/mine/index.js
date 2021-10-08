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
    path: "/pages/sport/clock/index",
  },
  {
    id: 5,
    imgUrl: "../../../assets/images/icon_mine_course.png",
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

  getUserProfile() {
    wx.getUserProfile({
      desc: "用于完善会员资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.getUserInfo(res.userInfo);
      },
    });
  },

  getUserInfo(e) {
    console.log(e);
  },

  getUserPhone(e) {
    if (e.detail.errMsg && e.detail.errMsg.indexOf("deny") > -1) {
      wx.showToast({
        title: "您已拒绝了手机号授权",
        icon: "none",
      });
      return;
    }
  },
});
