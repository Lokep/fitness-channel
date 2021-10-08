// pages/sport/clock/clock.js
// import { getCache } from "../../../utils/util";
import { uploadSingleFile } from "../../../utils/wx-api";
import {} from "../../../api/sport";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    fileList: []
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
  onLoad: function ({
    id = ""
  }) {
    this.setData({
      id
    })
  },
})
