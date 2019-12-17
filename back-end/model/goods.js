//在空的总的数据库中插入数据库名称，集合名称

const db=require("../db.js");
//1、创建  商品表的骨架
const goodsSchema=db.Schema({
    goodsname:{type:String},
    size:{type:Object},
    price:{type:String},
    minisrc:{type:String},
    swipersrc:{type:Array},
    txt:{type:String},
    enter:{type:Boolean},
    updown:{type:Boolean}

})
//2、生成模型
const goodsModel=db.model("goods",goodsSchema)

module.exports = goodsModel;