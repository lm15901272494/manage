<template>
  <div class="base">
    <!-- 外部容器 -->
    <el-container class="base-page">
      <el-header class="base-head">
        <h2 style="text-align:center;">用户管理系统</h2>
        <i class="el-icon-switch-button ico" @click="back">
          <span>退出</span>
        </i>
      </el-header>
      <el-container style="height:100%;">
        <el-aside width="200px" class="base-left">
          <!-- 左侧导航 -->
          <el-col :span="12" style="width:200px;">
            <el-menu
              default-active="1"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#f7f7f7"
              text-color="#666"
              active-text-color="#000"
            >
              <!-- 统计 -->
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-s-data"></i>
                  <span>统计</span>
                </template>
                <el-menu-item-group>
                  <template slot="title" text-color="#333">
                    <el-menu-item index="1-1" @click="$router.push({'name':'useranalysis'})">用户分析</el-menu-item>
                    <el-menu-item index="1-2" @click="$router.push({'name':'orderanalysis'})">订单分析</el-menu-item>
                  </template>
                </el-menu-item-group>
              </el-submenu>
              <!-- 管理 -->
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-folder-opened"></i>
                  <span>管理</span>
                </template>
                <el-menu-item-group>
                  <template slot="title">
                    <el-menu-item index="2-1">用户管理</el-menu-item>
                    <el-menu-item index="2-2">卡券管理</el-menu-item>
                    <el-menu-item index="2-3">商品管理</el-menu-item>
                    <el-menu-item index="2-4">订单管理</el-menu-item>
                  </template>
                </el-menu-item-group>
              </el-submenu>
              <!-- 开发 -->
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-s-promotion"></i>
                  <span>开发</span>
                </template>
                <el-menu-item-group>
                  <template slot="title">
                    <el-menu-item index="3-1">基本配置</el-menu-item>
                    <el-menu-item index="3-2">接入权限</el-menu-item>
                  </template>
                </el-menu-item-group>
              </el-submenu>
              <!-- 设置 -->
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-s-tools"></i>
                  <span>设置</span>
                </template>
                <el-menu-item-group>
                  <template slot="title"></template>
                  <el-menu-item index="4-1">平台信息</el-menu-item>
                  <el-menu-item index="4-2">账户权限</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <!-- 权限管理 -->
              <el-submenu index="5">
                <template slot="title">
                  <i class="el-icon-folder-opened"></i>
                  <span>权限管理</span>
                </template>
                <el-menu-item-group>
                  <template slot="title">
                    <el-menu-item index="5-1"  @click="$router.push({'name':'limitList'})">权限列表</el-menu-item>
                    <!-- <el-menu-item index="5-2">卡券管理</el-menu-item> -->
                  </template>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-aside>
        <el-main class="base-right">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    back() {
      localStorage.removeItem("manage");
      this.$router.push({ name: "login" });
    }
  }
};
</script>
<style>
*{
  margin: 0;
  padding: 0;
}
html,
body,
#app,
.base {
  height: 100%;
}
.base-page {
  height: 100px;
  background: #dddddd;
}
.base-head {
  height: 70px;
  line-height: 70px;
  background: #eee;
  margin-bottom: 20px;
}
.el-container {
  height: 100%;
}
.base-left {
  background: #f7f7f7;
  height: 100%;
  margin-right: 20px;
}
.base-right {
  background: #f7f7f7;
  height: 100%;
}
.ico {
  position: absolute;
  right: 50px;
  top: 30px;
}
.ico span {
  font: bold 15px/15px "微软雅黑";
}
.el-submenu {
  border-bottom: 1px solid #ccc;
}
</style>