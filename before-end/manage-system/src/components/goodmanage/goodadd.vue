<template>
  <div>
    <p class="title">用户分析</p>
    <h5>用户增长</h5>
    <hr />
    <el-collapse>
      <el-collapse-item>
        <template slot="title">
          <div class="item_title" style="margin-left:10px;">商品信息</div>
        </template>
        <div class="last_main">我是商品信息明细</div>
      </el-collapse-item>
    </el-collapse>
    <!-- 添加商品 -->
    <div style="height:50px;border:1px solid #ccc;border-bottom:0;padding-left:10px;">
      <label for="goodsname" style="font:12px/50px '微软雅黑'">商品名称：</label>
      <input
        v-model="goodsname"
        placeholder="请输入商品名称"
        id="goodsname"
        type="text"
        style="padding:7px 60px;box-sizing:border-box;border-radius:5px;"
      />
    </div>
    <!-- 规格 -->
    <size></size>
    <!-- 添加商品统一价格 -->
    <div style="height:50px;border:1px solid #ccc;border-bottom:0;padding-left:10px;">
      <label for="goodname" style="font:12px/50px '微软雅黑'">商品价格：</label>
      <input
        v-model="price"
        placeholder="请输入商品价格"
        id="price"
        type="text"
        style="padding:7px 60px;box-sizing:border-box;border-radius:5px;"
      />
      <span style="font:12px/50px '微软雅黑' ;color:#bbb;">如该商品的价格不因规格参数而变化，则在此输入统一的价格</span>
    </div>
    <!-- 上传缩略图 -->
    <div class="suo_tu">
      <span>缩略图</span>
      <div class="suo_tu_main">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:3000/minifileup"
          name="picture"
          :show-file-list="false"
          :on-success="MiniSuccess"
        >
          <img v-if="minisrc" :src="`http://localhost:3000/${minisrc}`" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-dialog>
          <img width="100%" alt />
        </el-dialog>
        <div class="right">
          限上传一张图片
          <br />图片最佳尺寸为180*180像素
        </div>
      </div>
    </div>
    <!-- 上传轮播图 -->
    <div class="swiper">
      <span>轮播顶图</span>
      <div class="suo_tu_main">
        <el-upload
          class="upload-demo"
          action="http://localhost:3000/swiperfileup"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="Swipersuccess"
          :file-list="fileList"
          name="picture"
          list-type="picture"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        <div class="right">
          可上传多张图片
          <br />图片最佳尺寸为640*320像素
        </div>
      </div>
    </div>

    <!-- 富文本编辑器 -->
    <div class="fuben">
      <div>商品详情</div>
      <quill-editor v-model="txt"></quill-editor>
    </div>
    <!-- 是否进入方案库 -->
    <div class="fanganku">
      <div class="fanganku_title">是否申请进入方案库</div>
      <form class="fanganku_main">
        <input type="radio" id="no"  v-model="flag" value="false"/>
        <label for="no">否</label>
        <br />
        <input type="radio" id="yes"  v-model="flag" value="true"/>
        <label for="yes">是</label>
        <select name id>
          <option value="选择建议上架分类">选择建议上架分类</option>
          <option value="药食同源">药食同源</option>
          <option value="经络调理">经络调理</option>
        </select>
      </form>
    </div>
    <!-- 上下架 -->
    <div class="shangxiajia">
      <div class="shangxiajia_title">是否申请上架</div>
      <form class="shangxiajia_main">
        <input type="radio" id="no" v-model="sign" value="false"/>
        <label for="no">下架</label>
        <br />
        <input type="radio" id="yes" v-model="sign" value="true"/>
        <label for="yes">上架</label>
      </form>
    </div>
    <!-- 添加父级结构 -->
    <el-form>
      <el-form-item label="所属分类">
        <div class="block">
          <el-cascader v-model="pid" :options="options" :props="{ checkStrictly: true }" clearable></el-cascader>
        </div>
      </el-form-item>
    </el-form>
    <!-- 按钮 -->
    <el-button type="danger">预览</el-button>
    <el-button @click="add" type="danger">提交</el-button>
    <el-button type="info" @click="cancel">取消</el-button>
    <el-button type="info" @click="$router.push({'name':'goodmanage'})">返回上一页</el-button>
  </div>
