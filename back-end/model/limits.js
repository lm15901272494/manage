//在空的总的数据库中插入数据库名称，集合名称

const db=require("../db.js");
//1、创建  权限表的骨架
const limitsSchema=db.Schema({
    title:{type:String},
    name:{type:String},
    pid:{type:String}
})
//2、生成模型
const limitsModel=db.model("limits",limitsSchema)

module.exports = limitsModel;