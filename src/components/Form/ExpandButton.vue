<template>
  <div :class="expandButtonClass" @click="toggleClass">
    <span></span>
    <span class="vertical"></span>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const emit = defineEmits(['toggle'])
const isExpanded = ref(false)

const toggleClass = () => {
  isExpanded.value = !isExpanded.value
  emit('toggle', isExpanded.value)
}

const expandButtonClass = computed(() => {
  return isExpanded.value ? 'button expanded' : 'button'
})
</script>

<style scoped>
.button {
  cursor: pointer;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: green;
  transition: all 0.4s ease;
  position: relative;
  transform: rotate(0deg);
  transition: all 0.4s ease;

  span {
    position: absolute;
    display: block;
    width: 0px;
    height: 0px;
    border-style: solid;
    border-width: 5px 0 5px 10px;
    border-color: transparent transparent transparent #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &.expanded {
    background-color: red;
    transform: rotate(90deg);
  }
}
</style>
