<template>
  <ul>
    <li v-for="employee in employees" :key="employee.id">
      {{ employee.name }}
    </li>
  </ul>
</template>
<script setup>
import { ref } from 'vue'

defineProps(['employees'])
</script>
