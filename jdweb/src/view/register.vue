<template>
  <div>
      <!-- 表单内容 -->
    <van-cell-group>
      <van-field
        v-model="username"
        required
        clearable
        label="用户名"
        right-icon="question-o"
        placeholder="请输入用户名"
         :error-message="errmsg"
        @click-right-icon="$toast('question')"
        @blur="check"
      />
      <van-field v-model="password" :error-message="password==realpassword&&password!=''&&realpassword!=''?'':'请填写密码'" type="password" label="密码" placeholder="请输入密码" required />
      <van-field v-model="realpassword" type="password" label="确认密码" placeholder="请输入密码" required />
    </van-cell-group>
    <!-- 短信验证码 -->
    <van-cell-group>
      <van-field center clearable label="短信验证码" placeholder="请输入短信验证码">
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
      <!-- 按钮 -->
    </van-cell-group>
    <van-button type="danger" @click="cancel">取消</van-button>
    <van-button type="info" @click="register">注册</van-button>
  </div>
</template>
<script>
import base from "@/myconfig/base.js"
export default {
  data() {
    return {
      username: "",
      password: "",
      realpassword:"",
      errmsg:""
    };
  },
  methods:{
    //   查看用户名是否已被注册
      check(){
          this.axios.post(`${base.url}/check`,{
              username:this.username
          }).then(res=>{
              if(res.data.err_code==200){
                  this.errmsg="用户名已注册"
                  // return;
              }else{
                this.errmsg="";
              }

          })
      },
      //将表单数据传入后台
      register(){
          let {username,password,realpassword}=this;
          if(username!=""&&password!=""&&password==realpassword){
              this.axios.post(`${base.url}/register`,{
              username:username,
              password:password
          }).then(res=>{
              if(res.data.err_code==200){
                alert("success")
                  this.$router.push({name:"login"})
              }else{
                  alert("注册失败，请重试")
              }
          })
          }else{
              alert("请重新填写")
          }
      },
      cancel(){
          this.username="";
          this.password="";
          this.realpassword="";
      }
  }
};
</script>