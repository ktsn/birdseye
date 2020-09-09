<template>
  <div ref="test" class="test" :class="{ blink }"></div>
</template>

<script>
export default {
  name: 'Animation',

  props: {
    blink: Boolean
  },

  mounted() {
    if (!this.blink) {
      setTimeout(() => {
        this.$refs.test.style.opacity = '1'
      }, 1000)
    }
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

.test.blink {
  animation: 1s ease-out infinite alternate blink !important;
}

@keyframes blink {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}
</style>