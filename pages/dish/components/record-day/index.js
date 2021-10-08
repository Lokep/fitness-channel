// pages/dish/components/record-day/index.js
Component({
  options: {
    styleIsolation: "shared",
  },

  properties: {},

  data: {
    mealType: 0,
    dietPlan: {},
  },

  methods: {
    handleMealTypeChange(e) {
      this.setData({
        mealType: e.detail.name,
      });
    },
  },
});
