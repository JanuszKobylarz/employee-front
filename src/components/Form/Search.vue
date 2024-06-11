<template>
  <div class="control">
    <slot></slot>
    <input
      ref="input"
      @input="searchEmployee"
      @change="emit('update:modelValue', $event.target.value)"
      :placeholder="$t('Find position')"
    />
    <Loader v-if="loading" />
    <div v-if="employees.length > 0" class="autocomplete">
      <div
        class="autocomplete-element"
        v-for="employee in employees"
        :key="employee.id"
        @click="selectEmployee(employee)"
      >
        {{ employee.position }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { debounce } from 'lodash'
import Loader from '../Global/Loader.vue'

import useFetch from '../../composables/useFetch'

const input = ref(null)

const emit = defineEmits(['update:modelValue'])

const searchEmployee = debounce(() => {
  if (input.value.value.length > 2) {
    params.value = { 'name': input.value.value }
    fetchData()
  }
}, 500)

const { data: employees, loading, fetchData, params } = useFetch(`http://localhost:8000/api/employee/search`)

const selectEmployee = (employee) => {
  input.value.value = employee.position
  emit('update:modelValue', employee.position)
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
  .autocomplete-element {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
    &:hover {
      background-color: #f9f9f9;
    }
  }
}
</style>
