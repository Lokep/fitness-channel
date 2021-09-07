const enum_state = {
  primary: "primary",
  warn: "warn",
  danger: "danger",
};

const ARGS = [
  {
    type: "AIR",
    label: "空气质量",
    icon: "/assets/images/icon_air.png",
    value: "优",
    state: "",
  },
  {
    type: "PM2.5",
    label: "PM2.5质量浓度",
    icon: "/assets/images/icon_pm.png",
    value: "",
    state: "",
  },
  {
    type: "FORMALDEHYDE",
    label: "甲醛",
    icon: "/assets/images/icon_formaldehyde.png",
    value: "",
    state: "warn",
  },
  {
    type: "0.3um",
    label: "0.3微米颗粒物",
    icon: "/assets/images/icon_grain.png",
    value: "",
    state: "",
  },
  {
    type: "0.5um",
    label: "0.5微米颗粒物",
    icon: "/assets/images/icon_grain.png",
    value: "",
    state: "",
  },
  {
    type: "1um",
    label: "1微米颗粒物",
    icon: "/assets/images/icon_grain.png",
    value: "",
    state: "",
  },
  {
    type: "2.5um",
    label: "2.5微米颗粒物",
    icon: "/assets/images/icon_grain.png",
    value: "",
    state: "",
  },
  {
    type: "5um",
    label: "5微米颗粒物",
    icon: "/assets/images/icon_grain.png",
    value: "",
    state: "",
  },
  {
    type: "10um",
    label: "10微米颗粒物",
    icon: "/assets/images/icon_grain.png",
    value: "",
    state: "",
  },
  {
    type: "pm",
    label: "PM2.5质量浓度",
    icon: "/assets/images/icon_pm.png",
    value: "",
    state: "",
  },
  {
    type: "co2",
    label: "二氧化碳浓度",
    icon: "/assets/images/icon_co2.png",
    value: "",
    state: "danger",
  },
  {
    type: "temperature",
    label: "温度",
    icon: "/assets/images/icon_temperature.png",
    value: "",
    state: "",
  },
  {
    type: "humidity",
    label: "湿度",
    icon: "/assets/images/icon_humidity.png",
    value: "",
    state: "",
  },
];

Page({
  data: {
    list: ARGS,
  },
});
