// pages/sport/clock/index.js
import { getCache } from "../../../utils/util";
import {
  getSportInfo,
  getSportList,
  getListClockRecordByPlan,
  getSportRecordsByDate,
} from "../../../api/sport";
import { drawChart } from "../../../utils/drawChart";
import dayjs from "dayjs";

Page({
  data: {
    suggestConsume: "",
    consumeFeat: "",
    needConsume: "",
    current: 0,
    sportListCurrent: 0,
    sportList: [],
    listClockRecordByPlan: [],

    onInitChart: null,
    sportRecords: [],
    average: 0,
    beginTime: "",
    endTime: "",
  },
  onLoad() {
    this.getDate();
  },
  onShow() {
    this.getDate();
  },
  async getDate() {
    this.getSportInfo();
    await this.getSportList();
    await this.getListClockRecordByPlan();
    await this.getSportRecordsByDate();
    onInitChart.call(this);
  },
  /* 今日统计 */
  getSportInfo() {
    const { memberId = "" } = getCache("loginInfo");
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
    const { memberId = "" } = getCache("loginInfo");
    return getSportList({
      memberId,
    }).then((res) => {
      // console.log(res)
      const sportList = res.data; //null
      /* 如果是数组 */
      if (sportList instanceof Array) {
        const sportListCurrent =
          res.data.findIndex((item) => item.isCurrent == 1) || 0;
        this.setData({
          sportList,
          sportListCurrent,
        });
      }
    });
  },
  /* 左右箭头切换 */
  sportToggle(e) {
    // console.log(e)
    const { toggle } = e.currentTarget.dataset;
    let { sportListCurrent } = this.data;
    sportListCurrent = sportListCurrent + (toggle == "next" ? 1 : -1);
    this.setData({
      sportListCurrent,
    });
    this.getListClockRecordByPlan();
  },
  /* 根据计划id获取打卡任务 */
  async getListClockRecordByPlan() {
    const { sportListCurrent, sportList } = this.data;
    const { relationId } = sportList[sportListCurrent];
    // if(!relationId) return
    return getListClockRecordByPlan({
      relationId,
    }).then((res) => {
      listClockRecordByPlan;
      const listClockRecordByPlan = res.data; //null
      /* 如果是数组 */
      if (listClockRecordByPlan instanceof Array) {
        this.setData({
          listClockRecordByPlan,
        });
      }
    });
  },
  /* 日周月切换 */
  toggleSelect(e) {
    const { index: current } = e.currentTarget.dataset;

    this.setData(
      {
        current,
      },
      function () {
        if (current) {
          this.getSportRecordsByDate();
          onInitChart.call(this);
        }
      }
    );
  },

  toView(e) {
    const {
      id,
      index,
      isrecord: isRecord,
      issubmit: isSubmit,
    } = e.currentTarget.dataset;
    /* 如果没提交过? */
    if (isSubmit == 0) {
      wx.navigateTo({
        url: `/pages/sport/clock/clock?id=${id}`,
      });
    } else {
      wx.navigateTo({
        url: `/pages/sport/clock/detail?id=${id}`,
      });
    }
  },
  catchtap() {
    return false;
  },

  /** 获取时间范围内的运动记录 */
  getSportRecordsByDate() {
    const { current } = this.data;
    const { memberId } = getCache("loginInfo");
    let beginTime = "",
      endTime = "";
    // if (current) {
    beginTime = dayjs()
      .startOf(current === 1 ? "week" : "month")
      .format("YYYY-MM-DD");
    endTime = dayjs()
      .endOf(current === 1 ? "week" : "month")
      .format("YYYY-MM-DD");

    return getSportRecordsByDate({
      beginTime,
      endTime,
      memberId,
    }).then((res) => {
      if (res.result === 1) {
        this.setData({
          average: res.average || 0,
          sportRecords: res.data || [],
          beginTime,
          endTime,
        });
      }
    });
    // }
  },
});

/** chart */
function onInitChart() {
  const { sportRecords: list, current } = this.data;

  this.setData({
    onInitChart: init,
  });

  function init(F2, config) {
    const chart = new F2.Chart(config);

    chart.source([...list]);

    chart.scale("date", {
      type: "cat",
      range: [0.2, 0.8],
    });

    chart.scale("consumeFeat", {
      max: 1000,
      min: 100,
      tickCount: 5,
    });

    drawChart(
      chart,
      "date*consumeFeat",
      "id",
      current == 1 ? "interval" : "point"
    );

    handleAxis.call(this, chart);

    chart.legend(false);

    chart.tooltip({
      custom: true,
      onChange(tip) {
        const { consumeFeat } = tip.items[0].origin;
        wx.showToast({
          title: `已消耗${consumeFeat}千卡`,
          icon: "none",
        });
      },
    });

    chart.render();
    return chart;
  }
}

function handleAxis(chart) {
  /** 修改x轴 */
  chart.axis("index", {
    line: {
      stroke: "#85A5FF",
    },
    // label: (text, index, total) => {
    //   const cfg = {
    //     textAlign: "left",
    //     fill: "#85A5FF",
    //     fontSize: 12,
    //     fontWeight: 300,
    //     text: "",
    //   };

    //   const { list } = this;

    //   const { executionDate = "", point = "" } = list[index];

    //   console.log(list, index, text);

    //   if (!executionDate || !point) {
    //     return cfg;
    //   }

    //   if (index === 0) {
    //     cfg.text = `${dayjs(executionDate).format("MM/DD")}\n${point}`;
    //   } else if (index === total - 1) {
    //     cfg.text = `${dayjs(executionDate).format("MM/DD")}\n${point}`;
    //   } else {
    //     if (total > 5) {
    //       const rest = total / 2;
    //       const step = Math.floor(rest);

    //       index % step === 0 &&
    //         (cfg.text = `${dayjs(executionDate).format("MM/DD")}\n${point}`);
    //     } else {
    //       cfg.text = `${dayjs(executionDate).format("MM/DD")}\n${point}`;
    //     }
    //   }

    //   return cfg;
    // },
  });
}
