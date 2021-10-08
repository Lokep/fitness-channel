import { getDietHabbit, updateDietHabbit } from "../../../api/dish";
import { getCache } from "../../../utils/util";

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
    habbitList: [],
    saltyList: [
      {
        label: "少盐",
        isActive: false,
      },
      {
        label: "正常盐",
        isActive: false,
      },
      {
        label: "多盐",
        isActive: false,
      },
    ],
    sugarList: [
      {
        label: "无糖",
        isActive: false,
      },
      {
        label: "少糖",
        isActive: false,
      },
      {
        label: "中糖",
        isActive: false,
      },
      {
        label: "多糖",
        isActive: false,
      },
    ],
    hotList: [
      {
        label: "无辣",
        isActive: false,
      },
      {
        label: "微辣",
        isActive: false,
      },
      {
        label: "中辣",
        isActive: false,
      },
      {
        label: "多辣",
        isActive: false,
      },
    ],
  },

  onShow() {
    this.getDietHabbit();
  },

  getDietHabbit() {
    const { memberId = "" } = getCache("loginInfo");
    getDietHabbit({
      memberId,
    }).then((res) => {
      if (res.result === 1) {
        this.mergeHabbitList(res.data);
      }
    });
  },

  mergeHabbitList(obj) {
    const { salty, sweet, hot, preference } = obj;
    const { sugarList, saltyList, hotList, HABBIT_LIST } = this.data;

    const sugarIndex = sugarList.findIndex((item) => item.label === sweet);
    const saltyIndex = saltyList.findIndex((item) => item.label === salty);
    const hotIndex = hotList.findIndex((item) => item.label === hot);

    const preferenceList = preference.split(",");

    let habbitList = [];

    HABBIT_LIST.map((item) => {
      const index = preferenceList.indexOf(item.label);

      habbitList.push({
        ...item,
        isActive: index > -1,
      });
    });

    if (sugarIndex > -1) {
      sugarList[sugarIndex].isActive = true;
    }
    if (saltyIndex > -1) {
      saltyList[saltyIndex].isActive = true;
    }
    if (hotIndex > -1) {
      hotList[hotIndex].isActive = true;
    }

    this.setData({
      saltyList,
      sugarList,
      hotList,
      habbitList,
    });
  },

  changeSugarOption({ currentTarget }) {
    const { index } = currentTarget.dataset;
    const { sugarList } = this.data;

    if (index > -1) {
      sugarList.map((item) => {
        item.isActive = false;
        return item;
      });
      sugarList[index].isActive = true;
      this.setData({
        sugarList,
      });
    }
  },

  changeSaltyOption({ currentTarget }) {
    const { index } = currentTarget.dataset;
    const { saltyList } = this.data;

    if (index > -1) {
      saltyList.map((item) => {
        item.isActive = false;
        return item;
      });
      saltyList[index].isActive = true;
      this.setData({
        saltyList,
      });
    }
  },

  changeHotOption({ currentTarget }) {
    const { index } = currentTarget.dataset;
    const { hotList } = this.data;

    if (index > -1) {
      hotList.map((item) => {
        item.isActive = false;
        return item;
      });
      hotList[index].isActive = true;
      this.setData({
        hotList,
      });
    }
  },

  changeHabbitOption({ currentTarget }) {
    const { index } = currentTarget.dataset;
    const { habbitList } = this.data;
    const { isActive } = habbitList[index];

    habbitList[index].isActive = !isActive;
    this.setData({
      habbitList,
    });
  },

  saveDietHabbit() {
    const { sugarList, saltyList, hotList, habbitList } = this.data;
    const { label: sweet } = sugarList.find((item) => !!item.isActive);
    const { label: salty } = saltyList.find((item) => !!item.isActive);
    const { label: hot } = hotList.find((item) => !!item.isActive);
    const preference = [];
    habbitList.map((item) => {
      if (!!item.isActive) {
        preference.push(item.label);
      }
    });

    updateDietHabbit({
      sweet,
      salty,
      hot,
      preference: preference.join(","),
    }).then((res) => {
      if (res.result === 1) {
        wx.showToast({
          title: "保存成功",
          icon: "none",
        });

        let timeOut = setTimeout(() => {
          wx.navigateBack(), clearTimeout(timeOut);
        }, 1000);
      }
    });
  },
});
