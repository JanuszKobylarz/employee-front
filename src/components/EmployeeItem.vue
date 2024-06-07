<template>
  <ul>
    <li v-for="employee in employees" :key="employee.id">
      {{ employee.name }}
    </li>
  </ul>
</template>
<script setup>
import { ref } from 'vue'
const employees = ref([
  { id: 1, name: 'Janusz', surname: 'Kobylarz', position: 'PREZES', parent_id: null },
  { id: 2, name: 'Imi\u01191', surname: 'Nazwisko1', position: 'Tester', parent_id: null },
  { id: 3, name: 'Imi\u01192', surname: 'Nazwisko2', position: 'Programista', parent_id: null },
  { id: 4, name: 'Imi\u01193', surname: 'Nazwisko3', position: 'Programista', parent_id: 1 }
])
</script>
