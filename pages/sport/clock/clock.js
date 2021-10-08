// pages/sport/clock/clock.js
// import { getCache } from "../../../utils/util";
import {
  wxUpload
} from "../../../utils/upload";
import {} from "../../../api/sport";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: ''
  },
  upload(e) {
    const {
      url: filePath
    } = e.detail.file
    // console.log(filePath);
    wxUpload(filePath).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  },
  onLoad: function ({
    id = ""
  }) {
    this.setData({
      id
    })
  },
})
