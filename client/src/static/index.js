import Vue from "vue";
import VCalendar from "v-calendar";
Vue.use(VCalendar);
import modal_element from "../template/home/ModalElement.vue";
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
      parent_num: 100,
      openModal: false,
      detail: { id: "", date: "", price: "", memo: "" },
    };
  },
  name: "App",
  components: { modal_element },
  computed: {},
  watch: {},
  mounted: function () {
    this.getHistory();
  },
  methods: {
    showCalendar: function () {},
    /**
     * 歯列矯正履歴を取得
     */
    getHistory: function () {
      this.requestGet("/get_history", null);
    },

    /**
     * SQLにデータを格納
     * @param {*} url
     */
    send: function (url) {
      const sqlDateConverter = (date) => {
        let date_ = new Date(date);
        let year = date_.getFullYear();
        let month = date_.getMonth() + 1;
        let d = date_.getDate();
        return (
          year +
          "-" +
          month.toString().padStart(2, "0") +
          "-" +
          d.toString().padStart(2, "0") +
          " " +
          "00:00:00"
        );
      };
      const data = {
        date: sqlDateConverter(this.date),
        expense: this.price,
        detail: this.memo,
      };
      this.requestGet(url, data);
    },
    /**
     * APIレスポンス
     * @param {*} url
     * @param {*} data
     */
    requestGet(url, data) {
      axios
        .post(url, data)
        .then((req) => {
          //GET処理
          if (req.request.responseURL.indexOf("get_history")) {
            this.history = req.data;
            for (let i in this.history) {
              this.history[i].datetime = this.dateFormatter(
                this.history[i].datetime
              );
              this.history[i].price = this.yenFormatter(this.history[i].price);
            }
          }
          this.month_selector = Array.from(new Set(this.month_selector));
          this.price_sum = this.price_sum.toLocaleString();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteHistory: function (id) {
      this.requestDelete("/delete", id);
    },
    dateFormatter: function (datetime) {
      let date = new Date(datetime);
      let year = date.getUTCFullYear();
      let month = date.getUTCMonth() + 1;
      let d = date.getUTCDate();
      let month_el = year + "年" + month.toString().padStart(2, "0") + "月";
      this.month_selector.push(month_el);
      return month_el + d.toString().padStart(2, "0") + "日 ";
    },

    /**
     * datePickerに合わせるため、フォーマットを元に戻す。
     * @param {*} datetime 
     * @returns 
     */
    revertDateFormat: function (datetime) {
      let base = datetime.split("年");
      const y = base[0];
      const m = base[1].split("月")[0];
      const d = base[1].split("月")[1].replace("日", "").replace(/\s+/g, "");
      return new Date(y, m - 1, d);
    },
    yenFormatter: function (yen) {
      this.price_sum += yen;
      return yen.toLocaleString() + "円";
    },
    clearFilter: function () {},

    /**
     * モーダル用のデータ
     * @param {*} id 
     * @param {*} time 
     * @param {*} price 
     * @param {*} detail 
     */
    updateData: function (id, time, price, detail) {
      this.openModal = true;
      this.detail.date = this.revertDateFormat(time);
      this.detail.id = id;
      this.detail.memo = detail;
      this.detail.price = price.replace(",", "").replace("円", "");
    },

    /**
     * モーダルの外側をクリックした時を感知
     * @param {*} event 
     */
    detectOutsideClick: function (event) {
      let target_ = event.target.id;
      if (target_ == "modal_element") {
        this.openModal = false;
      }
    },
 
    /**
     * APIレスポンスDELETE
     * @param {*} url
     * @param {*} data
     */
    requestDelete(url, data) {
      axios
        .post(url, data)
        .then((req) => {
          console.log(req);
          this.getHistory();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
