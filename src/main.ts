import { createApp } from 'vue'
import App from './App.vue'
// @ts-ignore
import router from './router'
import axios from 'axios';

import './assets/main.css'
import 'ant-design-vue/dist/antd.css'; 

axios.defaults.baseURL="http://localhost/api";

createApp(App).use(router).mount('#app')
