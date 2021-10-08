// pages/sport/clock/index.js
import {
  getCache
} from "../../../utils/util";
import {
  getSportInfo,
  getSportList,
  getListClockRecordByPlan
} from "../../../api/sport";
Page({
  data: {
    suggestConsume: "",
    consumeFeat: "",
    needConsume: "",
    current: 0,
    sportListCurrent: 0,
    sportList: [],
    listClockRecordByPlan: []
  },
  /* 今日统计 */
  getSportInfo() {
    const {
      memberId = ""
    } = getCache("loginInfo");
    getSportInfo({
      memberId,
    }).then((res) => {
      if (res.result === 1 || res.data) {
        // "suggestConsume|推荐消耗": 1000,
        // "consumeFeat|已消耗热量": 500,
        // "needConsume|还需消耗热量": 500,
        const {
          suggestConsume = "",
            consumeFeat = "",
            needConsume = "",
        } = res.data || {};
        this.setData({
          suggestConsume,
          consumeFeat,
          needConsume,
        });
      }
    });
  },
  /* 获取计划列表 */
  async getSportList() {
    const {
      memberId = ""
    } = getCache("loginInfo");
    return getSportList({
      memberId
    }).then(res => {
      // console.log(res)
      const sportList = res.data //null
      /* 如果是数组 */
      if (sportList instanceof Array) {
        const sportListCurrent = res.data.findIndex(item => item.isCurrent == 1) || 0
        this.setData({
          sportList,
          sportListCurrent
        })
      }
    })
  },
  /* 左右箭头切换 */
  sportToggle(e) {
    // console.log(e)
    const {
      toggle
    } = e.currentTarget.dataset
    let {
      sportListCurrent
    } = this.data
    sportListCurrent = sportListCurrent + (toggle == 'next' ? 1 : -1)
    this.setData({
      sportListCurrent
    })
    this.getListClockRecordByPlan();
  },
  /* 根据计划id获取打卡任务 */
  async getListClockRecordByPlan() {
    const {
      relationId
    } = this.data.sportList[this.data.sportListCurrent]
    // if(!relationId) return 
    return getListClockRecordByPlan({
      relationId
    }).then(res => {
      listClockRecordByPlan
      const listClockRecordByPlan = res.data //null
      /* 如果是数组 */
      if (listClockRecordByPlan instanceof Array) {
        this.setData({
          listClockRecordByPlan
        })
      }
    })
  },
  /* 日周月切换 */
  toggleSelect(e) {
    const {
      index: current
    } = e.currentTarget.dataset;
    this.setData({
      current
    })
  },
  async onLoad() {
    this.getSportInfo();
    await this.getSportList();
    await this.getListClockRecordByPlan();
  },
  toView(e) {
    const {
      id,
      index,
      isrecord:isRecord,
      issubmit:isSubmit
    } = e.currentTarget.dataset;
    /* 如果没提交过? */
    if (isSubmit==0) {
      wx.navigateTo({
        url: `/pages/sport/clock/clock?id=${id}`,
      })
    } else{
      wx.navigateTo({
        url: `/pages/sport/clock/detail?id=${id}`,
      })
    }
  },
  catchtap() {
    return false;
  },
  onReady: function () {

  },
  onShow: function () {

  },
})
