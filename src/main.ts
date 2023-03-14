import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
// @ts-ignore
import router from './router'
// @ts-ignore
import { i18n } from './services/i18n'
// @ts-ignore
import * as te from 'tw-elements';
import './assets/main.css'
import 'element-plus/dist/index.css'

import dayjs from "dayjs";
import 'dayjs/locale/fr'

dayjs.locale('fr')

createApp(App)
    .use(router)
    .use(i18n)
    .use(ElementPlus)
    .mount('#app')
