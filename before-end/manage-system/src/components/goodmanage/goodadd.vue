<template>
  <div>
    <p class="title">用户分析</p>
    <h5>用户增长</h5>
    <hr />
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item>
        <template slot="title">
          <div class="item_title" style="margin-left:10px;">商品信息</div>
        </template>
        <div class="last_main">我是商品信息明细</div>
      </el-collapse-item>
    </el-collapse>
    <!-- 搜索商品 -->
    <div style="height:50px;border:1px solid #ccc;border-bottom:0;padding-left:10px;">
      <label for="goodname" style="font:12px/50px '微软雅黑'">商品名称：</label>
      <input
        v-model="input"
        placeholder="请输入商品名称"
        id="goodname"
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
        v-model="input"
        placeholder="请输入商品价格"
        id="goodname"
        type="text"
        style="padding:7px 60px;box-sizing:border-box;border-radius:5px;"
      />
      <span style="font:12px/50px '微软雅黑' ;color:#bbb;">如该商品的价格不因规格参数而变化，则在此输入统一的价格</span>
    </div>
    <!-- 上传缩略图 -->
    <div class="suo_tu">
      <span>缩略图</span>
      <div class="suo_tu_main">
        <el-upload action="#" list-type="picture-card" :auto-upload="false">
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{file}">
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)"
              >
                <i class="el-icon-download"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
        <div class="right">
          限上传一张图片
          <br />图片最佳尺寸为180*180像素
        </div>
      </div>
    </div>
    <!-- 上传轮播图 -->
    <div class="suo_tu">
      <span>轮播顶图</span>
      <div class="suo_tu_main">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
        <div class="right">
          可上传多张图片
          <br />图片最佳尺寸为640*320像素
        </div>
      </div>
    </div>

    <!-- 富文本编辑器 -->
    <div class="fuben">
      <div>商品详情</div>
      <quill-editor v-model="content"></quill-editor>
    </div>
    <!-- 是否进入方案库 -->
    <div class="fanganku">
      <div class="fanganku_title">是否申请进入方案库</div>
      <form class="fanganku_main">
        <input type="checkbox" id="no" />
        <label for="no">否</label>
        <br />
        <input type="checkbox" id="yes" />
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
        <input type="checkbox" id="no" />
        <label for="no">下架</label>
        <br />
        <input type="checkbox" id="yes" />
        <label for="yes">上架</label>
      </form>
    </div>
    <!-- <div class="show_content" v-html="showcontent"></div> -->
    <el-button type="danger">预览</el-button>
    <el-button @click="add" type="danger">提交</el-button>
    <el-button type="info">取消</el-button>
    <el-button type="info">返回上一页</el-button>
  </div>
</template>
<script>
import size from "@/components/goodmanage/size.vue";
export default {
  data() {
    return {
      content: "",
      showcontent: "",
      activeNames: "",
      data: "",
      input: "",
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false
    };
  },
  components: {
    size
  },
  methods: {
    add() {
      this.showcontent = this.content;
    },
    handleChange() {},
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    }
  }
};
</script>
<style >
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