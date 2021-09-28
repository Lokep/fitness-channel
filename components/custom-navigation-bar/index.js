Component({
  options: {
    styleIsolation: "apply-shared",
  },
  properties: {
    background: {
      type: String,
      value: "rgba(255, 255, 255, 1)",
    },
    color: {
      type: String,
      value: "rgba(0, 0, 0, 1)",
    },
    title: {
      type: String,
      value: "安健宝",
    },

    fontSize: {
      type: Number,
      value: 13,
    },
    iconHeight: {
      type: Number,
      value: 19,
    },
    iconWidth: {
      type: Number,
      value: 58,
    },
  },
  attached() {
    this.checkRoutes();
    this.setNavigationBar();
    this.setStyle();
  },
  data: {
    isTabbar: true,
  },
  methods: {
    checkRoutes() {
      const routes = getCurrentPages();
      this.setData({
        isTabbar: routes.length == 1,
      });
    },
    setNavigationBar() {
      const { statusBarHeight, system } = wx.getSystemInfoSync();
      const { height, right, top, width } =
        wx.getMenuButtonBoundingClientRect();
      const isIOS = system.indexOf("iOS") > -1; // 44 /48
      const leftGap = `100vw - ${right}px`;
      const topGap = top - statusBarHeight;
      console.log(wx.getMenuButtonBoundingClientRect());
      this.setData({
        statusBarHeight,
        height,
        navigationHeight: (top - statusBarHeight) * 2 + height,
        leftGap,
        topGap,
        width,
      });
      this.triggerEvent("getNavigationStyle", {
        height: (top - statusBarHeight) * 2 + height + statusBarHeight,
      });
    },

    setStyle() {
      const { color, fontSize, iconHeight, iconWidth } = this.data;

      let textStyle = ["color:" + color, "font-size:" + fontSize + "px"].join(
        ";"
      );
      let iconStyle = [
        "width: " + iconWidth + "px",
        "height: " + iconHeight + "px",
      ].join(";");
      this.setData({
        textStyle,
        iconStyle,
      });
    },

    // 返回事件
    back() {
      wx.navigateBack({
        delta: 1,
      });
    },
    home() {
      const routes = getCurrentPages();
      const currentRoute = routes[routes.length - 1];
      const item = LIST.find((item) => (item.path = currentRoute)) || {};
      if (Object.keys(item).length > 0) {
        trackWhenTapElement({
          btnId: enum_button[item.btnId],
          classify: "reLaunch",
          title: item.title,
        });
      }
      wx.reLaunch({
        url: "/pages/tabbar/index/index",
      });
    },
  },
});
