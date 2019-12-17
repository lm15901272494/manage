import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
const login =()=>import("@/view/login");
const base=()=>import("@/view/base");



const limitlist =()=>import("@/components/limits/limitlist")
const  limitadd =()=>import("@/components/limits/limitadd")
const  rolelist =()=>import("@/components/limits/rolelist")
const  roleadd =()=>import("@/components/limits/roleadd")
const  rolechange =()=>import("@/components/limits/rolechange")
const  managerlist =()=>import("@/components/limits/managerlist")
const  manageradd =()=>import("@/components/limits/manageradd")
const  managerchange =()=>import("@/components/limits/managerchange")
const useranalysis=()=>import("@/components/analysis/useranalysis")
const orderanalysis=()=>import("@/components/analysis/orderanalysis")
//商品分类管理
const goodsort=()=>import("@/components/sortmanage/goodsort")
const sortadd=()=>import("@/components/sortmanage/sortadd")
//商品管理
const goodmanage=()=>import("@/components/goodmanage/goodlist")
const goodadd=()=>import("@/components/goodmanage/goodadd")

//订单管理
const orderlist=()=>import("@/components/ordermanage/orderlist")
const orderadd=()=>import("@/components/ordermanage/orderadd")


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
        {
          path: 'managerchange/:id',
          name: 'managerchange',
          component: managerchange
        },
        {
          path: 'sortadd',
          name: 'sortadd',
          component: sortadd
        },
        {
          path: 'goodsort',
          name: 'goodsort',
          component: goodsort
        },
        {
          path: 'goodadd',
          name: 'goodadd',
          component: goodadd
        },
        {
          path: 'goodmanage',
          name: 'goodmanage',
          component: goodmanage
        },
        {
          path: 'orderadd',
          name: 'orderadd',
          component: orderadd
        },
        {
          path: 'orderlist',
          name: 'orderlist',
          component: orderlist
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
  let token=localStorage.getItem("manage")?JSON.parse(localStorage.getItem("manage")).token:[];
  let id=localStorage.getItem("manage")?JSON.parse(localStorage.getItem("manage")).id:[]

   //如果不是登录页面，则验证token
   if(to.name !="login"){
     axios.get("/checktoken",{
       headers:{token:token}
     }).then(res=>{
       if(res.data.err_code==400){
        // alert("请重新登录")
         router.push({"name":"login"})
       }else{
         //没有权限，请联系超管
         axios.get("/checklimit",{params:{
           id:id,
           name:to.name
           //将要检测的name值==to.name
         }}).then(res=>{
           if(res.data.err_code==200){
            next();
           }else{
             alert("你没有权限进入此页面，请联系超管")
           }
         })
        // next()
       }
     })
   }else{
     next();
   }

})






export default router;