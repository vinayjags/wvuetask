require("../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss");
require("../../node_modules/font-awesome/scss/font-awesome.scss");
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