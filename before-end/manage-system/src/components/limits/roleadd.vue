<template>
  <div>
    <h1>角色添加列表</h1>
    <el-form ref="form" label-width="80px" size="medium">
      <el-form-item label="角色名">
        <el-input v-model="title"></el-input>
      </el-form-item>
      <el-form-item label="权限列表">
        <div class="block">
          
          <el-cascader v-model="value" :options="options" :props="{ multiple: true, checkStrictly: true }" collapse-tags clearable></el-cascader>
        </div>
      </el-form-item>
    </el-form>
    <el-button type="success" plain @click="add">添加</el-button>
    <el-button type="primary" plain @click="$router.push({'name':'rolelist'})">返回</el-button>
  {{value}}
  </div>
</template>
<script>
import tree from "@/myjs/tree.js"
export default {
  data() {
    return {
      title:"",
      value:[],
      options: []
    };
  },
  mounted(){
    //请求数据  所有权限   ---将数据处理为{...  children:[]}
    this.axios.get("/limitGet").then(res=>{
      this.options=tree(res.data.data,0)
    })
  },
  methods:{
    add(){
      let obj={title:this.title,limitId:this.value}
      console.log(obj);
      // 将obj通过ajax,传递给node,将角色名，角色所属权限的数组插入到数据库中
      this.axios.post("/roleAdd",obj).then(res=>{
        if(res.data.err_code==200){
          alert("添加成功")
          this.$router.push({"name":"rolelist"})
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