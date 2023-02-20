import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'tw-elements';
// @ts-ignore
import router from './router'
// @ts-ignore
import { i18n } from './i18n'

import './assets/main.css'
import 'element-plus/dist/index.css'
import 'tw-elements';

createApp(App)
    .use(router)
    .use(i18n)
    .use(ElementPlus)
    .mount('#app')
