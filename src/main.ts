import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store, key } from './store';

import 'bootstrap/dist/css/bootstrap.min.css';

import Equal from 'equal-vue';
import 'equal-vue/dist/style.css';

createApp(App).use(store, key).use(router).use(Equal).mount('#app');
