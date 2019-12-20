import Vue from 'vue'
import Router from 'vue-router'
//引导页
const lead=()=>import("@/view/lead"); 
//主页
const base=()=>import("@/view/base");
//一级路由
const msite=()=>import("@/components/base/msite");
const sort=()=>import("@/components/base/sort");
const car=()=>import("@/components/base/car");
const person=()=>import("@/components/base/person");
const info=()=>import("@/components/base/info");
const searchlist=()=>import("@/components/search/searchlist");

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/base',
      name: 'base',
      component: base,
      beforeEnter:(to,from,next)=>{
        //如果本地存储中没有lead字段。跳转到lead引导页
        if(localStorage.getItem("lead")){
          next()
        }else{
          next("/lead");
          localStorage.setItem("lead",new Date().getTime())
        }
      },
      children:[
        {
          path: 'msite',
          name: 'msite',
          component: msite
        },
        {
          path: 'sort',
          name: 'sort',
          component: sort
        },
        {
          path: 'car',
          name: 'car',
          component: car
        },
        {
          path: 'person',
          name: 'person',
          component: person
        },
        {
          path: 'info/:id',
          name: 'info',
          component: info
        },
      ]
      
    },
    {
      path: '/lead',
      name: 'lead',
      component: lead
    },
    {
      path: 'searchlist',
      name: 'searchlist',
      component: searchlist
    },
    {
      path:"/",
      redirect:"/base"
    }
  ]
})
