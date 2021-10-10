// pages/sport/clock/clock.js
import dayjs from "dayjs";
import { getCache } from "../../../utils/util";
import { uploadSingleFile } from "../../../utils/wx-api";
import {
  addSleepRecordByDate,
  getSleepRecordsByDate,
  updateSleepRecord,
} from "../../../api/sleep";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    date: dayjs().format("YYYY-MM-DD"),
    id: "",
    fileList: [],
    describe: "",
    hour: "",
    minute: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function ({ date = "", id = "" }) {
    this.setData({
      date,
      id,
    });
    /* date or id */
    if (this.data.id) {
      this.getData();
    }
  },
  handleUpload(e) {
    const { url } = e.detail.file;

    if (!url) return;

    uploadSingleFile({
      filePath: url,
      showLoading: true,
      compressQuality: 80,
      handleUploadSuccess: (list) => this.handleUploadSuccess(list),
    });
  },

  handleDeleteUpload() {
    this.setData({
      fileList: [],
    });
  },
  handleUploadSuccess(list = []) {
    this.setData({
      fileList: list,
    });
  },
  /* 打卡保存记录 */
  addSleepRecord() {
    const { memberId = "" } = getCache("loginInfo");
    if (this.data.fileList.length === 0) {
      wx.showToast({
        title: "请选择您要上传的图片",
        icon: "none",
      });
      return;
    }
    if (this.data.describe.length > 100) {
      wx.showToast({
        title: "描述不能大于100字",
        icon: "none",
      });
      return;
    }
    const { date, describe, hour, minute } = this.data;
    addSleepRecordByDate({
      memberId,
      date,
      describe,
      hour,
      minute,
      picUrl: this.data.fileList[0].url,
    })
      .then((res) => {
        wx.showToast({
          title: res.mssage,
          icon: "none",
        });
        if (res.result == 1) {
          let timeOut = setTimeout(() => {
            wx.navigateBack();
            clearTimeout(timeOut);
          }, 500);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  /* 按日期获取日睡眠记录 */
  getSleepRecordsByDate() {
    const { memberId } = getCache("loginInfo");
    const { date } = this.data;
    getSleepRecordsByDate({
      date,
      memberId,
    }).then((res) => {
      this.setData({
        ...res.data,
        fileList: [
          {
            url: res.data.picUrl,
          },
        ],
      });
    });
  },
  /* 无时间时更新记录 */
  updateSleepRecord() {
    const { memberId = "" } = getCache("loginInfo");
    if (this.data.fileList.length === 0) {
      wx.showToast({
        title: "请选择您要上传的图片",
        icon: "none",
      });
      return;
    }
    if (this.data.describe.length > 100) {
      wx.showToast({
        title: "描述不能大于100字",
        icon: "none",
      });
      return;
    }
    const { date, describe, hour, minute, id } = this.data;
    updateSleepRecord({
      memberId,
      date,
      describe,
      hour,
      minute,
      id,
      picUrl: this.data.fileList[0].url,
    })
      .then((res) => {
        wx.showToast({
          title: "操作成功",
          icon: "none",
        });
        if (res.result == 1) {
          let timeOut = setTimeout(() => {
            wx.navigateBack();
            clearTimeout(timeOut);
          }, 500);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getData() {
    this.getSleepRecordsByDate();
  },
});
