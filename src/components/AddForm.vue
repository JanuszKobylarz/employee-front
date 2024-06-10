<template>
  <Alert v-if="msg" :msg="msg" :type="alertType" />
  <div v-if="isOpen" class="modal">
    <div class="modal-content" @click.stop="">
      <div class="modal-header">
        <h2>{{ $t('Add subordinate') }}</h2>
        <span class="modal-close" @click="closeModal">&times;</span>
      </div>
      <form>
        <div class="control">
          <CustomInput v-model="employee.name" :name="'Name'" :label="'Name'" />
        </div>
        <div class="control">
          <CustomInput v-model="employee.surname" :name="'Surname'" :label="'Surname'" />
        </div>
        <div class="control">
          <Search v-model="employee.position">
            <label for="position">{{ $t('Position') }}</label>
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
import CustomInput from './Form/CustomInput.vue'
const emitter = inject('emitter')

emitter.on('add-child', (id) => {
  employee.value.parent_id = id
  isOpen.value = true
})

const isOpen = ref(false)
const loading = ref(false)
const msg = ref('')
const alertType = ref('success')
const employee = ref({})

const closeModal = () => {
  clearEmployee()
  isOpen.value = false
}

const clearEmployee = () => {
  employee.value = {
    name: '',
    surname: '',
    position: '',
    parent_id: ''
  }
}

clearEmployee()

const addEmployee = () => {
  if (
    employee.value.name.trim() === '' ||
    employee.value.surname.trim() === '' ||
    employee.value.position.trim() === ''
  ) {
    msg.value = 'All fields are required'
    alertType.value = 'alert-error'
    setAlertTimeOut()
    return
  }

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
    .then((data) => {
      msg.value = 'Employee added successfully'
      alertType.value = 'alert-success'
      setAlertTimeOut()
      emitter.emit('added-child', data.parent_id)
      closeModal()
    })
    .catch((error) => {
      error.json().then((data) => {
        alertType.value = 'alert-error'
        if (data.error) {
          msg.value = data.error
        } else {
          msg.value = 'Error adding employee'
        }
        setAlertTimeOut()
      })
    })
    .finally(() => {
      loading.value = false
    })
}

const setAlertTimeOut = () => {
  setTimeout(() => {
    msg.value = ''
  }, 3000)
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
