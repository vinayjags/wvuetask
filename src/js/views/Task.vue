<template>
  <div v-if="isLoading">
    <div class="column">
      <div class="column is-half is-offset-one-quarter">
        <div class="has-text-centered">
          <i class="fa fa-spinner fa-spin"></i>&nbsp;Loading Task. Please Wait!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store';
import axios from 'axios';

export default {
  created(){
    if(this.store.isLoggedin == false){
      this.$router.push('/');
    }
  },
  data () {
    return {
      isLoading: false,
      store: store.state,
      task:[]
    }
  },
  mounted(){
    //this.getLatestTask();
  },
  methods:{
    getLatestTask(){
     if(this.task.length == 0 && this.loading == false){
       this.isLoading = true;
       axios.get('task.json')
       .then((response) => {
          this.isLoading = false;
          console.log(response);
       });
     } 
    }
  }
}
</script>