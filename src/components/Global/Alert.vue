<template>
  <div class="alert" :class="type">
    <p>{{ $t(msg) }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
defineProps(['msg', 'type'])
</script>

<style scoped>
.alert {
  padding: 10px;
  border-radius: 4px;
  color: #fff;
  font-weight: bold;
  position: fixed;
  top: 20px;
  z-index: 999;
  width: 80%;
  margin: 0 auto;
}

.alert-success {
  background-color: #28a745;
}

.alert-error {
  background-color: #dc3545;
}
</style>
