//载入login-model
const loginModel=require("./model/logins.js")
//3.查找
loginModel.find({},(err,data)=>{
    //4.如果没有则创建
    loginModel.create({"name":"limin","password":"123","roleId":""},(err,data)=>{
        if(err){
            console.log(err)
        }else{
            console.log(data)
        }
    })
})