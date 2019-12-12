<template>
  <div>
    <el-button type="primary" @click="$router.push({'name':'limitadd'})" icon="el-icon-edit">添加</el-button>
    <div class="block">
      <el-tree :data="data" :props="defaultProps" accordion >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{node.label}}</span>
          <span>
          <el-button type="text" size="mini" @click="() => remove(node, data)">删除</el-button>
          </span>
        </span>
      </el-tree>
    </div>
  </div>
</template>
<script>
import tree from "@/myjs/tree.js";
export default {
  methods: {
    remove(node, data) {
        let id=data.value
      // 通过id删除
      this.axios
        .get("/limitDel", {
          params: {
            id: id
          }
        })
        .then(res => {
          if (res.data.err_code) {
            this.axios.get("/limitGet").then(res => {
              this.tableData = res.data.data;
            });
            window.location.reload;
            alert("删除成功");
          }
        });
    }
  },
  mounted() {
    this.axios.get("/limitGet").then(res => {
      this.data = tree(res.data.data, 0);
    });
  },
  data() {
    return {
      data: [],
      defaultProps: {
        value: "value", //_id
        label: "label", //title
        children: "children" //children子级
      }
    };
  }
};
</script>