import { axios } from "../utils/request";

/**  */
export const getSleepRecordsByDate = (data) =>
  axios({
    url: "/Ma/Sleep/getSleepRecordByDate",
    data,
    method: "post",
    showErrMsg: false,
    showLoading: false,
  });

export const getSleepRecords = (data) =>
  axios({
    url: "/Ma/Sleep/listSleepRecord",
    method: "post",
    data,
    showErrMsg: false,
    showLoading: false,
  });
