import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { server } from './mocks/browser'

import './assets/main.css'

const app = createApp(App)

// 指摘修正
// console.log(process.env.NODE_ENV)
if (import.meta.env.MODE === 'development') {
  // const { server } = require('./mocks/browser')
  // console.log(require)
  // server.
  server.start()
}

app.use(createPinia())
app.use(router)

app.mount('#app')