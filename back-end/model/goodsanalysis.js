//在空的总的数据库中插入数据库名称，集合名称

const db=require("../db.js");
//1、创建  商品表的骨架
const productsSchema=db.Schema({
   title:{type:String},
   sum:{type:String}
})
//2、生成模型
const productsModel=db.model("products",productsSchema)

module.exports = productsModel;