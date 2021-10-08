import dayjs from "dayjs";
import {
  drawChart
} from "../../../utils/drawChart";
import {
  getCache
} from "../../../utils/util";
import {
  getSleepRecordsByDate,
  getSleepRecords
} from "../../../api/sleep"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    today: dayjs().format("YYYY-MM-DD"),
    todayInfo: null,

    onInitChart: function () {},
    sportRecords: [],
    average: 0,
    averageArr: [],
    beginTime: "",
    endTime: "",
  },
  onLoad: async function (options) {
    this.getSleepRecordsByDate();
    await this.getSleepRecords();
    onInitChart.call(this);
  },
  /* 日周月切换 ,以及 chart*/
  toggleSelect(e) {
    const {
      index: current
    } = e.currentTarget.dataset;

    this.setData({
      current,
    }, function () {
      if (current) {
        this.getSleepRecords();
        onInitChart.call(this);
      }
    });
  },
  /* 按日期获取日睡眠记录 */
  getSleepRecordsByDate() {
    const {
      memberId
    } = getCache("loginInfo");
    const {
      today: date
    } = this.data;
    getSleepRecordsByDate({
      date,
      memberId,
    }).then(res => {
      this.setData({
        todayInfo: res.data
      })
    })
  },
  /** 获取时间范围内的运动记录 */
  getSleepRecords() {
    const {
      current
    } = this.data;
    const {
      memberId
    } = getCache("loginInfo");
    let beginTime = "",
      endTime = "";
    // if (current) {
    beginTime = dayjs()
      .startOf(current === 1 ? "week" : "month")
      .format("YYYY-MM-DD");
    endTime = dayjs()
      .endOf(current === 1 ? "week" : "month")
      .format("YYYY-MM-DD");

    return getSleepRecords({
      beginTime,
      endTime,
      memberId,
    }).then((res) => {
      if (res.result === 1) {
        const average = res.average || 0
        const averageArr =  average.split("-")
        this.setData({
          average,
          averageArr,
          sportRecords: res.data || [],
          beginTime,
          endTime,
        });
      }
    });
    // }
  },
  toDetailView() {
    const {
      date,
      todayInfo: {
        id,
        hour,
        minute
      }
    } = this.data
    if (hour && minute) {
      wx.navigateTo({
        url: `/pages/sleep/clock/detail`,
      })
    } else {
      wx.navigateTo({
        url: `/pages/sleep/clock/clock"`,
      })
    }
  }
})
/** chart */
function onInitChart() {
  const {
    sportRecords: list,
    current
  } = this.data;

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
        const {
          consumeFeat
        } = tip.items[0].origin;
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
