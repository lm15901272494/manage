const express = require("express");
const app = express();
//解决跨域
const cors = require("cors");
app.use(cors())
//载入post接收参数的模块
const bodyparser = require("body-parser");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: false
}))

//载入jsonwebtoken
let jwt = require("jsonwebtoken")


//----------------------------------------登陆页面-------------------------------
//载入login-model
const loginModel=require("./model/logins.js")
//登录-创建token
//通过前台传输的登录信息，搜索数据库中的数据，如果找到，则生成token，没有找到返回400
app.post("/login", (req, res) => {
    let {
        name,
        password
    } = req.body;
    loginModel.findOne({
        "name": name,
        "password": password
    }, (err, data) => {
        if (data) {
            let content = {
                id: data._id
            }; // 要生成token的主题信息--通过什么生成token
            let secretOrPrivateKey = "manage" // 这是加密的key（密钥） 
            let token = jwt.sign(content, secretOrPrivateKey, {
                expiresIn: 60*60*24 // 1小时过期
            });
            res.send({
                "err_code": 200,
                "id": data._id,
                "token": token,
            });
        } else {
            res.send({
                "err_code": 400
            })
        }
    })
})

//检测token
//验证token，除登陆页面外都需要验证token，当进入每一个页面时(全局路由拦截)，请求/checktoken，验证token，token有并且没有过期，则
//可进入页面，否则不得进入
app.get('/checktoken', (req, res) => {
    let token = req.headers.token; // 从body中获取token
    let secretOrPrivateKey = "manage"; // 这是加密的key（密钥） 
    jwt.verify(token, secretOrPrivateKey, function (err) {
        if (err) { //  时间失效的时候/ 伪造的token          
            res.send({
                'err_code': 400
            });
        } else {
            res.send({
                'err_code': 200
            });
        }
    })

})

//------------------------------------------权限------------------------------------------
const limitsModel=require("./model/limits.js")

app.get("/limitGet",(req,res)=>{
    limitsModel.find({},(err,data)=>{
        if(err){
            res.send({"err_code":400})
        }else{
            res.send({"err_code":200,data:data})
        }
    })
})

//插入权限
app.post("/limitAdd",(req,res)=>{
    let {title,name,pid} =req.body;
    //插入数据库
    let obj={"name":name,"title":title,"pid":pid};
    limitsModel.create(obj,(err,data)=>{
        if(err){
            res.send({"err_code":400})
        }else{
            res.send({"err_code":200})
        }
    })
})

//删除权限
app.get("/limitDel",(req,res)=>{
    //获取id值
    let id=req.query.id;
    limitsModel.deleteMany({"$or":[{"_id":id},{"pid":id}]},(err,data)=>{
        if(err){
            res.send({"err_code":400})
        }else{
            res.send({"err_code":200})
        }
    })
})





















app.listen(3000, function () {
    console.log(3000);
})