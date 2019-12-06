<template>
  <div>
    <el-button type="primary" @click="$router.push({'name':'limitAdd'})" icon="el-icon-edit">添加</el-button>
    <el-table :data="tableData" style="width: 100%;text-align:center;padding:0 20px;" max-height="400px">
      <el-table-column fixed prop="_id" label="ID" ></el-table-column>
      <el-table-column fixed prop="title" label="标题"></el-table-column>
      <el-table-column fixed prop="name" label="路由" ></el-table-column>
      <el-table-column fixed prop="pid" label="父级权限ID">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small"
          >移除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  methods: {
    deleteRow(index, rows) {
      let id=rows[index]._id;
      console.log(id)
      this.axios.get("/limitDel",{params:{
        id:id
      }}).then(res=>{
        console.log(res);
      })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
      rows.splice(index, 1);
      window.location.reload(); //刷新当前页面.
    }
  },
  mounted() {
    this.axios.get("/limitGet").then(res => {
      this.tableData = res.data.data;
    });
  },
  data() {
    return {
      tableData: []
    };
  }
};
</script>