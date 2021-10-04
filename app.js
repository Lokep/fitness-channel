const { getOpenId, getToken } = require("./api/index");
const { performanceWatcher } = require("./utils/debug");
const { checkUpdate } = require("./utils/update-manager");
const { wxLogin } = require("./utils/wx-api");

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

    this.getOpenId();
    // this.getToken()
  },

  async getOpenId() {
    const { code, msg = "" } = await wxLogin();

    return getOpenId({
      code,
    }).then((res) => {
      if (res.result === 0) {
        console.log(res);
      }
    });
  },

  getToken() {
    return getToken();
  },
});
