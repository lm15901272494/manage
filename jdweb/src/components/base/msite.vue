<template>
  <div>
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000" :height="300" class="swiper">
      <van-swipe-item v-for="(image, index) in img" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- 九宫格 -->
      <van-grid :border="false" :column-num="3" :gutter="10">
        <van-grid-item v-for="(val) in grid" :key="val._id" @click="run(val._id)">
          <van-image :src="`${base.url}${val.src}`" />
          <p>{{val.title}}</p>
        </van-grid-item>
      </van-grid>
      <!-- 商品卡 -->
      <van-card
        num="2"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
      >
        <div slot="tags">
          <van-tag plain type="danger">标签</van-tag>
          <van-tag plain type="danger">标签</van-tag>
        </div>
        <div slot="footer">
          <van-button size="mini">按钮</van-button>
          <van-button size="mini">按钮</van-button>
        </div>
      </van-card>
    </van-pull-refresh>
  </div>
</template>
<script>
import base from "@/myconfig/base.js";
export default {
  
  data() {
    return {
      isLoading: false,
      grid:[],
      base,
      img: [
        {
          src:
            "https://img10.360buyimg.com/pop/s1180x940_jfs/t1/99331/14/7612/69761/5dfca045E9ac4eb92/c48607775e345385.jpg.webp"
        },
        {
          src:
            "https://img11.360buyimg.com/pop/s1180x940_jfs/t1/92388/3/7366/77316/5dfadd1dEdf8e7f3b/f9e82b69a3a80571.jpg.webp"
        },
        {
          src:
            "https://imgcps.jd.com/ling/100008348542/5omL5py66LSt5a6e5oOg/5aSH6LSn6LaF5YC8/p-5bd8253082acdd181d02fa47/606c6bff/590x470.jpg"
        },
        {
          src:
            "https://img13.360buyimg.com/pop/s1180x940_jfs/t1/89794/4/7076/70841/5df7638eE060a8256/d84cbef36453a542.jpg.webp"
        }
      ]
    };
  },
  mounted(){
    this.getsort();

  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        console.log(1);
        this.$toast("刷新成功");
        this.isLoading = false;
      }, 500);
    },
    getsort(){
      this.axios.get(`${base.url}/msitesort`).then(res=>{
        this.grid=res.data.data;
      })
    },
    run(id){
      console.log(id)
      this.$router.push({name:"list",params:{"id":id}})
      // this.$router.push({path:`/base/list?sortid=${id}`})

    }
  }
};
</script>
<style>
.swiper.van-swipe{
  height: 200px;
  overflow: hidden;
}
.swiper img {
  width: 100%;
  height: 66%;
}
.van-grid-item__content{
  padding: 0 10px;
  padding-top: 3px; 
}
/* .van-pull-refresh,.van-pull-refresh__track{
  height: 210px;
} */
</style>