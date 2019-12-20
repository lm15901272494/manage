//在空的总的数据库中插入数据库名称，集合名称

const db=require("../db.js");
//1、创建  权限表的骨架
const ordersSchema=db.Schema({
    uerid:{type:String},     //用户ID
    count:{type:String},         //订单编号
    name:{type:String},    //收件人
    allprice:{type:Number},   // 商品总价
    money:{type:Number},      //实付金额
    createtime:{type:Number},    //创建日期
    paytime:{type:Number},      //支付日期
    orderflag:{type:String} ,    //状态
})
//2、生成模型
const ordersModel=db.model("orders",ordersSchema)

module.exports = ordersModel;