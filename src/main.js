import "./assets/main.css";
import { createApp } from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import enter from "./components/Enter.vue";
import config from "./components/Config.vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
const routes = [
  { path: "/", component: config },
  { path: "/enter", component: enter },
];
const router = new VueRouter({
  routes,
});
const app = createApp(App);
app.use(Antd).use(router).mount("#app");
