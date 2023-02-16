import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import { i18n } from 'vue-i18n'
// @ts-ignore
import router from './router'
import axios from 'axios';

import './assets/main.css'
import 'element-plus/dist/index.css'


createApp(App)
    .use(router)
    .use(ElementPlus)
    .use(i18n)
    .mount('#app')
