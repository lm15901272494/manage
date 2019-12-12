<template>
  <div>
    <h1>商品分类添加</h1>
    <el-form>
      <el-form-item label="商品名称">
        <el-input v-model="title" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="商品图标">
<!-- action图片上传的而地址 -->
<!-- on-preview 点击文件列表中已经上传的文件，触发的函数 -->
<!-- on-remove  点击文件列表中删除 -->
        <el-upload
          class="upload-demo"
          action="http://127.0.0.1:3000/fileup"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="hanleSuccess"
          :file-list="fileList"
          list-type="picture"
          :limit="1"
          name="picture"
        >
          <el-button size="small" type="primary" plain>点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="所属分类">
        <div class="block">
          <el-cascader v-model="pid" :options="options" :props="{ checkStrictly: true }" clearable></el-cascader>
        </div>
      </el-form-item>
      <el-button type="primary" @click="add" plain>确定</el-button>
      <el-button type="success" @click="$router.push({'name':'goodsort'})" plain>返回</el-button>
    </el-form>
  </div>
</template>
<script>
import tree from "@/myjs/tree.js"
export default {
  data() {
    return {
      title: "",   //分类名称
      pid:"",  //父级分类id
      src:'',
      fileList: [],
      options: [
        {
          value: "0",
          label: "一级分类",
        }
      ]
    };
  },
  mounted(){
    this.axios.get("/sortGet").then(res=>{
      console.log(res)
      let data=tree(res.data.data,0);
      this.options=[...this.options,...data];
    })
  },
  methods: {
    add() {
      // 将数据传给后台，插入数据库
      this.axios.post("/sortAdd",{
        title:this.title,
        src:this.src,
        pid:this.pid.pop()
      }).then(res=>{
        console.log(res)
        if(res.data.err_code==200){
          alert("添加成功")
        }else{
          alert("添加失败")
        }
      })

    },
    handleRemove(file, fileList) {},
    handlePreview(file) {},
    hanleSuccess(response, file, fileList){
      // console.log(response,file,fileList)
      this.src=response.imgurl;
    }
  }
};
</script>