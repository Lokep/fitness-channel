import { axios } from "../utils/request";

export const getSportInfo = (data) =>
  axios({
    url: "/Ma/Motion/getTodayPlan",
    data,
    method: "post",
    showErrMsg: false,
    showLoading: false,
  });
/**
 * 健康运动 运动
 * 获取用户全部计划
 */
export const getSportList = (data) =>
  axios({
    url: "/Ma/Motion/listPlan",
    data,
    method: "post",
    showErrMsg: false,
    showLoading: false,
  });
/**
 * 获取打卡任务
 * relationId 计划id
 */
export const getListClockRecordByPlan = (data) =>
  axios({
    url: "/Ma/Motion/listClockRecordByPlan",
    data,
    method: "post",
    showErrMsg: false,
    showLoading: false,
  });
/**
 * 获取运动打卡记录
 * id 打卡任务id
 */
export const clockRecordGet = (data) =>
  axios({
    url: "/Ma/Motion/clockRecordGet",
    data,
    method: "post",
    showErrMsg: false,
    showLoading: false,
  });
