import { OFFLINE, WHITE_MENU } from "./constant";
import { getCache, saveCache } from "./util";
import { getNetworkType } from "./wx-api";
import { handleRequestURL } from "./proxyTable";

const TIMEOUT = 10000;

let LOGIN_STATUS = true;

const MOCK_SERVER = "http://localhost:3000";

export function request({
  url,
  data,
  method = "GET",
  showLoading = true,
  showErrMsg,
  checkToken = true,
  delay = 0,
  isMock = false,
}) {
  if (!LOGIN_STATUS && checkToken) return;

  return new Promise(async (resolve) => {
    const { networkType } = await getNetworkType();
    if (networkType === "unknow" || networkType === "none") {
      Toast("网络似乎走丢了...");
      resolve(OFFLINE);
    }

    if (showLoading) {
      wx.showLoading({
        title: "加载中",
      });
    }
    const t0 = Date.now();

    wx.request({
      data,
      url: isMock ? MOCK_SERVER + url : handleRequestURL(url),
      header: handleHeader(checkToken),
      timeout: TIMEOUT,
      method,
      success: (res) => {
        // console.log(res, typeof res.data)
        const t1 = Date.now();
        const delta = t1 - t0;

        if (delay && delta < delay) {
          let timeOut = setTimeout(() => {
            console.log("[delay]:", delay - delta);
            clearTimeout(timeOut);
            handleResponse(showErrMsg, res.data, url);
            resolve(res.data);
          }, delay - delta);
        } else {
          handleResponse(showErrMsg, res.data, url);
          resolve(res.data);
        }
      },
      fail: (err) => {
        handleError(err, showErrMsg);
        resolve({});
      },
      complete() {
        if (showLoading) {
          wx.hideLoading();
        }
      },
    });
  });
}

export const axios = request;
export const fetch = request;

function handleHeader(checkToken = true) {
  const { token } = getCache("loginInfo");
  let headers = {};
  if (token && checkToken) {
    headers.Authorization = "Bearer" + token;
  }
  return headers;
}

function handleResponse(showErrMsg = true, response, url) {
  const { res, msg = "请求出错" } = response;
  const LOGIN_PATH = "pages/common/login/index";
  const routes = getCurrentPages();
  const { route } = routes[routes.length - 1];
  if (
    res === 801 &&
    route != LOGIN_PATH &&
    WHITE_MENU.findIndex((item) => url == item.url) < 0
  ) {
    const app = getApp();
    LOGIN_STATUS = false;
    app.globalData.hasToken = false;
    saveCache("lastPage", "/" + route);
    wx.redirectTo({
      url: "/pages/common/login/index",
    });
  }

  LOGIN_STATUS = true;

  if (showErrMsg && res !== 0) {
    setTimeout(() => {
      Toast(msg);

      setTimeout(() => {
        wx.hideToast();
      }, 2000);
    }, 0);
  }
}

function handleError(err, showErrMsg = true) {
  if (showErrMsg) {
    Toast(err.errMsg || "请求失败");
  }
}

function Toast(msg, icon = "none", duration = 2000) {
  wx.showToast({
    title: msg,
    icon,
    duration,
  });
}
