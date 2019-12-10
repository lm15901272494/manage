<template>
  <div>
    <h1>我是管理员列表</h1>
     <el-button type="primary" @click="$router.push({'name':'manageradd'})" icon="el-icon-edit" style="margin:10px">添加</el-button>
    <el-table
      :data="tableData"
      style="width: 80%;text-align:center;padding:0 20px;margin:0 auto;"
      max-height="400px"
    >
      <el-table-column fixed prop="_id" label="ID"></el-table-column>
      <el-table-column fixed prop="name" label="管理员名"></el-table-column>
       <el-table-column fixed prop="roleId.title" label="角色ID"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small"
          >移除</el-button>
          <el-button
            @click.native.prevent="changeRow(scope.$index, tableData)"
            type="text"
            size="small"
          >修改</el-button>
        </template>
      </el-table-column>
        
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  mounted(){
    this.axios.get("/managerGet").then(res=>{
      // console.log(res);
      if(res.data.err_code==200){
        this.tableData=res.data.data;
        console.log(this.tableData)
      }
    })
  },
  methods:{
      deleteRow(index,row){
       
      },
      changeRow(index,row){

      }
  }
};
</script>