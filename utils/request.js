import { env, getNetworkType } from "./wx-api";

const baseApi = {
  develop: "",
  trial: "",
  release: "",
};
const TIMEOUT = 10000;
const apiBaseUrl = baseApi[env];
export function request({
  url,
  data,
  method = "GET",
  showLoading = true,
  showErrMsg,
  checkToken = true,
}) {
  return new Promise(async (resolve) => {
    const { networkType } = await getNetworkType();
    if (networkType === "unknow" || networkType === "none") {
      Toast("网络似乎走丢了...");
      resolve({});
    }

    if (showLoading) {
      wx.showLoading({
        title: "加载中",
      });
    }

    wx.request({
      data,
      url: apiBaseUrl + url,
      header: handleHeader(checkToken),
      timeout: TIMEOUT,
      method,
      success: (res) => {
        handleResponse(showErrMsg, res.data);
        resolve(res.data);
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
  const token = wx.getStorageSync("token");
  let headers = {};
  if (token && checkToken) {
    headers.token = token;
  }
  return headers;
}

function handleResponse(showErrMsg = true, response) {
  const { res, msg = "请求出错" } = response;
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
