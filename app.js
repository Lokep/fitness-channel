const { performanceWatcher } = require("./utils/debug");
const { checkUpdate } = require("./utils/update-manager");

// app.js
App({
  globalData: {
    userInfo: null,
    debug: true,
    performanceEnable: true,
    performanceObserver: null,
  },
  onLaunch() {},
  onShow() {
    checkUpdate();
    performanceWatcher.call(this);
  },
});
