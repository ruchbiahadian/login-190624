import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '@/views/Login.vue'
import HomeView from '@/views/Home.vue'
import store from '@/store'


const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
    meta:{
      guest: true
    }
  },

  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta:{
      requireAuth: true
    }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// kondisi disaat login
router.beforeEach((to, from, next)=>{
  if(to.matched.some(record => record.meta.requireAuth)){
    if(store.state.userdata == null){
      next('/')
    }
  }
  if(to.matched.some(record => record.meta.guest)){
    if(store.state.userdata !== null){
      next('/home')
    }
  }
  next();
})


export default router
