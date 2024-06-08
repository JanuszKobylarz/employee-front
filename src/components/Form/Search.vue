<template>
  <div class="control">
    <slot></slot>
    <input
      ref="input"
      @input="searchEmployee"
      @change="emit('update:modelValue', $event.target.value)"
      :placeholder="$t('Find position')"
    />
    <div v-if="employees.length > 0" class="autocomplete">
      <div v-for="employee in employees" :key="employee.id" @click="selectEmployee(employee)">
        {{ employee.position }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const input = ref(null)
const employees = ref([])
const emit = defineEmits(['update:modelValue'])

const searchEmployee = () => {
  console.log(input.value.value)
  if (input.value.value.length > 2) {
    searchApi(input.value.value)
  }
}

const searchApi = (search) => {
  fetch(`http://localhost:8000/api/employee/search?name=${search}`, {})
    .then((result) => {
      return result.json()
    })
    .then((data) => {
      employees.value = data
      console.log(data)
    })
}

const selectEmployee = (employee) => {
  input.value.value = employee.position
  employees.value = []
}
</script>

<style scoped>
input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.autocomplete {
  background-color: white;
  border: 1px solid #ccc;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
}
</style>
