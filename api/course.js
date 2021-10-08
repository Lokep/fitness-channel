import { axios } from "../utils/request";

export const getCourseList = (data) =>
  axios({
    url: "/Ma/Repository/getMyEduList",
    data,
    method: "post",
    showErrMsg: false,
    showLoading: false,
  });
