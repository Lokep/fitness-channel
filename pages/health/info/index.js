import { formatDate } from "../../../utils/util";

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
    idealWeight: "",
    bmi: "",
    weight: "",
    type: "", // 用于区分展示日期组件还是性别下拉框
  },

  handleCellTap({ currentTarget }) {
    const { type } = currentTarget.dataset;
    console.log(type);
    this.setData({ type, show: true });
  },
  handleDateSelector(e) {
    const timeStamp = e.detail;
    const birthDate = formatDate(new Date(timeStamp));
    this.setData({
      timeStamp,
      birthDate,
    });
    this.hidePopup();
  },
  handleSexSelector(e) {
    this.setData({
      sex: e.detail.value,
    });
    this.hidePopup();
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
        [`${type}`]: detail,
      });
    }
  },
});
