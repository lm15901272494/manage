<template>
  <div>
    <h1>我是角色列表</h1>
     <el-button type="primary" @click="$router.push({'name':'roleadd'})" icon="el-icon-edit" style="margin:10px">添加</el-button>
    <el-table
      :data="tableData"
      style="width: 80%;text-align:center;padding:0 20px;margin:0 auto;"
      max-height="400px"
    >
      <el-table-column fixed prop="_id" label="ID"></el-table-column>
      <el-table-column fixed prop="title" label="角色"></el-table-column>
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
      tableData: [
          //  { _id: 1, title: "管理员" },
          //  { _id: 2, title: "程序员" },
           
          ]
    };
  },
  mounted(){
    this.axios.get("/roleGet").then(res=>{
      // console.log(res);
      if(res.data.err_code==200){
        this.tableData=res.data.data;
      }
    })
  },
  methods:{
      deleteRow(index,row){
        let id=row[index]._id;
        this.axios.get("roleDel",{
          params:{id:id}
        }).then(res=>{
          if(res.data.err_code==200){
            row.splice(index,1)
            alert("删除成功")
          }
        })
      },
      changeRow(index,row){
        let id=row[index]._id;
        console.log(id)
        this.$router.push({"name":"rolechange",params:{id:id}})

      }
  }
};
</script>