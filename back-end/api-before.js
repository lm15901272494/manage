const express=require("express");
const app=express();
//跨域
const cors=require("cors");
app.use(cors())
//post请求
const bodyparser=require("body-parser");
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
//载入jsonwebtoken
let jwt = require("jsonwebtoken")
//静态资源发布
app.use(express.static("public"))
app.listen(3333,()=>{
    console.log(3333);
})
//分类表
const sortModel=require("./model/sorts")

//商品表
const goodsModel=require("./model/goods")
const usersModel=require("./model/users")
//首屏分类接口
app.get("/msitesort",(req,res)=>{
    sortModel.find({pid:0},(err,data)=>{
        if(err){
            res.send({"err_code":400})
        }else{
            res.send({"err_code":200,data:data})
        }
    })
})

// //2、分类页面接口  ---一级和二级
app.get("/sortall",(req,res)=>{
    //查询一级
    sortModel.find({"$or":[{"_id":pid},{"pid":0}]},(err,data)=>{
        if(err){
            res.send({"err_code":400})
        }else{
            res.send({"err_code":200,data:data})
        }
    })
})

//根据一级分类id 查询二级分类信息
app.get("/sorttwo",(req,res)=>{
    sortModel.find({pid:req.query.id},(err,data)=>{
        if(err){
            res.send({"err_code":400})
        }else{
            res.send({"err_code":200,data:data})
        }
        })
})

//根据分类(一级，二级，三级等)ID查询商品--递归函数
app.get("/getgoodbyid",(req,res)=>{
    let sortid=req.query.sortid;
    //查找出所有商品
    sortModel.find({},(err,data)=>{
        let arr=[];
        function getid(id){
            for(let v of data){
                // 当传过来的ID===数组中每一项的pid相等时，父子关系成立
                if(v.pid==id){
                    // 并经这一项的ID添加到数组中
                    arr.push(v._id);
                    //并通过这一项的_id继续查找数组中的数据，重新查找父子关系，直至将最后一级子集查找到
                    getid(v._id)
                }
            }
            arr.push(id)
            return arr;
        }
        let idarr=getid(sortid);
        goodsModel.find({pid:{$in:idarr},updown:true},{goodsname:1,price:1,minisrc:1},(err,data)=>{
            if(err){
                res.send({"err_code":400})
            }else{
                // console.log(data)
                res.send({"err_code":200,data:data})
            }
        })
    })
    
})

//根据商品名模糊搜索
app.get("/search",(req,res)=>{
    let goodsname=req.query.goodsname;
    const reg=new RegExp(goodsname,"i");
    goodsModel.find({goodsname:{$regex:reg}},(err,data)=>{
        if(err){
            res.send({"err_code":400})
        }else{
            res.send({"err_code":200,data:data})
        }
    })
})

//--------------------------------------------
//根据商品id查询详情
app.get("/infobyid",(req,res)=>{
    goodsModel.find({_id:req.query.id},(err,data)=>{
        if(err){
            res.send({"err_code":400})
        }else{
            res.send({"err_code":200,data:data})
        }
    })
})

//用户注册接口
app.post("/register",(req,res)=>{
    let {username,password}=req.body;
    let obj={
        username:username,
        password:password,
        registertime:new Date().getTime()
    }
    usersModel.create(obj,(err,data)=>{
        if(err){
            res.send({"err_code":400})
        }else{
            res.send({"err_code":200})
        }
    })

})

//判断账号是否测存在
app.post("/check",(req,res)=>{
    let {username}=req.body;
    let obj={
        username:username,
    }
    usersModel.findOne(obj,(err,data)=>{
        if(data){
            res.send({"err_code":200})
        }else{
            res.send({"err_code":400})
        }
    })
})
//登录接口--token生成
app.post("/login",(req,res)=>{
    let {username,password} =req.body
    usersModel.findOne({username:username,password:password},(err,data)=>{
        if(data){
            let content = {
                id: data._id
            }; // 要生成token的主题信息--通过什么生成token
            let secretOrPrivateKey = "users" // 这是加密的key（密钥） 
            let token = jwt.sign(content, secretOrPrivateKey, {
                expiresIn: 60 *24*60// 1小时过期
            });
            res.send({
                "err_code": 200,
                "id": data._id,
                "token": token,
                "username":data.username
            });
           
        }else{
            res.send({"err_code": 400,})
            
        }
    })
})

app.get('/checktoken', (req, res) => {
    let token = req.headers.token; // 从body中获取token
    let secretOrPrivateKey = "users"; // 这是加密的key（密钥） 
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
