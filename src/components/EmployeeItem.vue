<template>
  <div>
    <div class="employee-item" v-for="employee in employees" :key="employee.id">
      <span>
        {{ employee.name }}
      </span>
      <span>
        {{ employee.surname }}
      </span>
      <span>
        {{ employee.position }}
      </span>
    </div>
  </div>
</template>
<script setup>
defineProps(['employees'])
</script>
<style scoped>
.employee-item {
  display: flex;
  padding: 1rem;
  border-bottom: 1px solid #ccc;
  gap: 4px;
}
</style>
