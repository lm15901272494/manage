//在空的总的数据库中插入数据库名称，集合名称

const db=require("../db.js");
//1、创建  商品分类表的骨架
const sortSchema=db.Schema({
    title:{type:String},   //商品分类名称
    src:{type:String},    //商品分类图标
    pid:{type:String},    //商品分类父级id
    
})
//2、生成模型
const sortModel=db.model("sorts",sortSchema)

module.exports = sortModel;