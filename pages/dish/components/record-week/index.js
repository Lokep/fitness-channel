// pages/dish/components/record-week/index.js
let chart = null;
import { drawChart } from "../../../../utils/drawChart";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    average: {
      type: [Number, String],
      value: 0,
    },
    beginTime: {
      type: [String],
      value: "",
    },
    endTime: {
      type: [String],
      value: "",
    },
    sportRecords: {
      type: Array,
      value: () => [],
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    onInitChart: function () {},
    current: 1,
  },
  attached() {
    onInitChart.call(this);
  },
  /**
   * 组件的方法列表
   */
  methods: {},
  observers: {
    sportRecords(v) {
      chart && chart.changeData(v);
    },
  },
});
/** chart */
function onInitChart() {
  const { sportRecords: list, current } = this.data;

  console.log("[sportRecords]:", list);

  this.setData({
    onInitChart: init,
  });

  function init(F2, config) {
    chart = new F2.Chart(config);

    chart.source([...list]);

    chart.scale("date", {
      type: "cat",
      range: [0.2, 0.8],
    });

    chart.scale("heat", {
      max: 24,
      min: 0,
      tickCount: 5,
    });

    drawChart(
      chart,
      "date*heat",
      "memberId",
      current == 1 ? "interval" : "point"
    );

    handleAxis.call(this, chart);

    chart.legend(false);

    chart.tooltip({
      custom: true,
      onChange(tip) {
        const { heat } = tip.items[0].origin;
        wx.showToast({
          title: `已消耗${heat}千卡`,
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
