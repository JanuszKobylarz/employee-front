<template>
  <div :class="expandButtonClass">
    <span></span>
    <span class="vertical"></span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps(['isExpanded'])
const expandButtonClass = computed(() => {
  return props.isExpanded ? 'button expanded' : 'button'
})
</script>

<style scoped>
.button {
  cursor: pointer;
  width: 25px;
  height: 25px;
  border-radius: 5px;
  background-color: green;
  transition: all 0.4s ease;
  position: relative;
  transform: rotate(0deg);
  transition: all 0.4s ease;

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

  &.expanded {
    .vertical {
      transform: translate(-50%, -50%) rotate(0deg);
    }
  }
}
</style>
