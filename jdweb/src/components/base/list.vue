<template>
  <div>
      <!-- 商品卡 -->
    <van-card
      :price="val.price"
      :title="val.goodsname"
      :thumb="`${base.url}${val.minisrc}`"
      v-for="(val) in sortlist"
      :key="val._id"
      @click="goinfo(val._id)"
    />
  </div>
</template>
<script>
import base from "@/myconfig/base.js"
export default {
  methods:{
    goinfo(id){
      this.$router.push({name:"info",params:{id:id}})
    }

  },
    data(){
      return{
        sortlist:[],
        base,
      }

    },
    mounted(){
        let id=this.$route.params.id;
        this.axios.get(`${base.url}/getgoodbyid`,{params:{
            sortid:id
        }}).then(res=>{
            this.sortlist=res.data.data;
        })
    }
    
}
</script>