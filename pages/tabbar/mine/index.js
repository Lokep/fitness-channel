import dayjs from "dayjs";
import { getMemberInfo, updateMemberInfo } from "../../../api/index";
import { getCache } from "../../../utils/util";

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

const app = getApp();

Page({
  data: {
    MENU,
    userInfo: {},
    hasPhone: true,
  },

  async onShow() {
    await app.getOpenId();
    await this.getUserInfo();

    this.checkHasPhone();
  },

  checkHasPhone() {
    const { mobile = "" } = this.data.userInfo;
    if (!mobile) {
      this.setData({
        hasPhone: false,
      });
    }
  },

  onClose() {
    this.setData({
      hasPhone: true,
    });
  },

  getUserInfo() {
    const { memberId } = getCache("loginInfo");
    return getMemberInfo({
      memberId,
    }).then((res) => {
      if (res.result === 1) {
        let userInfo = res.data;

        if (userInfo.birth) {
          userInfo.birth = dayjs(userInfo.birth).format("YYYY-MM-DD");
        }

        this.setData({
          userInfo,
        });
      }
    });
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
        this.updateUserInfo(res.userInfo);
      },
    });
  },

  updateUserInfo({ nickName, avatarUrl }) {
    const { userInfo } = this.data;
    updateMemberInfo({
      ...userInfo,
      wechatName: nickName,
      headPic: avatarUrl,
    }).then((res) => {
      if (res.result === 1) {
        this.getUserInfo();
      }
    });
  },

  getPhoneNumber(e) {
    if (e.detail.errMsg && e.detail.errMsg.indexOf("deny") > -1) {
      wx.showToast({
        title: "您已拒绝了手机号授权",
        icon: "none",
      });
      return;
    }

    const { memberId } = getCache("loginInfo");

    getUserPhone({
      ...e.detail,
      memberId,
    }).then((res) => {
      if (res.result === 1) {
        this.getUserInfo();
      }
    });
  },
});