</template>
<script>
import size from "@/components/goodmanage/size.vue";
import tree from "@/myjs/tree.js";
export default {
  data() {
    return {
      goodsname: "", //商品名称
      price: "", //单价
      txt: "", //富文本编辑器
      minisrc: "", //缩略图
      flag:true,
      sign:true,
      size: this.$store.state.size,
      fileList: [],
      pid: "", //父级分类id
      options: []
    };
  },
  mounted() {
    this.axios.get("/sortGet").then(res => {
      let data = tree(res.data.data, 0);
      this.options = [...this.options, ...data];
    });
  },
  components: {
    size
  },
  methods: {
    add() {
      let obj = {
        goodsname: this.goodsname,
        price: this.price,
        txt: this.txt,
        size: this.size,
        minisrc: this.minisrc,
        swipersrc: this.fileList,
        enter: this.flag,
        updown: this.sign,
        pid:this.pid.pop()
      };
      this.axios.post("/goodadd", obj).then(res => {
        console.log(res);
        if(res.data.err_code==200){
          alert("添加成功")
         this.$store.state.size=[{
                  name: "",
                  item: [{itemname: "",price: ""},
                    {itemname: "",price: ""}]
                 }]
          this.$router.push({'name':'goodmanage'})
        }
      });
    },
    cancel(){
      this.goodsname="";
      this.price='';
      this.txt="";
      this.$store.state.size=[{
                  name: "",
                  item: [{itemname: "",price: ""},
                    {itemname: "",price: ""}]
                 }]
      this.minisrc='';
      this.fileList=[];
      this.flag=false;
      this.sign=false;
      this.pid="";

      console.log(this.$store.state.size)

    },

    MiniSuccess(res) {
      this.minisrc = res.minisrc;
    },
    Swipersuccess(res) {
      this.fileList.push({
        name: res.swiperurl,
        url: `http://localhost:3000${res.swiperurl}`
      });
      // console.log(this.fileList);
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePreview() {}
  }
};
</script>
<style >
/* 缩略图 */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}

.show_content {
  width: 100%;
  height: 300px;
  border: 1px solid #333;
}
.title {
  line-height: 30px;
  color: #aaa;
  font-size: 15px;
}
.title + h5 {
  margin-left: 10px;
  line-height: 30px;
}
hr {
  border: 0.5px solid #cccccc;
}
.swiper {
  color: #444;
  font: 13px/30px "微软雅黑";
  border: 1px solid #cccccc;
  padding: 0 10px;
  box-sizing: border-box;
  margin: 3px 0;
  min-height: 150px;
}

.suo_tu,
.fanganku,
.shangxiajia {
  height: 200px;
  color: #444;
  font: 13px/30px "微软雅黑";
  border: 1px solid #cccccc;
  padding: 0 10px;
  box-sizing: border-box;
  margin: 3px 0;
}
.suo_tu_main {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.fuben {
  padding: 0 10px 10px;
  box-sizing: border-box;
  border: 1px solid #cccccc;
}

.fuben > div:nth-child(1) {
  font: 12px/40px "微软雅黑";
}
.fanganku_title,
.shangxiajia_title {
  font: 12px/50px "微软雅黑";
  border-bottom: 1px solid #cccccc;
  margin-bottom: 20px;
}
.fanganku_main,
.shangxiajia_main {
  padding: 0 50px;
  box-sizing: border-box;
}
select {
  width: 200px;
  height: 30px;
  margin-left: 50px;
  border-radius: 5px;
  outline: 0;
}
</style>