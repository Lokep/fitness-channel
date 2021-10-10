import { getDietRecordById } from "../../../api/dish";

Page({
  data: {
    id: "",
    record: {},
  },

  onLoad({ id = "" }) {
    this.setData({ id });
    this.getDishDetail();
  },

  getDishDetail() {
    const { id } = this.data;
    getDietRecordById({
      id,
    }).then((res) => {
      if (res.result === 1) {
        this.setData({
          record: res.data,
        });
      }
    });
  },
});
