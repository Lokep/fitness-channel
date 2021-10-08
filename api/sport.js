import { axios } from "../utils/request";

export const getSportInfo = (data) =>
  axios({
    url: "/Ma/Motion/getTodayPlan",
    data,
    method: "post",
    showErrMsg: false,
    showLoading: false,
  });
