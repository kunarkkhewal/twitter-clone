import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProfileView from "../views/ProfileView.vue";
import store from "../store/index";
import ROUTES from "./routes";

Vue.use(VueRouter);

const routes = [
  {
    path: ROUTES.HOME_ROUTE,
    name: "home",
    component: HomeView,
  },
  {
    path: ROUTES.PROFILE_ROUTE,
    name: "profile",
    component: ProfileView,
  },
  {
    path: ROUTES.LOGIN_ROUTE,
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoginView.vue"),
  },
  {
    path: ROUTES.SIGNUP_ROUTE,
    name: "signup",
    component: () => import("../views/SignupView.vue"),
  },
  {
    path: "*",
    redirect: ROUTES.HOME_ROUTE,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  store.dispatch("fetchLoggedInUser");
  if (to.fullPath === ROUTES.HOME_ROUTE || to.fullPath.includes("profile")) {
    if (!store.state.isLoggedIn) {
      next(ROUTES.LOGIN_ROUTE);
    }
  }
  if (to.fullPath === "/login") {
    if (store.state.isLoggedIn) {
      next(ROUTES.HOME_ROUTE);
    }
  }
  next();
});

export default router;
