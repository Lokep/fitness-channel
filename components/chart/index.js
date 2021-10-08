Component({
  options: {
    styleIsolation: "apply-shared",
  },
  /**
   * 组件的属性列表
   */
  properties: {
    onInitChart: {
      type: Function,
    },
    list: {
      type: Array,
      value: [],
    },
    loading: {
      type: Boolean,
      value: false,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  attached() {},

  /**
   * 组件的方法列表
   */
  methods: {},
});
