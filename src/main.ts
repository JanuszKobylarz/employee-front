import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import { i18n } from './i18n'

import mitt from 'mitt'
const emitter = mitt()

const app = createApp(App)
app.provide('emitter', emitter)
app.use(i18n)
app.mount('#app')
