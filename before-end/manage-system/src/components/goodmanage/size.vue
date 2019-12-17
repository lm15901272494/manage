<template>
  <div>
    <div class="size-title">
       规格参数
    </div>
    <div class="size" v-for="(val,index) in size" :key="index">
      <!-- 增加规格 -->
      <div class="left">
        <button @click="delsize(index)">X</button>
        <input type="text" placeholder="规格名称" v-model="val.name" />
      </div>
      <!-- 增加规格参数 -->
      <div class="right">
        <div v-for="(v,i) in val.item" :key="i">
          <button @click="delparams(index,i)">X</button>
          <input type="text" placeholder="规格参数" v-model="v.itemname" />
          <input type="text" placeholder="价格" v-model="v.price" />
        </div>
        <el-button type @click="addparams(index)">增加规格参数</el-button>
      </div>
    </div>
    <el-button type="primary" plain  @click="addsize">增加规格</el-button>
  </div>
</template>
<script>
export default {
  methods: { 
    addsize(){
      let obj={
          name: "",
          item: [
            { itemname: "", price:0},
            { itemname: "", price: 0 }
          ]
      }
      this.size.push(obj);
    },
    delsize(index){
      this.size.splice(index,1)
    },

    addparams(index) {
      this.size[index].item.push({itemname:"",price:""});
    } ,
    delparams(index,i){
      this.size[index].item.splice(i,1)
    }
    },

  data() {
    return {
      size: [
        {
          name: "华为手机",
          item: [
            { itemname: "星空蓝", price: 6666 },
            { itemname: "土豪金", price: 4999 }
          ]
        },
      ]
    };
  }
};
</script>
<style scoped>
.size-title{
  border: 1px solid #aaaaaa;
  border-bottom: 1px solid #eeeeee;
  font:12px/50px "微软雅黑";
  padding-left: 10px;
}
.size {
  display: flex;
  /* justify-content: space-around; */
  border: 1px solid #aaaaaa;
  border-top: 0;
  padding: 10px;
  box-sizing: border-box;
  align-items: center;
}
.left {
  flex: 1.5;
}
.right {
  flex: 3;
  border-left: 1px solid #cccccc;
  padding-left: 10px;
  box-sizing: border-box;
}
.size input[type="text"] {
  padding: 5px;
}
.size button {
  padding: 4px 8px;
  margin: 3px;
}
</style>