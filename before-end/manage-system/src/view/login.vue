<template>
  <div class="login-page">
    <!-- 登录信息页面 -->
    <h2 v-if="flag">渠道商管理平台</h2>
    <div class="login" v-if="flag">
      <img
        src="http://hbimg.huabanimg.com/f6ee1b095215b8c2955fd07e56e2739b2671cd3579f0d-5feCNB_fw658"
        alt
      />
      <!-- 表单内容 -->
      <el-form ref="form" :model="form" label-width="100px" size="200px">
        <el-form-item label="职位" :rules="[{ required: true}]">
          <el-select v-model="form.region">
            <el-option label="请选择" value="请选择"></el-option>
            <el-option label="管理员" value="管理员"></el-option>
            <el-option label="企业" value="企业"></el-option>
            <el-option label="公司" value="公司"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" :rules="[{ required: true}]">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" :rules="[{ required: true}]">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 登陆成功页面 -->
    <div class="success" v-if="!flag">
      <i class="el-icon-success animated bounce"></i>
      <h4 class="animated shake delay-1s" style="text-align:center;margin-top:20px;">登陆成功</h4>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      flag: true,
      form: {
        region: "管理员",
        name: "",
        password: ""
      }
    };
  },

  methods: {
    submitForm(formName) {
      //前后台交互
      let { name, password } = this.form;
      this.axios
        .post("/login", { name: name, password: password })
        .then(res => {
          if (res.data.err_code == 400) {
            alert("登录失败");
            this.form.name="";
            this.form.password="";
            return;
          } else {
            //保存token
            localStorage.setItem("manage",JSON.stringify({"token":res.data.token,"id":res.data.id}));


            //跳转页面
            this.flag = false;
            let that = this;
            setTimeout(function() {
               that.$router.push({ "name": "useranalysis" });
            }, 2500);
          }
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style >
* {
  margin: 0;
  padding: 0;
}
html,
body,
#app,
.login-page {
  height: 100%;
}
.login-page {
  background-repeat: no-repeat;
  background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576121965&di=f8fc6b3ad4fe7bc3b436d71a49ac4914&imgtype=jpg&er=1&src=http%3A%2F%2Fku.90sjimg.com%2Fback_pic%2F04%2F55%2F32%2F2758647286d10c4.jpg);
  background-size: cover;
}

.login {
  width: 400px;
  height: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -200px;
  margin-top: -200px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  text-align: center;
  padding: 0 37px;
  box-sizing: border-box;
}
.login-page h2 {
  text-align: center;
  line-height: 100px;
}
.login img {
  width: 100px;
  height: 100px;
  margin: 20px;
}
.success {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -50px;
  margin-top: -50px;
}
.success i {
  font-size: 100px;
  color: green;
}
</style>

