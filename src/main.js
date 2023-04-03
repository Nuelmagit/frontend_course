import { createApp, Vue } from 'vue'
import App from './App.vue'
import { router } from "./router/router"
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const app = createApp(App);

app.use(VueSweetalert2, {
    confirmButtonColor: '#258754',
    cancelButtonColor: '#ff7674',
});

app.use(router);

app.mount('#app');

