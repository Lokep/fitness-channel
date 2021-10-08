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
/**
 * 打卡
 * consumeFeat 消耗热量
 * describe 描述内容
 * id 打卡任务id
 * picUrl 图片
 * typeName 运动类型 逗号字符串
 */
export const clockRecordUpdate = (data) =>
  axios({
    url: "/Ma/Motion/clockRecordUpdate",
    data,
    method: "post",
    showErrMsg: false,
    showLoading: false,
  });
