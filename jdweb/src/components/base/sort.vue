<template>
  <div class="sort">
    <!-- 左侧导航 -->
    <van-sidebar v-model="activeKey" class="left" >
      <van-sidebar-item v-for="(val) in sortone" :key="val._id" :title="val.title" @click="twosort(val._id)"/>
    </van-sidebar>
    <!-- 右侧导航 -->
    <div class="right">
      <div class="right_item">
        <div class="right_item_title">
          <p>常用分类</p>
          <p> > </p>
        </div>
        <van-grid :border="false" :column-num="3">
          <van-grid-item v-for="(val) in sorttwo" :key="val._id" @click="run(val._id)">                             
            <van-image :src="`${base.url}${val.src}`" />
            <p>{{val.title}}</p>
          </van-grid-item>
        </van-grid>
        <hr />
      </div>
    </div>
  </div>
</template>
<script>
import base from "@/myconfig/base.js"
export default {
  data() {
    return {
      activeKey: 0,
      sortone:[],
      sorttwo:[],
      base,
    };
  },
  mounted(){
    this.onesort();
  },
  methods:{
    run(id){
      console.log(id)
      this.$router.push({name:'list',params:{id:id}})
    },
    onesort(){
      this.axios.get(`${base.url}/msitesort`).then(res=>{
        this.sortone=res.data.data;
        this.twosort(this.sortone[0]._id)
      })
    },
    twosort(id){
      this.axios.get(`${base.url}/sorttwo`,{params:{
        id:id
      }}).then(res=>{
        this.sorttwo=res.data.data;
      })

    }
  }
};
</script>
<style>
.sort {
  display: flex;
}
.left {
  height: 100vh;
  width: 25%;
  overflow-y: scroll;
}
.right {
  width: 75%;
  height: 100vh;
  overflow-y: scroll;
}
.right_item_title{display:flex;}


</style>