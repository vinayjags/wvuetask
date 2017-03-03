<template>
    <div>{{message}}</div>
</template>

<script>
import store from '../store';
export default {
  data () {
    return {
      message: 'Hello world!',
      store: store.state
    }
  }
}
</script>