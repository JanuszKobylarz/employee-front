<script setup>
import { ref, onMounted } from 'vue'
import AddForm from './components/AddForm.vue'
import EmployeeItem from './components/EmployeeItem.vue'

const employees = ref(null)

onMounted(() => {
  fetch('http://localhost:8000/api/employees')
    .then((response) => response.json())
    .then((data) => (employees.value = data))
})
</script>

<template>
  <div>
    <div v-if="!employees" class="text-center">
      <div class="spinner-border spinner-border-sm"></div>
    </div>
    <EmployeeItem v-if="employees" :employees="employees" />
    <AddForm />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
