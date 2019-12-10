//在空的总的数据库中插入数据库名称，集合名称

const db=require("../db.js");
//1、创建  管理员表的骨架
const loginSchema=db.Schema({
    name:{type:String},
    password:{type:String},
    roleId:{type:String,ref:"roles"}
})
//2、生成模型
const loginModel=db.model("logins",loginSchema)

module.exports = loginModel;