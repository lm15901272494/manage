<template>
  <div class="lead">
      <h1 class="h1">卖萌货</h1> 
     <van-swipe @change="onChange" :autoplay="2500">
      <van-swipe-item>
          <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1155912013,807314385&fm=26&gp=0.jpg" alt="">
      </van-swipe-item>
      <van-swipe-item>
          <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=145501204,492954313&fm=26&gp=0.jpg" alt="">
          </van-swipe-item>
      <van-swipe-item>
          <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3449121859,276979453&fm=26&gp=0.jpg" alt="">
      </van-swipe-item>
      
      <van-swipe-item>
          <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4061862367,1251691765&fm=26&gp=0.jpg" alt="">
      </van-swipe-item>
    </van-swipe> 
  </div>
</template>
<script>
export default {
  methods: {
    onChange(index) {
    //   alert("当前 Swipe 索引：" + index);
    }
  }
};
</script>
<style>
html,body,#app,.lead{
    height: 100%;
}
.lead img{
    width: 100%;
    height: 110%;
    margin-top: -15px;
}
.h1{
    font: bold 35px/60px "KaiTi";
    text-align: center;
}
</style>