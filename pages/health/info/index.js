import dayjs from "dayjs";
import { getMemberInfo, updateMemberInfo } from "../../../api/index";
import { formatDate, getCache } from "../../../utils/util";

const SEX_OPTIONS = [
  {
    label: "男",
    value: "1",
  },
  {
    label: "女",
    value: "2",
  },
];

Page({
  data: {
    show: false,
    SEX_OPTIONS,
    dateOptions: {
      minDate: new Date(1950, 10, 1).getTime(),
      maxDate: new Date().getTime(),
    },
    sex: "",
    birthDate: "",
    height: "",
    standardWeight: "",
    bmi: "",
    weight: "",
    type: "", // 用于区分展示日期组件还是性别下拉框
    userInfo: {},
    timeStamp: new Date(1990, 0, 1).getTime(),
  },

  onShow() {
    this.getMemberInfo();
  },

  onUnload() {
    this.updateMemberInfo();
  },

  getMemberInfo() {
    const { memberId = "" } = getCache("loginInfo");
    getMemberInfo({ memberId }).then((res) => {
      if (res.result === 1 || res.data) {
        const {
          sex,
          birth: birthDate,
          height,
          bmi,
          weight,
          name,
          standardWeight,
        } = res.data;
        this.setData({
          userInfo: res.data,
          sex: {
            value: sex,
            label: sex === 1 ? "男" : "女",
          },
          birthDate: dayjs(birthDate).format("YYYY-DD-MM"),
          timeStamp: new Date(birthDate).getTime(),
          height,
          bmi,
          weight,
          name,
          standardWeight,
        });
      }
    });
  },

  updateMemberInfo() {
    const { memberId = "" } = getCache("loginInfo");
    const {
      sex,
      birthDate,
      height,
      standardWeight,
      bmi,
      weight,
      name,
      userInfo,
    } = this.data;
    updateMemberInfo({
      ...userInfo,
      id: 1,
      memberId,
      sex: sex.value,
      birth: dayjs(birthDate).format("YYYY-MM-DD hh:mm:ss"),
      height,
      standardWeight,
      bmi,
      weight,
      name,
    });
  },

  handleCellTap({ currentTarget }) {
    const { type } = currentTarget.dataset;
    console.log(type);
    this.setData({ type, show: true });
  },
  handleDateSelector(e) {
    const timeStamp = e.detail;
    const birthDate = dayjs(timeStamp).format("YYYY-MM-DD");
    this.setData({
      timeStamp,
      birthDate,
    });
    this.hidePopup();
  },
  handleSexSelector(e) {
    console.log(e);
    this.setData({
      sex: e.detail.value,
    });
    this.hidePopup();
    // this.updateMemberInfo()
  },
  hidePopup() {
    this.setData({
      type: "",
      show: false,
    });
  },
  handleInput({ currentTarget, detail }) {
    const { type = "" } = currentTarget.dataset;
    if (type) {
      this.setData({
        [`${type}`]: detail.value,
      });
    }

    this.checkBMI();
  },

  checkBMI() {
    const { weight, height } = this.data;
    if (weight && height) {
      const standardWeight = height - 105;
      let process = weight / ((height / 100) * (height / 100));
      const bmi = Math.round(process * 10) / 10;
      this.setData({ bmi, standardWeight });
    } else {
      this.setData({ bmi: null, standardWeight: null });
    }
  },
});
