<template>
    <div>
        <h1>个人中心</h1>
        <h1>welcome {{username}}</h1>
    </div>
</template>
<script>
import {mapState} from "vuex";
import base from "@/myconfig/base.js"
export default {
    computed:{
        ...mapState(["token","id","username"])
    },
    beforeRouteEnter(to,from,next){
        next(vm=>{
            vm.axios.get(`${base.url}/checktoken`,{headers:{
                token:JSON.parse(localStorage.getItem("jd-webpack")).token
            }}).then(res=>{
                if(res.data.err_code==200){
                    next()
                }else{
                    alert("登录过期，请重新登陆")
                    vm.$router.push({name:"login"})
                }
            })
        })

    }
    
}
</script>