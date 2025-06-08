import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ScrollReveal from './components/ScrollReveal.vue'

const app = createApp(App)

// Register global components
app.component('ScrollReveal', ScrollReveal)

// Use plugins
app.use(createPinia())
app.use(router)

app.mount('#app')
