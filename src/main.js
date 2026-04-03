import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import Toast from "vue-toastification";

import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css'
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "vue-toastification/dist/index.css";

const options = {
    position: "top-right",
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false
}
const app = createApp(App);

app.use(router);
app.use(Toast, options);
app.mount("#app");