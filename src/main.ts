import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import axios from 'axios';
import { server } from './mocks/browser';

import './assets/main.css'

const app = createApp(App)

// 指摘修正
if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser');
  worker.start();
}

app.use(createPinia())
app.use(router)

app.mount('#app')
