<template>
  <div>
    <el-button type="primary" plain @click="$router.push({'name':'goodadd'})">添加商品</el-button>
    <div class="top">
      <p class="title">用户分析</p>
      <h5>用户增长</h5>
    </div>
    <div class="bottom">
      <div class="bottom_top">虚拟商品设置</div>
      <div>
        <template>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" label="编号" width="180"></el-table-column>
            <el-table-column prop="goodsname" label="名称" width="180"></el-table-column>
            <el-table-column prop="minisrc" label="缩略图" sortable width="180">
              <template slot-scope="scope">
                <img :src="scope.row.minisrc" alt style="width: 50px;height: 50px" />
              </template>
            </el-table-column>
            <el-table-column prop="price" label="单价" width="180"></el-table-column>
            <el-table-column prop="txt" label="简述标语" width="180"></el-table-column>
            <el-table-column prop="productxt" label="广告标语">太好了</el-table-column>
            <el-table-column label="操作" class="btn">
              <a href="#" @click="up(this)">上架</a>
              <br />
              <a href="#" @click="down">下架</a>
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
    this.axios.get("/goodList").then(res => {
      this.total = res.data.sum;
    });
    //分页
    this.show(this.currentPage, this.pageSize);
  },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 3,
      total: 0
    };
  },
  methods: {
    show(currentPage, pageSize) {
      this.axios
        .get("/goodBreak", {
          params: {
            page: currentPage,
            limit: pageSize
          }
        })
        .then(res => {
          this.tableData = res.data.info;
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.show(this.currentPage, this.pageSize);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.show(this.currentPage, this.pageSize);
    },
    up(that) {
      console.log(that);
    },
    down() {}
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
  padding-left: 10px;
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