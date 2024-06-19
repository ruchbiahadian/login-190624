import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '@/assets/style.scss'
import cookie from "js-cookie";

import axios from 'axios'
// import VueAxios from 'vue-axios'

const axiosinstance = axios.create({
    baseURL: 'https://api.escuelajs.co/api/v1/',
    timeout: 180000, // 3 menit
    headers: {
        Authorization: 'Bearer',
        'Content-Type': 'application/json',
    }
})

if(cookie.getJSON('userdata') !== undefined){    
    let auth = cookie.getJSON('userdata')
    store.commit('SET_LOGIN', auth)
    axiosinstance.interceptors.request.use(
    (config) => {
        
        config.headers['Authorization'] = `Bearer ${auth.access_token}`;
        
     
      return config;
    },
    (error) => Promise.reject(error)
  );
}

const app = createApp(App)
app.use(store)
app.use(router)
app.config.globalProperties.$axios = {...axiosinstance}
app.mount('#app')

