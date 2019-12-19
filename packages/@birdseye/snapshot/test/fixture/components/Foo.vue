<template>
  <p class="message">{{ foo + ' ' + bar }}</p>
</template>

<script>
export default {
  name: 'Foo',

  props: {
    foo: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      bar: ''
    }
  }
}
</script>

<style scoped>
.message {
  padding: 10px;
  border: 1px solid #ccc;
  font-weight: bold;
}
</style>
