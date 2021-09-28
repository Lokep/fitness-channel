const HABBIT_LIST = [
  {
    id: 0,
    label: "饮食油腻",
    icon: "/assets/images/icon_diet_greasy.png",
    value: 0,
  },
  {
    id: 1,
    label: "爱吃零食",
    icon: "/assets/images/icon_diet_snacks.png",
    value: 1,
  },
  {
    id: 2,
    label: "常喝饮料",
    desc: "(含糖、碳酸)",
    icon: "/assets/images/icon_diet_drinks.png",
    value: 2,
  },
  {
    id: 3,
    label: "经常喝酒",
    icon: "/assets/images/icon_diet_beer.png",
    value: 3,
  },
  {
    id: 4,
    label: "爱吃肥肉",
    icon: "/assets/images/icon_diet_meat.png",
    value: 4,
  },
  {
    id: 5,
    label: "爱吃坚果",
    desc: "(腰果、杏仁)",
    icon: "/assets/images/icon_diet_nut.png",
    value: 5,
  },
  {
    id: 6,
    label: "常吃宵夜",
    desc: "(每周一次)",
    icon: "/assets/images/icon_diet_nightsnack.png",
    value: 6,
  },
  {
    id: 7,
    label: "吃饭很晚",
    icon: "/assets/images/icon_diet_late.png",
    desc: "(晚上八点后)",
    value: 7,
  },
  {
    id: 8,
    label: "吃饭很快",
    icon: "/assets/images/icon_diet_fast.png",
    value: 8,
  },
];

Page({
  data: {
    HABBIT_LIST,
  },
});
