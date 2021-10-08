// pages/sport/clock/index.js
import { clockRecordGet } from "../../../api/sport";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    detail:{},
    typeNameArr:[]
  },
  clockRecordGet(){
    const { id } =this.data
    clockRecordGet({
      id
    }).then(res=>{
      // console.log(res);
      let typeName = res.data?.typeName || ""
      let typeNameArr = typeName.split(",");
      this.setData({
        detail:res.data,
        typeNameArr
      })
    })
  },
  onLoad: function ({id=""}) {
    this.setData({
      id
    })
    this.clockRecordGet();
  },
})
