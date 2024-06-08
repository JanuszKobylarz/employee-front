<template>
  <div class="control">
    <label for="parent">{{ $t('Supervisor') }}</label>
    <input
      id="parent"
      v-model="search"
      @change="searchEmployee"
      :placeholder="$t('Find supervisor')"
    />
    <div v-if="employees.length > 0">
      <div v-for="employee in employees" :key="employee.id" @click="selectEmployee(employee)">
        {{ employee.name }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const search = ref('')
const employees = ref([])
const selectedEmployee = ref(null)

const searchEmployee = () => {
  if (search.value.length > 2) {
    searchApi(search.value)
  }
}

const searchApi = (search) => {
  fetch(`http://localhost:8000/api/employee/search?name=${search}`, {})
    .then((result) => {
      return result.json()
    })
    .then((data) => {
      employees.value = data
    })
}

const selectEmployee = (employee) => {
  selectedEmployee.value = employee
  search.value = employee.name
  employees.value = []
}
</script>

<style scoped>
.control {
  display: flex;
  flex-direction: column;
  gap: 4px;

  label {
    font-size: 1.25em;
  }
  input {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
}
</style>
