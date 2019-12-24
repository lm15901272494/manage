//在空的总的数据库中插入数据库名称，集合名称

const db=require("../db.js");
//1、创建  权限表的骨架
const usersSchema=db.Schema({
    username:{type:String},
    password:{type:String},
    registertime:{type:String},
    // logintime:{type:Number},
    // orderid:{type:db.Schema.Types.ObjectId},  //订单id
    // addressid:{type:db.Schema.Types.ObjectId}, 

})
//2、生成模型
const usersModel=db.model("users",usersSchema)

module.exports = usersModel;