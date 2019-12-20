<template>
  <div>
    <!-- 搜索详情 -->
    
    <form action="/">
      <van-search
        v-model="souval"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <div>
        <h2>历史记录</h2>

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      souval: ""
    };
  },
  methods: {
    onSearch() {},
    onCancel() {},
  }
};
</script>