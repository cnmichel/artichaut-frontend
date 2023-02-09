import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import axios from "axios";

// @ts-ignore
import router from './router'

import './assets/main.css'
import 'element-plus/dist/index.css'

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

createApp(App)
    .use(router)
    .use(ElementPlus)
    .mount('#app')
