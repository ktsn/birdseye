<template>
  <div>
    <button class="button">Active Test</button>
    <input class="input" type="text">
  </div>
</template>

<style scoped>
.button {
  display: block;
  padding: 8px 16px;
  background-color: blue;
  color: #fff;
}

.button:active {
  background-color: red;
}

.input {
  display: block;
  margin-top: 16px;
}
</style>
