import { createRouter, createWebHashHistory } from "vue-router";
import store from "../store";

const routes = [
  {
    name: "HomePage",
    path: "/",
    component: () => import("@/views/HomePage"),
  },
  {
    name: "LoginPage",
    path: "/login",
    component: () => import("@/views/LoginPage"),
  },
  {
    name: "RegisterPage",
    path: "/register",
    component: () => import("@/views/RegisterPage"),
  },
  {
    name: "NewBookmarkPage",
    path: "/new",
    component: () => import("@/views/NewBookmark"),
  },
  {
    name: "Favorites",
    path: "/favorites",
    meta: {
      componentName: "appBookmarkList",
    },
    component: () => import("@/views/AccountPage"),
  },
  {
    name: "Likes",
    path: "/likes",
    meta: {
      componentName: "appBookmarkList",
    },
    component: () => import("@/views/AccountPage"),
  },
  {
    name: "Settings",
    path: "/settings",
    meta: {
      componentName: "userSettings",
    },
    component: () => import("@/views/AccountPage"),
  },
];
const router = createRouter({
  routes,
  history: createWebHashHistory(),
});
router.beforeEach((to, from, next) => {
  const _isAuthenticated = store.getters._isAuthenticated;

  //Giriş yapmadan anasayfaya erişim hakkı  verilmedi.
  const authRequiredRoutes = ["HomePage"];
  if (authRequiredRoutes.indexOf(to.name) > -1) {
    if (_isAuthenticated) next();
    else next({ name: "LoginPage" });
  } else {
    next();
  }
  //Giriş yapıldığı halde login ve register sayfalarına gitmek engellendi.
  const authNotRequiredRoutes = ["LoginPage", "RegisterPage"];

  if (authNotRequiredRoutes.indexOf(to.name) > -1 && _isAuthenticated)
    next(false);
});

export default router;
