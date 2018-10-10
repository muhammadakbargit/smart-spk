import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Welcome from '@/components/Welcome'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Information from '@/components/Information'
import Dashboard from '@/components/Dashboard'
import Criteria from '@/components/Criteria'
import Alternatif from '@/components/Alternatif'
import Laporan from '@/components/Laporan'
import Ranking from '@/components/Ranking'
import Siswa from '@/components/Siswa'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/information',
      name: 'Information',
      component: Information,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/criteria',
      name: 'Criteria',
      component: Criteria,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/siswa',
      name: 'Siswa',
      component: Siswa,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/alternatif',
      name: 'Alternatif',
      component: Alternatif,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/ranking',
      name: 'Ranking',
      component: Ranking,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/laporan',
      name: 'Laporan',
      component: Laporan,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(!currentUser){
      next('/login')
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)){
    if(!currentUser){
      next()
    } else {
      next('/dashboard')
    }
  } else {
    next()
  }
})

export default router