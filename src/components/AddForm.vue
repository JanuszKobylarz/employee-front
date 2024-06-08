<template>
  <Alert v-show="msg" :msg="msg" :type="alertType" />
  <div v-if="isOpen" class="modal" @click="closeModal">
    <div class="modal-content" @click.stop="">
      <div class="modal-header">
        <h2>{{ $t('Add subordinate') }}</h2>
        <span class="modal-close" @click="closeModal">&times;</span>
      </div>
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
          <Search v-model="employee.position">
            <label for="parent">{{ $t('Supervisor') }}</label>
          </Search>
        </div>
        <div v-if="loading" class="text-center">
          <div class="spinner-border spinner-border-sm"></div>
        </div>
        <div v-if="!loading">
          <button class="btn btn-submit" @click.prevent="addEmployee">{{ $t('Add') }}</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref, inject } from 'vue'
import Search from './Form/Search.vue'
import Alert from './Global/Alert.vue'
const emitter = inject('emitter')

emitter.on('add-child', (id) => {
  employee.value.parent_id = id
  isOpen.value = true
})

const isOpen = ref(false)
const loading = ref(false)
const msg = ref('')
const alertType = ref('success')
const employee = ref({
  name: '',
  surname: '',
  position: '',
  parent_id: ''
})

const closeModal = () => {
  employee.value = {
    name: '',
    surname: '',
    position: '',
    parent_id: ''
  }
  isOpen.value = false
}

const addEmployee = () => {
  loading.value = true
  fetch('http://localhost:8000/api/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(employee.value)
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      return Promise.reject(response)
    })
    .then(() => {
      msg.value = 'Employee added successfully'
      alertType.value = 'alert-success'
      setTimeout(() => {
        msg.value = ''
      }, 3000)
    })
    .catch((error) => {
      msg.value = 'Error adding employee'
      alertType.value = 'alert-error'
      console.error(error)
    })
    .finally(() => {
      loading.value = false
      closeModal()
    })
}
</script>
<style scoped>
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #000;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-close {
  cursor: pointer;
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.modal-content {
  color: #000;
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  position: relative;
}

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
