<template>
  <div>
    <h1>管理员添加列表</h1>
    <el-form ref="form" label-width="80px" size="medium">
      <el-form-item label="管理员名">
        <el-input v-model="admin"></el-input>
      </el-form-item>
      <el-form-item label="管理员密码">
        <el-input v-model="password"></el-input>
      </el-form-item>
      <el-form-item label="角色">
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
    <el-button type="success" plain @click="add">添加</el-button>
    <el-button type="primary" plain @click="$router.push({'name':'managerlist'})">返回</el-button>
  {{value}}
  </div>
</template>
<script>
import tree from "@/myjs/tree.js"
export default {
  data() {
    return {
      admin:"",

      password:"",
      value:[],
      options: []
    };
  },
  mounted(){
    //请求数据  所有权限   ---将数据处理为{...  children:[]}
    this.axios.get("/roleGet").then(res=>{
        console.log(res)
        if(res.data.err_code==200){
            this.options=res.data.data;
        }

      
    })
  },
  methods:{
    add(){
      let obj={admin:this.admin,password:this.password,roleId:this.value}
      // 将obj通过ajax,传递给node,将角色名，角色所属权限的数组插入到数据库中
      this.axios.post("/managerAdd",obj).then(res=>{
        if(res.data.err_code==200){
          alert("添加成功")
          this.$router.push({"name":"managerlist"})
        }else{
          alert("添加失败")
          this.value="";
          this.title="";
        }
      })
    }
  }
};
</script>