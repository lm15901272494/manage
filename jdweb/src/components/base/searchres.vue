<template>
  <div>
    
      <!-- 商品卡 -->
    <van-card
      :price="val.price"
      :title="val.goodsname"
      :thumb="`${base.url}${val.minisrc}`"
      v-for="(val) in searchres"
      :key="val._id"
    />
    <router-link to="/search" tag="div" v-if="searchres.length==0" class="alert">
      未搜索到商品，请重新搜索
    </router-link>
  </div>
</template>
<script>
import base from "@/myconfig/base.js"
export default {
  data(){
    return{
      searchres:[],
      base,
    }
  },
    mounted(){
        let goodsname=this.$route.params.goodsname;
        this.axios.get(`${base.url}/search`,{params:{
            goodsname:goodsname
        }}).then(res=>{
            // console.log(res)
            if(res.data.err_code==200){
            this.searchres=res.data.data;
            }else{

            }
        })
    },
    
    
}
</script>
<style>
.alert{
  width: 80%;
  height: 60px;
  background: lightsalmon;
  margin: 50px auto;
  border-radius: 5px;
  text-align: center;
  line-height: 60px;
}
</style>