import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout'
import Home from '@/views/layout/home'
import Gpt from '@/views/layout/gpt'
import Owner from '@/views/layout/owner'
import Editor from '@/views/layout/editor'
import GptMobile from '@/views/mobile/gpt'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '', redirect: '/home' },
      { path: '/home', component: Home },
      { path: '/gpt', component: Gpt },
      { path: '/owner', component: Owner },
      { path: '/gptMobile', component: GptMobile }
    ]
  }
]
// 供开发使用，生产环境不能出现
if (process.env.NODE_ENV === 'development') {
  routes.push({ path: '/editor2001', component: Editor })
}

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
