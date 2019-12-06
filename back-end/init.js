//载入login-model
const loginModel=require("./model/login.js")
//3.查找
loginModel.find({},(err,data)=>{
    //4.如果没有则创建
    loginModel.create({"name":"li","password":"123"},(err,data)=>{
        if(err){
            console.log(err)
        }else{
            console.log(data)
        }
    })
})