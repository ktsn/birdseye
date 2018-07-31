<template>
  <div id="app">
    Hello
    <div ref="slot" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  mounted() {
    // Hack for avoid processing slot in Vue
    const slot = document.createElement('slot')
    const wrapper = this.$refs.slot as HTMLElement
    wrapper.appendChild(slot)
  }
})
</script>

<style>
@import '~k-css/k.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
