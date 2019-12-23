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
const list=()=>import("@/components/base/list");
const person=()=>import("@/components/base/person");
const info=()=>import("@/components/base/info");
const search=()=>import("@/components/search/search");
const searchres=()=>import("@/components/base/searchres");

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
          path: 'info',
          name: 'info',
          component: info
        },
        {
          path: 'list/:id',
          name: 'list',
          component: list
        },
        {
          path: 'searchres/:goodsname',
          name: 'searchres',
          component: searchres
        },
      ]
      
    },
    {
      path: '/lead',
      name: 'lead',
      component: lead
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path:"/",
      redirect:"/base/msite"
    }
  ]
})
