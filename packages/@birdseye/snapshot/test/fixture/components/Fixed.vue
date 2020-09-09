<template>
  <div>
    <p>This is the base text</p>
    <p class="fixed">This is the text on the fixed element</p>
  </div>
</template>

<style scoped>
.fixed {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 16px;
  background-color: #333;
  color: #fff;
}
</style>