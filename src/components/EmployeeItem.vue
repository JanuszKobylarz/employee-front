<template>
  <div class="item">
    <div class="item-main" @click="toggleChildren(employee.id)">
      <div class="expand">
        <ExpandButton v-if="employee_has_children" :isExpanded="showChildrenFlag" />
      </div>
      <span>
        {{ employee.name }}
      </span>
      <span>
        {{ employee.surname }}
      </span>
      <span> ({{ employee.position }}) </span>
      <div class="control">
        <AddButton @click.stop="addChild(employee.id)" />
      </div>
    </div>
    <div class="children" v-if="children.length > 0 && showChildrenFlag">
      <EmployeeItem v-for="employee in children" :employee="employee" :key="employee.id" />
    </div>
  </div>
</template>
<script setup>
import { ref, inject, watch } from 'vue'
import ExpandButton from './Form/ExpandButton.vue'
import AddButton from './Form/AddButton.vue'

import useFetch from '../composables/useFetch'

const props = defineProps(['employee'])

const employee_has_children = ref(props.employee.has_children)

const emitter = inject('emitter')
const addChild = (id) => {
  emitter.emit('add-child', id)
}

const showChildrenFlag = ref(false)
const toggleChildren = () => {
  if (employee_has_children.value === false) {
    return
  }
  showChildrenFlag.value = !showChildrenFlag.value
  if (children.value.length > 0) {
    return
  }
  params.value = {'parent': props.employee.id }
  fetchData()
}

emitter.on('added-child', (id) => {
  if (props.employee.id === id) {
    params.value = { 'parent': props.employee.id }
    fetchData()
  }
})

const { data: children, params, fetchData } = useFetch(`http://localhost:8000/api/employees`)

watch(children, (newChildren) => {
  employee_has_children.value = newChildren.length > 0
})


</script>
<style scoped>
.item {
  cursor: pointer;
  background-color: white;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;

  .children {
    padding-bottom: 10px;
    padding-right: 10px;
  }
}

.expand {
  display: flex;
  align-items: center;
  gap: 4px;
  width: 30px;
}

.item-main {
  display: flex;
  padding: 1rem;
  gap: 4px;
  position: relative;
  align-items: center;

  .control {
    display: flex;
    gap: 4px;
    align-items: center;
    margin-left: auto;
    right: 1rem;
  }
}

.children {
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>
