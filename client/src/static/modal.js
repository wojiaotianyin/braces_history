import Vue from "vue";
import VCalendar from "v-calendar";
Vue.use(VCalendar);
const axios = require("axios").create();
axios.defaults.baseURL = "http://127.0.0.1:5050";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";

export default {
  props: {
    brace_data: {
      id: "",
      date: "",
      price: "",
      memo: "",
    },
  },
  data() {
    return {
      date: null,
      newMemo: "",
      newDate: "",
      newPrice: "",
      message: "Hello from Child!",
      saved: false,
    };
  },
  name: "modal_element",
  components: {},
  computed: {},
  watch: {},
  created() {
    this.$emit("sendMessage", this.message);
  },
  mounted() {
    
  },
  methods: {
    saveData: function () {
      this.updateData(this.brace_data);
    },
    /**
     * APIレスポンスUPDATE
     * @param {*} url
     * @param {*} data
     */
    updateData(data) {
      if (window.confirm("変更を保存してよろしいでしょうか？")) {
        axios
          .post("/update", data)
          .then((req) => {
            console.log(req);
            this.saved = true;
            this.$emit("dataSaved", this.saved);
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
