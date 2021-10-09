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
/* 添加睡眠记录 */
export const addSleepRecordByDate = (data) =>
  axios({
    url: "/Ma/Sleep/addSleepRecordByDate",
    method: "post",
    data,
    showErrMsg: false,
    showLoading: false,
  });
/* 更新睡眠记录 */
export const updateSleepRecord = (data) =>
  axios({
    url: "/Ma/Sleep/updateSleepRecord",
    method: "post",
    data,
    showErrMsg: false,
    showLoading: false,
  });
