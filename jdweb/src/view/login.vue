<template>
    <div>
        <h1 style="text-align:center;">登录页面</h1>
          <!-- 表单内容 -->
    <van-cell-group>
      <van-field
        v-model="username"
        required
        clearable
        label="用户名"
        right-icon="question-o"
        placeholder="请输入用户名"
        @click-right-icon="$toast('question')"
      />
      <van-field v-model="password" label="密码" placeholder="请输入密码" required />
    </van-cell-group>
    <!-- 按钮 -->
     <van-button type="info" @click="register">注册</van-button>
    <van-button type="info" @click="login">登录</van-button>
    </div>
</template>
<script>
import base from "@/myconfig/base.js"
export default {
    data(){
        return{
            username:"",
            password:"",
        }
    },
    methods:{
        register(){
            this.$router.push({name:"register"})
        },
        login(){
        this.axios.post(`${base.url}/login`,{
            username:this.username,
            password:this.password
        }).then(res=>{
            let obj=res.data;
            if(res.data.err_code=200){
                this.$store.commit("loginchange",obj)
                alert('登录成功')
                this.$router.push({name:"msite"})
            }else{
                alert("登录失败，请重试")
            }
        })
    }

    }
    
}
</script>