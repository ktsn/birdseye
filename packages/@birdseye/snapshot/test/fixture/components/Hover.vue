<template>
  <button class="button" type="button" data-test-id="button">
    <slot />
  </button>
</template>

<style scoped>
.button {
  padding: 12px 16px;
  background-color: #666;
  border-radius: 8px;
  border: none;
  color: #fff;
}

.button:hover {
  background-color: #aaa;
}
</style>