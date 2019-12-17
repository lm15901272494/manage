<template>
  <div>
    <p class="title">用户分析</p>
    <h5>用户增长</h5>
    <hr />
    <div class="pot">本页根据昨日数据来计算，而非事实数据</div>
    <div class="last">
      <div class="last_title">
        昨日核心指标
        <i class="header-icon el-icon-info last_con"></i>
      </div>
      <div class="last_main"></div>
    </div>
    <div>
      <el-collapse v-model="activeNames" @change="handleChange" class="item">
        <el-collapse-item>
          <template slot="title">
            <div class="item_title">7日核心指标</div>
          </template>
          <div class="last_main">111111</div>
        </el-collapse-item>
        <el-collapse-item>
          <template slot="title">
            <div class="item_title">15日核心指标</div>
          </template>
          <div class="last_main">
              <h1>123456</h1>
          </div>
        </el-collapse-item>
        <el-collapse-item>
          <template slot="title">
            <div class="item_title">30日核心指标</div>
          </template>
          <div class="last_main">33333</div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeNames:"",


    };
  },
  mounted() {
   let count=0;
    this.axios.get("/vipGet").then(res => {
      if (res.data.err_code == 200) {
        this.data = res.data.data;
      }
        let d = new Date().getDate();
        for (var i  in this.data){
          var dd=this.data[i].date.split("/").pop();
          count+=parseInt(this.data[i].newvip);
          var index=i;
        }
         if(dd<=d){
              let str=`
              <dl>
                <dt>新注册用户</dt>
                <dd>${this.data[index].newvip}</dd>
                </dl>
                <dl>
                <dt>昨日访问</dt>
                <dd>${this.data[index].newvisit}</dd>
                </dl>
                <dl>
                <dt>累计注册</dt>
                <dd>${count}</dd>
                </dl>
              `
            let last=document.querySelector(".last_main");
            last.innerHTML=str;
          }
    });
  },
  methods: {
    handleChange() {}
  }
};
</script>
<style>
.title {
  line-height: 30px;
  color: #aaa;
  font-size: 15px;
}
.title + h5 {
  margin-left: 10px;
  line-height: 30px;
}
hr {
  border: 0.5px solid #cccccc;
}
.pot {
  height: 60px;
  line-height: 60px;
  color: #aaaaaa;
  font-size: 12px;
}
.last {
  height: 200px;
  border: 0.5px solid #ccc;
}
.last_title {
  height: 50px;
  background: #ccc;
  line-height: 50px;
  padding-left: 5px;
  box-sizing: border-box;
  font-size: 14px;
  color: #555;
  overflow: hidden;
}
.last_main {
  display: flex;
  justify-content: space-around;
}
.last_main dl dt {
  font: 12px/80px "微软雅黑";
  color: #555;
}
.last_main dl dd {
  font: 25px/30px "微软雅黑";
  color: #000;
}
.last_con {
  float: right;
  margin: 20px;
}
.el-collapse-item__header {
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  height: 48px;
  line-height: 48px;
  background-color: #cccccc;
  color: #303133;
  cursor: pointer;
  border-bottom: 1px solid #ebeef5;
  font-size: 13px;
  font-weight: 500;
  transition: border-bottom-color 0.3s;
  outline: 0;
}
.el-collapse {
  border-top: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
  margin: 20px 0;
}
</style>