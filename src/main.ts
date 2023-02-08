import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
// @ts-ignore
import router from './router'
import axios from 'axios';

import './assets/main.css'
import 'element-plus/dist/index.css'

axios.defaults.baseURL="http://localhost/api";

createApp(App)
.use(router)
.use(ElementPlus)
.mount('#app')
