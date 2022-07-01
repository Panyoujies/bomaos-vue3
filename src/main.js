import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router';
import 'ant-design-vue/dist/antd.css';
import '@/assets/css/style.css';

const app = createApp(App);

app.use(router);

app.mount('#app');
