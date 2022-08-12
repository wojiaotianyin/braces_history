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
      history_cp: [],
      th: ["日時", "診療費", "備考", "編集", "削除"],
      price_sum: 0,
      parent_num: 100,
      openModal: false,
      detail: { id: "", date: "", price: "", memo: "" },
      start_date: "",
      end_date: "",
    };
  },
  name: "App",
  components: { modal_element },
  computed: {
    filteringList() {
      if (this.start_date != "" && this.end_date != "") {
        const start = this.getRidOfChar(this.start_date);
        const end = this.getRidOfChar(this.end_date);
        if (start > end) {
          return;
        } else {
          const result = this.history.filter(
            (el) =>
              this.getRidOfChar(el.datetime) >= start &&
              this.getRidOfChar(el.datetime) <= end
          );
          this.history = result;
        }
      }
    },
  },
  watch: {
  },
  mounted: function () {
    this.getHistory();
  },
  methods: {
    /**
     * 歯列矯正履歴を取得
     */
    getHistory: function () {
      this.requestGet("/get_history");
    },

    /**
     * SQLにデータを格納
     * @param {*} url
     */
    sendData: function (url) {
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
      this.requestPost(url, data);
    },
    /**
     * APIレスポンス
     * @param {*} url
     * @param {*} data
     */
    requestGet(url) {
      axios
        .get(url)
        .then((req) => {
          this.history = [];
          //GET処理
          this.price_sum = 0;
          for (let j in req.data) {
            this.history.push(req.data[j]);
          }

          this.history_cp = this.history;

          for (let i in this.history) {
            this.history[i].datetime = this.dateFormatter(
              this.history[i].datetime
            );
            this.history[i].price = this.yenFormatter(this.history[i].price);
          }
          this.month_selector = Array.from(new Set(this.month_selector));
          this.price_sum = this.price_sum.toLocaleString();
          this.history = this.history.sort(
            (b, a) =>
              this.revertDateFormat(b.datetime) -
              this.revertDateFormat(a.datetime)
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },

    /**
     * 歯列矯正歴を保存する
     * @param {*} url
     * @param {*} data
     */
    requestPost(url, data) {
      axios
        .post(url, data)
        .then((req) => {
          console.log(req);
          this.getHistory();
          this.date = "";
          this.price = "";
          this.memo = "";
        })
        .catch((err) => {
          console.log(err);
        });
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

    getRidOfChar: function (date) {
      if (date.length == 8) {
        let newDate = date.replace("年", "").replace("月", "");
        return newDate;
      } else {
        let newDate = date
          .replace("年", "")
          .replace("月", "")
          .replace("日", "");
        return newDate;
      }
    },

    clearFilter: function () {
      this.start_date = "";
      this.end_date = "";
      this.history = this.history_cp;
    },

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
     * @param {*} id
     */
    requestDelete(id) {
      if (window.confirm("削除してよろしいでしょうか？")) {
        axios
          .post("/delete", id)
          .then((req) => {
            console.log(req);
            this.getHistory();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        return;
      }
    },
  },
};
