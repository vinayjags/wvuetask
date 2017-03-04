import Vue from 'vue'
import VueRouter from 'vue-router';
import router from './router';
import store from './store';

Vue.use(VueRouter);

const app = new Vue({
  el: '#app',
  router,
  data:{
    toggleMobileMenu: false,
    store: store.state
  },
  methods:{
    toggleMobileMenuClick(){
      this.toggleMobileMenu = !this.toggleMobileMenu;
    },
    hideNavMenu(logout){
      this.toggleMobileMenu = false;
      if(logout == true){
        store.setLoginName('');
        store.setLoginState(false);
        this.$router.push('/');
      }
    }
  },
  computed:{
    userName(){
      let nameSplit = this.store.loginName.trim().split(" ");
      return "Hello, "+nameSplit[0];
    }
  }
});