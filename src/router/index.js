import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProfileView from '../views/ProfileView.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },

  // {
  //   path: '/',
  //   children: [
  //     {
  //       // UserProfile will be rendered inside User's <router-view>
  //       // when /user/:id/profile is matched
  //       path: '/home',
  //       component: HomeView,
  //     },
  //     {
  //       // UserPosts will be rendered inside User's <router-view>
  //       // when /user/:id/posts is matched
  //       path: '/profile',
  //       component: ProfileView,
  //     },
  //   ],
  // },

  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignupView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
