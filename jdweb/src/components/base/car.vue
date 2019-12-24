<template>
  <div>
    <!-- 商品卡 -->
    <van-card
      :num="val.num"
      :price="val.price"
      :desc="val.txt"
      :title="val.goodsname"
      :thumb="`${base.url}${val.minisrc}`"
      v-for="(val) in info" :key="val._id"
    >
      <div slot="footer">
        <van-button size="mini">按钮+</van-button>
        <van-button size="mini">按钮-</van-button>
      </div>
    </van-card>
    <!-- 底部导航 -->
    <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checked">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>
<script>
import base from "@/myconfig/base.js"
export default {
  data(){
    return{
      checked:'',
      info:[],
      base,

    }
  },
  mounted(){
    this.info=this.$store.state.car
  },
  methods:{
    onSubmit(){
      this.$router.push({name:"order"})
    }

  }
}
</script>
<style>

</style>