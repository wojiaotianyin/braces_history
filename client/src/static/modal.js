import Vue from "vue";
import VCalendar from "v-calendar";
Vue.use(VCalendar);
const axios = require("axios").create();
axios.defaults.baseURL = "http://127.0.0.1:5050";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";

export default {
  data() {
    return {
      count: 4,
      date: null,
      price: "",
      memo: "",
      month_selector: [],
      history: [],
      th: ["日時", "診療費", "備考", "編集", "削除"],
      price_sum: 0,
      range: { start: new Date(2020, 0, 1), end: new Date(2020, 0, 5) },
    };
  },
  name: "App",
  components: {},
  computed: {
    // errorMessage() {
    //   if (!this.date) return 'Date is required.';
    //   return '';
    // },
  },
  watch: {
    // date: function () {
    //   console.log(this.date);
    // },
  },
  mounted: function () {
    this.getHistory();
  },
  methods: {
  }
};
