import './assets/css/main.css'

import ui from '@nuxt/ui/vue-plugin'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ui)
app.use(VueQueryPlugin)
app.mount('#app')
