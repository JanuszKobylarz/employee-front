<template>
  <div class="item">
    <div class="item-main">
      <span>
        {{ employee.name }}
      </span>
      <span>
        {{ employee.surname }}
      </span>
      <span>
        {{ employee.position }}
      </span>
      <span> {{ employee.parent_id }} </span>
      <div>
        <button
          v-if="employee.has_children && !showChildrenFlag"
          @click="toggleChildren(employee.id)"
        >
          {{ $t('Show subordinates') }}
        </button>
        <button
          v-if="employee.has_children && showChildrenFlag"
          @click="toggleChildren(employee.id)"
        >
          {{ $t('Hide subordinates') }}
        </button>
        <button @click="addChild(employee.id)">
          {{ $t('Add subordinate') }}
        </button>
      </div>
    </div>
    <div class="children" v-if="children.length > 0 && showChildrenFlag">
      <EmployeeItem v-for="employee in children" :employee="employee" :key="employee.id" />
    </div>
  </div>
</template>
<script setup>
import { ref, inject } from 'vue'
defineProps(['employee'])

const emitter = inject('emitter')
const addChild = (id) => {
  emitter.emit('add-child', id)
}

const children = ref([])
const showChildrenFlag = ref(false)
const toggleChildren = (id) => {
  showChildrenFlag.value = !showChildrenFlag.value
  loadChildren(id)
}
const loadChildren = (id) => {
  if (children.value.length > 0) {
    return
  }
  fetch(`http://localhost:8000/api/employees?parent=${id}`)
    .then((result) => {
      return result.json()
    })
    .then((data) => {
      children.value = data
    })
}
</script>
<style scoped>
.item-main {
  display: flex;
  padding: 1rem;
  gap: 4px;
}

.children {
  padding-left: 1rem;
}
</style>
