import "regenerator-runtime";
import { getCache, saveCache } from "./util";

export const checkIn = async (app) => {
  const { available } = await checkSession();
  let code = available && app ? getCode(app) : null;
  if (code) {
    const res = await wxLogin();
    code = res.code;
  }
  saveCache("code", code);
  return code;
};

export const getCode = (app) => {
  const code = app.globalData.code || getCache("code");
  return code;
};
export const checkSession = () =>
  new Promise((resolve) => {
    wx.checkSession({
      success: () => resolve({ available: true }),
      fail: () => resolve({ available: false }),
    });
  });
export const wxLogin = () =>
  new Promise((resolve, reject) => {
    wx.removeStorageSync("code");
    wx.login({
      success: (res) => {
        saveCache("code", res.code);
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
export const getSetting = () =>
  new Promise((resolve) => {
    wx.getSetting({
      success: (e) => {
        resolve(e);
      },
      fail: (err) => {
        resolve(false);
      },
    });
  });
export const accountInfo = wx.getAccountInfoSync();
export const { envVersion: env, appId } = accountInfo.miniProgram;
export const getUserInfo = () =>
  new Promise((resolve, reject) => {
    // 获取用户信息
    wx.getSetting({
      success: (res) => {
        if (res.authSetting["scope.userInfo"]) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: (res) => {
              resolve(res);
            },
            fail: (err) => reject(err),
          });
        } else {
          reject();
        }
      },
    });
  });

/**
 * wifi, 2g, 3g, 4g, 5g, unknown, none
 */
export const getNetworkType = () =>
  new Promise((resolve) => {
    wx.getNetworkType({
      success: (result) => {
        resolve(result.networkType);
      },
      fail: () => {
        resolve("unknown");
      },
    });
  });
