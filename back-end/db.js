//引入数据库
const db=require("mongoose");
//连接数据库
db.connect("mongodb://localhost:27017/manage",{ useNewUrlParser: true,useUnifiedTopology: true },function(err){
    if(!err){
        console.log("连接成功")
    }
})

//导出db
module.exports=db;
