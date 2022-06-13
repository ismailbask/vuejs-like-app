import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { appAxios } from "@/utils/appAxios";
import "@/assets/style.css";

//Socketi global olarak tanımladık
import io from "socket.io-client";
const socket = io("http://localhost:2018"); //sunucuya bağlandı.

import AppHeader from "@/components/Shered/AppHeader";
import appBookmarkList from "@/components/Shered/appBookmarkList/AppBookmarkList";
const app = createApp(App);
app.component("AppHeader", AppHeader);
app.component("appBookmarkList", appBookmarkList);
app.use(router);
app.use(store);

app.config.globalProperties.$appAxios = appAxios;
app.config.globalProperties.$socket = socket;
app.mount("#app");
