import {
  handleRequestURL
} from "./proxyTable";
export function wxUpload(filePath, formData = {}) {
  return new Promise((reslove, reject) => {
    wx.uploadFile({
      filePath,
      name: 'file',
      formData,
      url: handleRequestURL(`/FileUpLoad/Oos/Upload/uploadImgBySize`) ,
      success(res) {
        reslove(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}
