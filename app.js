const { checkUpdate } = require("./utils/update-manager");

// app.js
App({
  globalData: {
    userInfo: null,
  },
  onLaunch() {},
  onShow() {
    checkUpdate();
  },
});
