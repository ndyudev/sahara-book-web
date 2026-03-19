import { createApp } from "vue";
import App from "./App.vue";
import './assets/style.css'
import router from "./router/index.js";
import './style.css'

import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css'
import "bootstrap/dist/js/bootstrap.bundle.min.js";

createApp(App).use(router).mount("#app");
