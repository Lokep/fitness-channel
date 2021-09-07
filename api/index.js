import { axios } from "../utils/request";
import { env } from "../utils/wx-api";

export const loginByCode = (data) =>
  axios({
    url: "/celina-wechat/app-user/login-by-code",
    method: "post",
    data,
    showErrMsg: false,
    showLoading: false,
    checkToken: false,
  });
