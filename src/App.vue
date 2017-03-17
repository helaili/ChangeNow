<template>
  <div id="app">
    <topbar></topbar>
    <img src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
import Topbar from '@/components/Topbar'

export default {
  name: 'app',
  components: {
    Topbar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  margin: 0;
  padding: 0;
}
</style>
