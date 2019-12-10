<template>
  <div>
    <h1>添加</h1>
    <el-form ref="form" label-width="80px" size="medium" >
      <el-form-item label="标题">
        <el-input v-model="title"></el-input>
      </el-form-item>
      <el-form-item label="路由">
        <el-input v-model="name"></el-input>
      </el-form-item>
      <el-form-item label="父级权限">
        <el-cascader v-model="value" :options="options" :props="{ checkStrictly: true }" :show-all-levels="false"></el-cascader>
      </el-form-item>
    </el-form>
    <el-button type="success" plain @click="add">添加</el-button>
    <el-button type="primary" plain @click="$router.push({'name':'limitList'})">返回</el-button>
  </div>
</template>
<script>
import tree from "@/myjs/tree.js"
export default {
  data() {
    return {
        title: "",
        name: "",
        value:[],
      options: [
        {
          value: "0",
          label: "一级权限"
        }
      ]
    };
  },
  //组件挂挂载后。请求所有的权限
  mounted() {
    this.axios.get("/limitGet").then(res => {
      if (res.data.err_code == 200) {
        let info = res.data.data;
        let addinfo=tree(info,0);
        this.options=[...this.options,...addinfo]
        //pid==0，代表此权限为一级权限
      }
    });
  },
  methods: {
    //无限极分类
    add() {
      let obj = {
        title: this.title,
        name: this.name,
        pid:this.value.pop(),
        //获取下拉列表中的最后一项
      };
      console.log(obj);
      this.axios.post("/limitAdd",obj).then((res)=>{
        if(res.data.err_code==200){
          alert("添加成功")
          this.$router.push({'name':'limitlist'})
        }else{
          alert("添加失败，请重试！")
          this.name="";
          this.title=""
        }
      })
    },
    // tree(info, pid) {
    //   var data = [];
    //   for (let i in info) {
    //     if (info[i].pid == pid) {
    //       var obj = {
    //         value: info[i]._id,
    //         label: info[i].title,
    //         children: this.tree(info, info[i]._id)
    //       };
    //       //如果没有子权限，将子权限面板删除
    //       if(obj.children.length==0){
    //         delete obj.children;
    //       }
    //         data.push(obj);
    //     }
    //   }
    //   // console.log(data);
    //   return data;
    // }
  },

  
};
</script>