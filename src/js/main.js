import fonst from '../css/fonts.scss';
require("../css/main.scss");
import Vue from 'vue'

new Vue({
  el: '#app',
  data: {
    message: "Hello World"
  },
  render (h) {
    return h('h3', this.message)
  }
});