import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/index.css'
import 'iconify-icon'

import App from './App.vue'
import router from './router'
import { plugin } from '@formkit/vue'
import config from '../formkit.config'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(plugin, config)

app.mount('#app')
