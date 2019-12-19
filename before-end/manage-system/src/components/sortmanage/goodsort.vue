<template>
  <div>
    <h1 style="margin:10px;">分类</h1>
    <el-button type="primary" @click="$router.push({'name':'sortadd'})" plain>添加分类</el-button>
    <!-- 树形结构 -->
    <el-tree
      :data="info"
      :props="defaultProps"
      @node-click="handleNodeClick"
      :expand-on-click-node="false"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <img :src="`http://127.0.0.1:3000/${data.src}`" alt class="sort_img" />
        <span>{{ node.label }}</span>
        <span>
          <el-button type="text" size="mini" @click="() => change(node, data)">修改</el-button>
          <el-button type="text" size="mini" @click="() => remove(node, data)">删除</el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>
<script>
import tree from "@/myjs/tree.js";
export default {
  data() {
    return {
      info: [],
      defaultProps: {
        children: "children",
        label: "label",
        value: "value",
        src: "src"
      }
    };
  },
  mounted() {
    this.axios.get("/sortGet").then(res => {
      // console.log(res.data.data);
      if (res.data.err_code == 200) {
        this.info = tree(res.data.data, 0);
        // console.log(this.info);
      }
    });
  },
  methods: {
    handleNodeClick(data) {
      // console.log(data);
    }
  }
};
</script>
<style>
.sort_img {
  width: 30px;
  height: 30px;
}

.el-tree-node__content {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 50px;
    cursor: pointer;
}
</style>