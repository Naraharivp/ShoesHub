import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { create } from 'naive-ui'

import App from './App.vue'
import router from './router'
import ScrollReveal from './components/ScrollReveal.vue'

// Create Naive UI instance
const naive = create()

const app = createApp(App)

// Register global components
app.component('ScrollReveal', ScrollReveal)

// Use plugins
app.use(createPinia())
app.use(router)
app.use(naive)

app.mount('#app')
