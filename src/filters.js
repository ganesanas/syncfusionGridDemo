import moment from "moment";
import Vue from "vue";

export const FILTERS = {
  formatDate(value) {
    if (value) {
      return moment(String(value)).format("DD MMMM YYYY");
    }
  },
  formatDateJSON(value, format = "DD MMMM YYYY") {
    if (value) {
      let idx1 = value.indexOf("(");
      let idx2 = value.indexOf("+");
      let date = "";
      if (idx1 > 0 && idx1 < idx2 && idx2 < value.length) {
        date = value.substring(idx1 + 1, idx2);
      }
      return moment(+date).format(format);
    }
  },
  currency(value) {
    let currencySymbol = localStorage.getItem("currency_symbol")
      ? localStorage.getItem("currency_symbol")
      : "₹";
    return (
      currencySymbol + parseFloat(Number(value).toFixed(2)).toLocaleString()
    );
  },
  toFixed(value) {
    return parseFloat(value).toFixed(2);
  },
};

export const registerFilters = function() {
  Object.keys(FILTERS).forEach((key) => {
    Vue.filter(key, FILTERS[key]);
  });
};
