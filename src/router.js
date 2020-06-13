import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import LandingPage from './views/LandingPage.vue'
import Dashboard from './views/admin/Dashboard.vue'
import Gejala from './views/admin/Gejala.vue'
import Penyakit from './views/admin/Penyakit.vue'
import Diagnosa from './views/admin/Diagnosa.vue'
import User from './views/admin/User.vue'
import Akun from './views/admin/Akun.vue'
import Profile from './views/admin/Profile.vue'
import EditProfile from './views/admin/EditProfile.vue'
import Login from './views/Login.vue'
import Admin from './views/admin/Admin.vue'
import {
  fb
} from './firebase'
Vue.use(Router)

const router = new Router({
  mode: 'hash',
  linkActiveClass: 'nav-item active',
  base: process.env.BASE_URL,
  routes: [{
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/',
      name: 'lannding page',
      component: LandingPage
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      redirect: '/admin/dashboard',
      // meta: {
      //   requiresAuth: true
      // },
      children: [{
          path: 'dashboard',
          name: 'dashboard',
          component: Dashboard
        },
        {
          path: 'gejala',
          name: 'gejala',
          component: Gejala
        },
        {
          path: 'penyakit',
          name: 'penyakit',
          component: Penyakit
        },
        {
          path: 'diagnosa',
          name: 'diagnosa',
          component: Diagnosa
        },
        {
          path: 'akun',
          name: 'akun',
          component: Akun
        },
        {
          path: 'user',
          name: 'user',
          component: User
        },
        {
          path: 'profile',
          name: 'profile',
          component: Profile
        },
        {
          path: 'edit-profile',
          name: 'edit-profile',
          component: EditProfile
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/admin/About.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {

  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = fb.auth().currentUser

  if (requiresAuth && !currentUser) {
    next('/home')
  } else if (requiresAuth && currentUser) {
    next()
  } else {
    next()
  }
})

export default router;
