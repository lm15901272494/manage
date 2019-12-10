import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
const login =()=>import("@/view/login");
const base=()=>import("@/view/base");



const limitlist =()=>import("@/limits/limitlist")
const  limitadd =()=>import("@/limits/limitadd")
const  rolelist =()=>import("@/limits/rolelist")
const  roleadd =()=>import("@/limits/roleadd")
const  rolechange =()=>import("@/limits/rolechange")
const  managerlist =()=>import("@/limits/managerlist")
const  manageradd =()=>import("@/limits/manageradd")
const useranalysis=()=>import("@/components/analysis/useranalysis")
const orderanalysis=()=>import("@/components/analysis/orderanalysis")
Vue.use(Router)

let router= new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/base',
      name: 'base',
      component: base,
      children:[
        {
          path: 'useranalysis',
          name: 'useranalysis',
          component: useranalysis
        },
        {
          path: 'orderanalysis',
          name: 'orderanalysis',
          component: orderanalysis
        },
        {
          path: 'limitlist',
          name: 'limitlist',
          component: limitlist
        },
        {
          path: 'limitadd',
          name: 'limitadd',
          component: limitadd
        },
        {
          path: 'rolelist',
          name: 'rolelist',
          component: rolelist
        },
        {
          path: 'roleadd',
          name: 'roleadd',
          component: roleadd
        },
        {
          path: 'rolechange/:id',
          name: 'rolechange',
          component: rolechange
        },
        {
          path: 'managerlist',
          name: 'managerlist',
          component: managerlist
        },
        {
          path: 'manageradd',
          name: 'manageradd',
          component: manageradd
        },

      ]

    },{
      path:'/',
      redirect:"/base/useranalysis"
    }

  ]
})
//全局路由--每次今日页面时，验证token是否存在或过期
import axios from "axios";
router.beforeEach((to,from,next)=>{
  let token=localStorage.getItem("manage")?JSON.parse(localStorage.getItem("manage")).token:[]

   //如果不是登录页面，则验证token
   if(to.name !="login"){
     axios.get("/checktoken",{
       headers:{token:token}
     }).then(res=>{
       if(res.data.err_code==400){
        // alert("请重新登录")
         router.push({"name":"login"})
       }else{
         next();
       }
     })
   }else{
     next();
   }

})






export default router;