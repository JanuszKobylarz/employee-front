<script setup>
import Alert from './components/Global/Alert.vue';
import AddForm from './components/AddForm.vue'
import EmployeeItem from './components/EmployeeItem.vue'
import LoaderSpinner from './components/Global/Loader.vue'

import useFetch from './composables/useFetch'

const { data: employees, isLoading, fetchData } = useFetch('http://localhost:8000/api/employees')

fetchData()

</script>

<template>
  <div>
    <Alert />
    <h1>{{ $t('Employees') }}</h1>
    <div v-if="isLoading" class="loader">
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
