<template>
  <div>
    <label :for="name">{{ $t(label) }} </label>
    <input
      :name="name"
      v-model="inputValue"
      :class="{ error: !isValid }"
      @input="validateInput"
      @change="emit('update:modelValue', $event.target.value)"
    />
    <span v-if="!isValid" class="error-message">{{ $t(validationMsg) }}</span>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['update:modelValue'])
defineProps(['name', 'label'])

const inputValue = ref('')
const validationMsg = ref('')
const isValid = ref(true)

const validateInput = () => {
  if (inputValue.value.trim() !== '') {
    isValid.value = true
  } else {
    isValid.value = false
    validationMsg.value = 'This field is required'
    return
  }

  const hasNumbers = /[0-9]/.test(inputValue.value)
  if (!hasNumbers) {
    isValid.value = true
  } else {
    isValid.value = false
    validationMsg.value = 'Field can`t contain any number'
  }
}
</script>

<style>
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

.error {
  border: 1px solid red;
}
.error-message {
  color: red;
}
</style>
