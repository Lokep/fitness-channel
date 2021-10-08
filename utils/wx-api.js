import "regenerator-runtime";
import { uploadImage } from "../api/index";
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
        resolve({
          code: res.code,
          errMsg: res.errMsg || "",
        });
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

export const uploadSingleFile = async ({
  filePath,
  name = "file",
  showLoading,
  compressQuality = false,
  handleUploadSuccess,
  handleUploadFail,
  handleUploadProgressUpdate,
}) => {
  const showFailToast = () =>
    wx.showToast({
      icon: "none",
      title: "上传失败",
    });

  if (showLoading) {
    wx.showLoading({
      title: "正在上传~",
    });
  }

  if (compressImage && env != "develop") {
    const temp = await compressImage({
      src: filePath,
      quality: compressQuality,
    });
    if (temp) {
      filePath = temp;
    }
  }

  const uploadTask = wx.uploadFile({
    url: uploadImage,
    filePath,
    name,
    success: (res) => {
      if (res.statusCode == 200 && res.data) {
        const fileUrl = JSON.parse(res.data).data || [];
        handleUploadSuccess && handleUploadSuccess([{ url: fileUrl.url }]);
      } else {
        showFailToast();
      }
    },
    fail: (err) => {
      if (handleUploadFail) {
        handleUploadFail(err);
      } else {
        showFailToast();
      }
    },
    complete: () => {
      showLoading && wx.hideLoading();
    },
  });

  wx.onNetworkStatusChange((res) => {
    console.log("[当前网络连接状态]:", res.isConnected);
    if (!res.isConnected) {
      uploadTask.abort();
      wx.offNetworkStatusChange();
    }
  });

  uploadTask.onProgressUpdate((res) => {
    if (handleUploadProgressUpdate) {
      console.log(res);
      handleUploadProgressUpdate(res);
    }
    if (res.progress == 100) {
      wx.offNetworkStatusChange();
    }
  });
};

export const compressImage = ({ src, quality = 80 }) =>
  new Promise((resolve) => {
    wx.compressImage({
      src,
      quality,
      success: (res) => {
        console.log(res);
        resolve(res.tempFilePath);
      },
      fail: (err) => {
        console.log("[图片压缩失败]：", err);
        resolve("");
      },
    });
  });

export const getSystemInfo = () =>
  new Promise((resolve) => {
    wx.getSystemInfo({
      success: (res) => {
        resolve({
          ...res,
          code: "SUCCESS",
          msg: "success",
        });
      },
      fail: (err) => {
        resolve({
          ...err,
          code: "FAIL",
          msg: "系统信息获取失败",
        });
      },
    });
  });
