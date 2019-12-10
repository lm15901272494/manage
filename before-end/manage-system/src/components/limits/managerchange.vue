<template>
  <div>
    <h1>管理员修改列表</h1>
<el-form ref="form" label-width="80px" size="medium">
      <el-form-item label="管理员名">
        <el-input v-model="admin"></el-input>
      </el-form-item>
      <el-form-item label="管理员密码">
        <el-input v-model="password"></el-input>
      </el-form-item>
      <el-form-item label="角色" v-model="value">
<el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item._id"
      :label="item.title"
      :value="item._id">
    </el-option>
  </el-select>
      </el-form-item>
    </el-form>
    <el-button type="success" plain @click="realchange">确认修改</el-button>
    
    <el-button type="primary" plain @click="$router.push({'name':'managerlist'})">返回</el-button>
  </div>
</template>
<script>
import tree from "@/myjs/tree.js"
export default {
  data() {
    return {
      admin:"",
      password:'',
      value:[],
      options: []
    };
  },
  mounted(){
    this.axios.get("/roleGet").then(res=>{
      this.options=res.data.data;
    })
    //通过路由id请求当条数据，将数据渲染到相应的表单中
    this.axios.get("/managerId",{params:{
        id:this.$route.params.id
    }}).then(res=>{
        // console.log(res.data.data)
        if(res.data.err_code==200){
            this.admin=res.data.data.name;
            this.password=res.data.data.password;
            this.value=res.data.data.roleId;
        }
    })
  },
  methods:{
    realchange(){
      let obj={id:this.$route.params.id,admin:this.admin,password:this.password,roleId:this.value}
      // 将obj通过ajax,传递给node,将角色名，角色所属权限的数组插入到数据库中
      this.axios.post("/managerChange",obj).then(res=>{
        if(res.data.err_code==200){
          alert("修改成功")
          this.$router.push({"name":"managerlist"})
        }else{
          alert("修改失败")
          this.value="";
          this.title="";
        }
      })
    }
  }
};
</script>