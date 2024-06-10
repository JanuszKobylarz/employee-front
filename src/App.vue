<script setup>
import { ref } from 'vue'
import AddForm from './components/AddForm.vue'
import EmployeeItem from './components/EmployeeItem.vue'
import LoaderSpinner from './components/Global/Loader.vue'

const employees = ref(null)

fetch('http://localhost:8000/api/employees')
  .then((response) => response.json())
  .then((data) => {
    employees.value = data
  })
</script>

<template>
  <div>
    <h1>{{ $t('Employees') }}</h1>
    <div v-if="!employees" class="loader">
      <LoaderSpinner />
    </div>
    <div v-if="employees" class="employees-container">
      <EmployeeItem v-for="employee in employees" :employee="employee" :key="employee.id" />
      <AddForm />
    </div>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.employees-container {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
