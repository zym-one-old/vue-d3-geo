import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import Canvas from '../views/Canvas.vue'
const NProgress = require('nprogress')
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // {
  //   path: '/canvas',
  //   name: 'Canvas',
  //   component: Canvas
  // }
]

const router = new VueRouter({
  mode: 'history',
  routes
})


NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
