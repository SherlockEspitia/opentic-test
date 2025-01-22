
import {createRouter, createWebHistory} from 'vue-router'
import Login from '@/components/Login.vue'
import DashBoard from '@/components/DashBoard.vue'

const routes = [
  {path:'/', name: 'Login', component: Login},
  {path: '/dashboard', name:'Dashboard', component: DashBoard,
    meta: {requiresAuth: true}
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next)=>{
  if(to.matched.some(record=>record.meta.requiresAuth)){
    const loggedUser = localStorage.getItem('user')
    if(loggedUser){
      next()
    }
  }else{
    next()
  }
})

export default router
