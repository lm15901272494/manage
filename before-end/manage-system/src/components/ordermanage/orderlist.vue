<template>
  <div>
    <el-button type="primary" plain @click="$router.push({'name':'goodadd'})">添加商品</el-button>
    <div class="main">
      <div class="search">
        <h5 class="search_title">搜索</h5>
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="订单号">
            <el-input placeholder="订单号" v-model="orderval"></el-input>
          </el-form-item>
          <el-form-item label="日期搜索">
            <div class="block">
              <el-date-picker
                v-model="dateval"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="content">
        <h5 class="content_title">
          商城订单
          <download-excel
            class="export-excel-wrapper"
            :data="tableData"
            name="newfile.xls"
          >
            <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
          <el-button type="danger" icon="el-icon-message">导出</el-button>
           </download-excel>
        </h5>
        <!-- 订单 -->
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="订单编号" width="100" prop="count"></el-table-column>
          <el-table-column label="收件人" width="100" prop="name"></el-table-column>
          <el-table-column label="合计价格" width="100" prop="allprice"></el-table-column>
          <el-table-column label="实付金额" width="100" prop="money"></el-table-column>
          <el-table-column label="建立时间" width="100" prop="createtime">
            <template slot-scope="scope">
              <p>{{new Date(scope.row.createtime).toLocaleString()}}</p>
            </template>
          </el-table-column>
          <el-table-column label="付款时间" width="100" prop="paytime">
            <template slot-scope="scope">
              <p>{{new Date(scope.row.paytime).toLocaleString()}}</p>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="100" prop="orderflag"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="look(scope.$index, scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[5,10, 20, 30, 50]"
            :page-size="100"
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
  data() {
    return {
      orderval: "", //订单搜索
      dateval: "", //日期搜索
      currentPage1: 5, //当前页数
      limit: 5, //每页多少条
      page: 1, //当前第几页
      total: 0, //数据总条数
      tableData: [
        {
          count: 1, //订单编号
          name: "小僵尸", //收件人
          allprice: "123", // 商品总价
          money: "100", //实付金额
          createtime: "2019-12-19 14:00", //创建日期
          paytime: "2019-12-19 14:30", //支付日期
          orderflag: "已付款" //状态
        }
      ]
    };
  },
  mounted() {
    //获取总条数
    this.orderpage();
    //获取分页数据
    this.orderbreak();
  },
  methods: {
    //获取总条数
    orderpage() {
      //将查询时间转换为[毫秒数，毫秒数]
      if (this.dateval != "") {
        var times = [];
        times.push(this.dateval[0].getTime());
        times.push(this.dateval[1].getTime());
      } else {
        times = "";
      }
      this.axios
        .get("/orderpage", {
          params: {
            count: this.orderval,
            date: times
          }
        })
        .then(res => {
          this.total = res.data.sum;
        });
    },
    //获得分页信息
    orderbreak() {
      if (this.dateval != "") {
        var times = [];
        times.push(this.dateval[0].getTime());
        times.push(this.dateval[1].getTime());
      } else {
        times = "";
      }
      this.axios
        .get("/orderbreak", {
          params: {
            page: this.page,
            limit: this.limit,
            date: times,
            count: this.orderval
          }
        })
        .then(res => {
          this.tableData = res.data;
        });
    },

    search() {
      this.orderpage();
      this.orderbreak();
    },
    look() {},
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.limit = val;
      this.orderbreak();
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.orderbreak();
    }
  }
};
</script>
<style scoped>
.main {
  margin: 5px 0;
}
.search {
  height: 100px;
}
.search_title,
.content_title {
  height: 50px;
  line-height: 50px;
  background: #cccccc;
  color: red;
  padding: 0 5px;
  box-sizing: border-box;
  margin: 10px 0;
}
.content {
  height: 732px;
}
.el-button--danger {
  float: right;
  margin: 5px;
}
</style>