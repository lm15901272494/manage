//在空的总的数据库中插入数据库名称，集合名称

const db=require("../db.js");
//1、创建  管理员表的骨架
const roleSchema=db.Schema({
    title:{type:String},
    limitId:{type:Array}
})
//2、生成模型
const roleModel=db.model("roles",roleSchema,"roles")

module.exports = roleModel;