import { createApp } from 'vue'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import 'font-awesome/css/font-awesome.css'
import App from './App.vue'
import router from './router';
const app = createApp(App)
app.use(router)

app.mount('#app');