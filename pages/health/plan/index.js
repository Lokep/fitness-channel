import { throttle } from "../../../utils/util";

const DIET_LIST = [
  {
    type: "BREAKFAST",
    title: "早餐",
    icon: "/assets/images/icon_diet_breakfast.png",
    content: "无糖豆浆(1杯)+面食(1碗)+水果(1份)",
    calories: ["热量 400千卡", "蛋白 2.7克", "碳水 0.7克", "脂肪 3.0克"],
  },
  {
    type: "LUNCH",
    title: "午餐",
    icon: "/assets/images/icon_diet_lunch.png",
    content: "无糖豆浆(1杯)+面食(1碗)+水果(1份)",
    calories: ["热量 400千卡", "蛋白 2.7克", "碳水 0.7克", "脂肪 3.0克"],
  },
  {
    type: "DINNER",
    title: "晚餐",
    icon: "/assets/images/icon_diet_dinner.png",
    content: "无糖豆浆(1杯)+面食(1碗)+水果(1份)",
    calories: ["热量 400千卡", "蛋白 2.7克", "碳水 0.7克", "脂肪 3.0克"],
  },
];

Page({
  data: {
    DIET_LIST,
  },

  acceptPlan: throttle(() => {}, 1000),
});
