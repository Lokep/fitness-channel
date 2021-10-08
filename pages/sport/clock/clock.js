// pages/sport/clock/clock.js
// import { getCache } from "../../../utils/util";
import { uploadSingleFile } from "../../../utils/wx-api";
import { clockRecordUpdate } from "../../../api/sport";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    consumeFeat: 0,
    describe: "",
    arr: [
      {
        label: "慢跑",
        checked: false,
      },
      {
        label: "散步",
        checked: false,
      },
      {
        label: "打球",
        checked: false,
      },
      {
        label: "瑜伽",
        checked: false,
      },
      {
        label: "太极拳",
        checked: false,
      },
      {
        label: "游泳",
        checked: false,
      },
    ],
    fileList: [],
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
  checkboxHandle(e) {
    const { index, checked } = e.currentTarget.dataset;
    const { arr } = this.data;
    arr[index].checked = !checked;
    this.setData({
      arr,
    });
  },
  /* 打卡保存记录 */
  clockRecordUpdate() {
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
    const typeName = [];
    this.data.arr.forEach((item) => {
      if (item.checked) {
        typeName.push(item.label);
      }
    });
    clockRecordUpdate({
      id: this.data.id,
      consumeFeat: this.data.consumeFeat,
      describe: this.data.describe,
      picUrl: this.data.fileList[0].url,
      typeName: typeName.join(","),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  onLoad: function ({ id = "" }) {
    this.setData({
      id,
    });
  },
});
