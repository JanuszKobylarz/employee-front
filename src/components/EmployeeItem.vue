<template>
  <div class="item" :style="{ backgroundColor: color }">
    <div class="item-main">
      <div v-if="employee.has_children">
        <ExpandButton @toggle="toggleChildren(employee.id, $event)" :title="$t('expand/hide')" />
      </div>
      <span>
        {{ employee.name }}
      </span>
      <span>
        {{ employee.surname }}
      </span>
      <span> ({{ employee.position }}) </span>
      <div>
        <AddButton @add="addChild(employee.id)" :title="$t('Add subordinate')" />
      </div>
    </div>
    <div class="children" v-if="children.length > 0 && showChildrenFlag">
      <EmployeeItem
        v-for="employee in children"
        :employee="employee"
        :key="employee.id"
        :level="level + 1"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, inject, computed } from 'vue'
import ExpandButton from './Form/ExpandButton.vue'
import AddButton from './Form/AddButton.vue'
const props = defineProps(['employee', 'level'])

const emitter = inject('emitter')
const addChild = (id) => {
  emitter.emit('add-child', id)
}

const children = ref([])
const showChildrenFlag = ref(false)
const toggleChildren = (id, event) => {
  showChildrenFlag.value = event
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

const colors = ref([
  '#ddf3fe',
  '#fde8d4',
  '#e2f7f2',
  '#f9eae1',
  '#f5f5f5',
  '#f7f7f7',
  '#e8f5e9',
  '#fffde7',
  '#f3e5f5',
  '#e0f7fa'
])

const color = computed(() => {
  return colors.value[props.level % colors.value.length]
})
</script>
<style scoped>
.item-main {
  display: flex;
  padding: 1rem;
  gap: 4px;
  position: relative;
}

.children {
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>
