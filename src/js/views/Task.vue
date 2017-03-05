<template>
  <div>
    <div v-if="isLoading">
      <div class="column">
        <div class="column is-half is-offset-one-quarter">
          <div class="has-text-centered">
            <i class="fa fa-spinner fa-spin"></i>&nbsp;Loading Task. Please Wait!
          </div>
        </div>
      </div>
    </div>
    <div v-if="!isLoading">
      <div class="column">
        <div class="column is-half is-offset-one-quarter">
        <h3>Assigned Task</h3>
          <ul class="task-list">
            <task-list v-for="task in tasks" v-bind:title="task.title" :key="task.id"></task-list>
          </ul>
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
      tasks:[]
    }
  },
  mounted(){
    if(this.store.isLoggedin == true){
      this.getLatestTask();
    }
  },
  methods:{
    getLatestTask(){
     if(this.tasks.length == 0 && this.isLoading == false){
       this.isLoading = true;
       setTimeout(() => {
       axios.get('task.json')
       .then((response) => {
          this.isLoading = false;
          this.tasks = response.data;
       });
       },3000);
     } 
    }
  }
}
</script>