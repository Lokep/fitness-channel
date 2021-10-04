import { axios } from "../utils/request";

/** 检查饮食偏好是否完善 */
export const checkIsDietHabbitComplete = (data) =>
  axios({
    url: "/Ma/Diet/checkPreferencePerfect",
    data,
    method: "post",
    showErrMsg: false,
    showLoading: false,
  });

/** 保存打卡 */
export const updateDietRecord = (data) =>
  axios({
    url: "/Ma/Diet/clockRecordUpdate",
    data,
    method: "post",
    showErrMsg: false,
    showLoading: false,
  });

/** 按日期获取饮食打卡餐次详情 */
export const getClockRecordByDate = (data) =>
  axios({
    url: "/Ma/Diet/getClockRecordByDate",
    data,
    method: "post",
    showErrMsg: false,
    showLoading: false,
  });

export const getDietRecordById = (data) =>
  axios({
    url: "/Ma/Diet/getClockRecordById",
    data,
    method: "post",
    showErrMsg: false,
    showLoading: false,
  });

/** 获取饮食计划 */
export const getDietPlanByDate = (data) =>
  axios({
    url: "/Ma/Diet/getDietPlanByDate",
    data,
    method: "post",
    showErrMsg: false,
    showLoading: false,
  });

/** 按日期获取饮食计划情况 */
export const getDietRecordByDate = (data) =>
  axios({
    url: "/Ma/Diet/getDietRecordByDate",
    data,
    method: "post",
    showErrMsg: false,
    showLoading: false,
  });

/** 获取饮食偏好 */
export const getDietHabbit = (data) =>
  axios({
    url: "/Ma/Diet/getPreference",
    data,
    method: "post",
    showErrMsg: false,
    showLoading: false,
  });

/** 获取今日饮食计划情况(首页) */
export const getTodayDietPlan = (data) =>
  axios({
    url: "/Ma/Diet/getTodayPlan",
    data,
    method: "post",
    showErrMsg: false,
    showLoading: false,
  });

/** 饮食打卡统计 */
export const getDietRecordList = (data) =>
  axios({
    url: "/Ma/Diet/listClockRecord",
    data,
    method: "post",
    showErrMsg: false,
    showLoading: false,
  });

/** 饮食计划详情获取 */
export const getDietPlanDetail = (data) =>
  axios({
    url: "/Ma/Diet/planGet",
    data,
    method: "post",
    showErrMsg: false,
    showLoading: false,
  });

/** 饮食计划列表 */
export const getDietPlanList = (data) =>
  axios({
    url: "/Ma/Diet/planList",
    data,
    method: "post",
    showErrMsg: false,
    showLoading: false,
  });

/** 饮食偏好新增 */
export const addDietHabbit = (data) =>
  axios({
    url: "/Ma/Diet/preferenceAdd",
    data,
    method: "post",
    showErrMsg: false,
    showLoading: false,
  });

export const updateDietHabbit = (data) =>
  axios({
    url: "/Ma/Diet/preferenceUpdate",
    data,
    method: "post",
    showErrMsg: false,
    showLoading: false,
  });

/** 领取饮食计划 */
export const receiveDietPlan = (data) =>
  axios({
    url: "/Ma/Diet/receive",
    data,
    method: "post",
    showErrMsg: false,
    showLoading: false,
  });
