<template>
  <div ref="test" class="test"></div>
</template>

<script>
export default {
  name: 'Animation',

  mounted() {
    setTimeout(() => {
      this.$refs.test.style.opacity = '1'
    }, 1000)
  }
}
</script>

<style scoped>
.test {
  opacity: 0;
  display: block;
  height: 30px;
  background-color: blue;
}
</style>