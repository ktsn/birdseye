<template>
  <div class="fill">
    <h1 class="text">This area should fill entire preview space</h1>
  </div>
</template>

<style scoped>
.fill {
  display: grid;
  align-content: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: #33a;
}

.text {
  color: #fff;
  font-size: 24px;
}
</style>

<birdseye lang="yml">
name: Fill preview area
patterns:
  - name: style
    containerStyle:
      backgroundColor: "#aaa"
      height: 100%
</birdseye>
