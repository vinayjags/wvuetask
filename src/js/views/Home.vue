<template>
    <div class="has-text-centered">
      <h1>Hello,</h1>
      <h3>Please enter your name to login & continue</h3>
      <div class="column">
        <div class="column is-half is-offset-one-quarter">
          <form @submit.prevent="login">
            <div class="control">
              <input class="input" type="text" placeholder="Name" v-model="name" @keyup="checkForErrorMessage"/>
              <span class="help is-danger" v-if="showErrorMessage">Name is required</span>
            </div>
            <div class="has-text-centered ">
              <button class="button is-danger is-medium" v-bind:class="{disabled: showErrorMessage, 'is-loading':isLoading}">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
</template>

<script>
import store from '../store';

export default {
  created(){
    if(this.store.isLoggedin == true){
      this.$router.push('/notes');
    }
  },
  data () {
    return {
      showErrorMessage: false,
      isLoading: false,
      name: '',
      store: store.state
    }
  },
  methods:{
    login(){
      if(this.name.trim() == ''){
        this.showErrorMessage = true;
      }else{
        this.isLoading = true;
        setTimeout(() => {
          this.showErrorMessage = false;
          store.setLoginName(this.name.trim());
          store.setLoginState(true);
          this.isLoading = false;
          this.$router.push('/notes');
        },3000)
      }
    },
    checkForErrorMessage(){
      if(this.name.trim() == ''){
        this.showErrorMessage = true;
      }else{
        this.showErrorMessage = false;
      }
    }
  }
}
</script>