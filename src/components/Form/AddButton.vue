<template>
  <div class="button" @click="$emit('add')">
    <span></span>
    <span class="vertical"></span>
  </div>
</template>

<style scoped>
.button {
  display: block;
  cursor: pointer;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: green;
  transition: all 0.4s ease;
  position: relative;

  span {
    position: absolute;
    display: block;
    background-color: white;
    width: 60%;
    height: 2px;
    top: 50%;
    left: 50%;
    transition: all 0.4s ease;
    transform: translate(-50%, -50%);
    &.vertical {
      transform: translate(-50%, -50%) rotate(90deg);
    }
  }
}
</style>
