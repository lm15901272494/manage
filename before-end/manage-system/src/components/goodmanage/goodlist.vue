<template>
  <div>
    <el-button type="primary" plain @click="$router.push({'name':'goodadd'})">添加商品</el-button>
    <div class="top">
      <p class="title">用户分析</p>
      <h5>用户增长</h5>
    </div>
    <div class="bottom">
      <div class="bottom_top">
       <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="商品名">
          <el-input v-model="souname" placeholder="请输入商品名"></el-input>
        </el-form-item>
        <el-form-item label="单价">
          <el-input v-model="souprice" placeholder="请输入商品价格"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
        
      </div>
      <div>
        <template>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" label="编号" width="80"></el-table-column>
            <el-table-column prop="goodsname" label="名称" width="120"></el-table-column>
            <el-table-column prop="minisrc" label="缩略图" sortable width="100">
              <template slot-scope="scope">
                <img :src="`http://localhost:3000${scope.row.minisrc}`" alt style="width: 50px;height: 50px" />
              </template>
            </el-table-column>
            <el-table-column prop="price" label="单价" width="150"></el-table-column>
            <el-table-column prop="txt" label="简述标语" width="210" >
              <template slot-scope="scope">
                <div v-html="scope.row.txt"></div>
              </template>
            </el-table-column>
            <el-table-column prop="productxt" label="广告标语" >太好了</el-table-column>
            <el-table-column label="操作" class="btn">
               <template slot-scope="scope">
                 <el-switch
                    @change="updown(scope.row._id,scope.row.updown)"
                    v-model="scope.row.updown"
                    active-color="#ff4949"
                    inactive-color="#ccc">
                  </el-switch>
               </template>
            </el-table-column>
            <el-table-column label="操作" class="btn">
              <template slot-scope="scope">
              <a href="#" @click="edit(scope.row._id)">编辑</a>
              <br />
              <a href="#" @click="del(scope.row._id)">删除</a>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[3, 5, 10, 15]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    //获取总条数
    this.all();
    //分页
    this.break(this.currentPage, this.pageSize);
  },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 3,
      total: 0,
      souname:"",
      souprice:"",
    };
  },
  methods: {
    //分页封装函数
    break(currentPage, pageSize,search) {
      let obj={};
      if(search){
        obj=search;
      }
      this.axios
        .get("/goodBreak", {
          params: {
            page: currentPage,
            limit: pageSize,
            ...obj
          }
        })
        .then(res => {
          this.tableData = res.data.info;
        });
    },
    //封装 总条数函数
    all(search){
      let obj={};
      if(search){
        obj=search;
      }
      this.axios.get("/goodList",{params:obj}).then(res => {
      this.total = res.data.sum;
    });

    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.break(this.currentPage, this.pageSize);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.break(this.currentPage, this.pageSize);
    },
    // 点击上下架
    updown(id,updownval){
      this.axios.get("/updownval",{
        params:{
          id:id,
          updown:updownval
          }
      }).then(res=>{
        // console.log(res)
        if(res.data.err_code==200){
          if(updownval==true){
            alert("上架该商品")
          }else{
            alert("下架该商品")
          }
        }
      })
    },
    //编辑
    deit(){

    },
    // 删除商品
    del(id){
      this.axios.get("/goodDel",{params:{
         id:id
      }}).then(res=>{
        if(res.err_code==200){
          this.axios.get("/goodList").then(res => {
            this.total = res.data.sum;
          });
          //分页
          this.show(this.currentPage, this.pageSize);

        }
      })
    },
    //搜索
    onSubmit(){
      //获取总页数
      let obj={
        search:'1',
        goodsname:this.souname,
         price:this.souprice,   
      }
      this.all(obj)
      this.break(this.currentPage, this.pageSize,obj)
    }
    
  }
};
</script>
<style lang="" scoped>
.top {
  height: 70px;
  border: 1px solid #cccccc;
  background: #ffffff;
  margin: 5px 0;
}
.title {
  line-height: 30px;
  color: #aaa;
  font-size: 15px;
}
.title + h5 {
  margin-left: 10px;
  line-height: 30px;
}
.bottom {
  border: 1px solid #cccccc;
  margin-top: 5px;
}
.bottom_top {
  height: 50px;
  font: 12px/50px "微软雅黑";
  padding:5px 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #cccccc;
}
.block {
  float: right;
}
.el-table .cell a:nth-of-type(1) {
  color: red;
  text-decoration: none;
}
.el-table .cell a:nth-of-type(2) {
  color: green;
  text-decoration: none;
}
</style>