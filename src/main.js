import { createApp } from 'vue'
import App from './App.vue'
import store from './store';
import router from '@/router';
import i18n from "@/i18n";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import '@/assets/css/style.css';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(Antd)
app.use(i18n);

app.mount('#app');
