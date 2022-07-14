import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from '@/router';
import i18n from "@/i18n";
import '@/assets/css/style.css';
import './styles/index.less';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(i18n);

app.mount('#app')
