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
//查找权限
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
    //查询出所有的子权限,并删除
    treedel(id);
    // 通过id删除本条数据
    limitsModel.deleteMany({_id:id},(err,data)=>{
       res.send({"err_code":200})
    })
    
  
    //可以通过关系删除，并且/或者
    //或者关系---查询条件{"$or":[{条件一}，{条件二}]}
    //---此处的删除只能通过条件删除两级
    // limitsModel.deleteMany({"$or":[{"_id":_id},{"pid":id}]},(err,data)=>{
    //     if(err){
    //         res.send({"err_code":400})
    //     }else{
    //         res.send({"err_code":200})
    //     }
    // })
})

function treedel(id,res){
    limitsModel.find({"pid":id},(err,data)=>{
        if(data.length>0){
            for(let i in data){
                treedel(data[i]._id)
                limitsModel.deleteMany({"_id":data[i]._id},(err,data)=>{})
                    
            }
        }
    })
   
}

//-----------------------角色接口-----------------------------------
const roleModel=require("./model/roles")
//添加角色  post--角色名称，权限数组
app.post("/roleAdd",(req,res)=>{
    let {title,limitId}=req.body;
    roleModel.create({"title":title,"limitId":limitId},(err,data)=>{
        if(err){
            res.send({"err_code":400})
        }else{
            console.log(data);
            res.send({"err_code":200})
        }
    })

})


//获取所有角色  get
app.get("/roleGet",(req,res)=>{
    roleModel.find({},(err,data)=>{
        if(err){
            res.send({"err_code":400})
        }else{
            res.send({"err_code":200,data:data})
        }
    })
})

//删除接口
app.get("/roleDel",(req,res)=>{
    roleModel.deleteOne({_id:req.query.id},(err,data)=>{
        if(err){
            res.send({"err_code":400})
        }else{
            res.send({"err_code":200})
        }
    })
})

//修改一  根据角色id  获取角色其信息
app.get("/roleId",(req,res)=>{
    roleModel.findOne({_id:req.query.id},(err,data)=>{
        if(err){
            res.send({"err_code":400})
        }else{
            res.send({"err_code":200,data:data})
        }
    })
})

//修改二
app.post("/roleChange",(req,res)=>{
    let {id,title,limitId}=req.body;
    roleModel.updateOne({"_id":id,"title":title,"limitId":limitId},(err,data)=>{
        if(err){
            res.send({"err_code":400})
        }else{
            res.send({"err_code":200})
        }
    })
})

//-----------------管理员----------------------------------------
// const loginModel=require("./model/logins")
//添加后台管理员   ---post---管理员名---角色id
app.post("/managerAdd",(req,res)=>{
    let {admin,password,roleId}=req.body;
    loginModel.create({name:admin,password:password,roleId:roleId},(err,data)=>{
        if(err){
            res.send({"err_code":400})
        }else{
            res.send({"err_code":200})
        }
    })
})

//获取所有管理员 ---get
app.get("/managerGet",(req,res)=>{
    loginModel.find().populate("roleId").exec((err,data)=>{
        if(err){
            res.send({"err_code":400})
        }else{
            console.log(data)
            res.send({"err_code":200,data:data})
        }

    })
    
    
    
})



















app.listen(3000, function () {
    console.log(3000);
})