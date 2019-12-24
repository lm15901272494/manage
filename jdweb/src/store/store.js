import  Vue from "vue";
import Vuex from "vuex"
Vue.use(Vuex)
let localobj=localStorage.getItem("jd-webpack")?JSON.parse(localStorage.getItem("jd-webpack")):{}
const store=new Vuex.Store({
    state:{
        car:[],
        token:localobj.token?localobj.token:"",
        id:localobj.id?localobj.id:"",
        username:localobj.username?localobj.username:"",
    },
    actions:{},
    mutations:{
        // 商品添加
        count(state,obj){
            let arr=[...state.car]
            let index=arr.findIndex(val=>val._id==obj._id&&val.size==obj.size)
            if(index>-1){
                arr[index].num+=obj.num;
            }else{
                arr.push(obj);
            }
            state.car=arr;
        },
        //登录后改变token，userID，username
        loginchange(state,obj){
            state.token=obj.token;
            state.id=obj.id;
            state.username=obj.username;
            localStorage.setItem("jd-webpack",JSON.stringify(obj))

        }

    },
    getters:{}
})
export default store;