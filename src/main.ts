import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'

// @ts-ignore
import router from './router'

import './assets/main.css'
import 'element-plus/dist/index.css'

createApp(App)
    .use(router)
    .use(ElementPlus)
    .mount('#app')
