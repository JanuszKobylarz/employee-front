<template>
  <form>
    <div class="control">
      <label for="name">{{ $t('Name') }} </label>
      <input id="name" v-model="employee.name" />
    </div>
    <div class="control">
      <label for="surname">{{ $t('Surname') }} </label>
      <input id="surname" v-model="employee.surname" />
    </div>
    <div class="control">
      <label for="position">{{ $t('Position') }}</label>
      <input id="position" v-model="employee.position" />
    </div>
    <Search />
    <button class="btn btn-submit" @click.prevent="testSubmit">{{ $t('Add') }}</button>
  </form>
</template>
<script setup>
import { ref } from 'vue'
import Search from './Form/Search.vue'
const employee = ref({
  name: '',
  surname: '',
  position: '',
  parent_id: ''
})

const testSubmit = () => {
  fetch('http://localhost:8000/api/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(employee.value)
  }).then((result) => {
    console.log(result.json())
  })
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

.btn {
  width: 100%;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.2em;

  &.btn-submit {
    background-color: #4caf50;
    transition: background-color 0.4s ease;
    &:hover {
      background-color: #00af50;
    }
  }
}
</style>
