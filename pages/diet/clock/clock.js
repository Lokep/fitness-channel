import { updateDietRecord } from "../../../api/dish";
import { uploadSingleFile } from "../../../utils/wx-api";

// pages/sport/clock/clock.js
Page({
  data: {
    fileList: [],
    content: "",
  },

  onLoad({ id = "" }) {
    this.setData({
      id,
    });
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

  handleInput(e) {
    this.setData({
      content: e.detail.value,
    });
  },

  handleSubmit() {
    const { fileList, content, id = "" } = this.data;

    if (fileList.length === 0) {
      wx.showToast({
        title: "请选择您要上传的图片",
        icon: "none",
      });
      return;
    }

    if (content.length > 100) {
      wx.showToast({
        title: "最多输入100个字",
        icon: "none",
      });
      return;
    }

    updateDietRecord({
      id,
      describe: content,
      picUrl: fileList[0].url,
    }).then((res) => {
      if (res.result === 1) {
        wx.showToast({
          title: "保存成功",
          icon: "none",
        });
      }
    });
  },
});
