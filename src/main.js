import 'bootstrap';
import '@fortawesome/fontawesome-free/js/all.js';
import './assets/main.scss';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// ----------------------------------------------

const app = createApp(App);
app.config.globalProperties._db = null; // Used to store cards data
app.config.globalProperties._userdata = null;
app.use(router).mount('#app');