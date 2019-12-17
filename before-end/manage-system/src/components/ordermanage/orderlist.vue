<template>
  <div>
    <el-button type="primary" plain @click="$router.push({'name':'goodadd'})">添加商品</el-button>
    <div class="main">
      <div class="search">
        <h5 class="search_title">搜索</h5>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="审批人">
            <el-input placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select placeholder="活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="content">
        <h5 class="content_title">商城商品设置</h5>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      formInline:"",
    }
  }
}
</script>
<style scoped>
.main {
  margin: 5px 0;
}
.search {
  height: 280px;
}
.search_title,
.content_title {
  height: 50px;
  line-height: 50px;
  background: #cccccc;
  color: red;
  padding:0 5px;
  box-sizing: border-box;
  margin: 10px 0;
}
.content {
  height: 732px;
}
</style>