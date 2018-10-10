// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css' 
import { store } from './store'
const fb = require('./firebase/firebaseConfig.js')

Vue.config.productionTip = false
Vue.use(Vuetify)

/* eslint-disable no-new */
let app
fb.auth.onAuthStateChanged(user => {
  if(!app){
    app = new Vue({
      el: '#app',
      router,
      store,
      template: '<App/>',
      components: { App }
    })
  }
});

