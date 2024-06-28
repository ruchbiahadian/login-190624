import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '@/views/Login.vue'
import HomeView from '@/views/Home.vue'
import CategoryView from '@/views/Category.vue'
import AboutView from '@/views/About.vue'
import EditView from '@/views/Edit.vue'
import AddProductView from '@/views/addProduct.vue'
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

  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta:{
      requireAuth: true
    }
  },

  {
    path: '/edit/:id',
    name: 'edit',
    component: EditView,
    meta:{
      requireAuth: true
    }
  },

  {
    path: '/category',
    name: 'category',
    component: CategoryView,
    meta:{
      requireAuth: true
    }
  },

  {
    path: '/addProduct',
    name: 'addProduct',
    component: AddProductView,
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
