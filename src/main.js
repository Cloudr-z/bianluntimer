import "./assets/main.css";
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import pinia from "./store/store.js";
import App from "./App.vue";
import enter from "./components/Enter.vue";
import config from "./components/Config.vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
const routes = [
  { path: "/", component: config },
  { path: "/enter/:uuid", component: enter, name: "enter", props: true },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
const app = createApp(App);
app.use(Antd).use(pinia).use(router).mount("#app");
