import { axios } from "../utils/request";
import { env } from "../utils/wx-api";

// export const loginByCode = (data) =>
//   axios({
//     url: "/celina-wechat/app-user/login-by-code",
//     method: "post",
//     data,
//     showErrMsg: false,
//     showLoading: false,
//     checkToken: false,
//   });

/** 获取手机号 */

export const getUserPhone = (data) =>
  axios({
    url: "/Mini/getPhoneNoInfo",
    data,
    method: "post",
    showErrMsg: false,
    showLoading: false,
    checkToken: false,
  });

/** */
export const getToken = (data) =>
  axios({
    url: "/Mini/getToken",
    data,
    method: "post",
    showErrMsg: false,
    showLoading: false,
    checkToken: false,
  });

/** 获取用户信息 */
export const getUserInfo = (data) =>
  axios({
    url: "/Mini/getUserInfo",
    data,
    method: "post",
    showErrMsg: false,
    showLoading: false,
    checkToken: false,
  });

export const getOpenId = (data) =>
  axios({
    url: "/Mini/jsCode2SessionInfo",
    data,
    method: "post",
    showErrMsg: false,
    showLoading: false,
    checkToken: false,
  });

/** 上传 */
export const uploadFile = (data) =>
  axios({
    url: "/FileUpLoad/Oos/Upload/uploadImgBySize",
  });
