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
const loginModel = require("./model/logins.js")
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
                expiresIn: 60 * 60 * 24 // 1小时过期
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
const limitsModel = require("./model/limits.js")
//查找权限
app.get("/limitGet", (req, res) => {
    limitsModel.find({}, (err, data) => {
        if (err) {
            res.send({
                "err_code": 400
            })
        } else {
            res.send({
                "err_code": 200,
                data: data
            })
        }
    })
})

//插入权限
app.post("/limitAdd", (req, res) => {
    let {
        title,
        name,
        pid
    } = req.body;
    //插入数据库
    let obj = {
        "name": name,
        "title": title,
        "pid": pid
    };
    limitsModel.create(obj, (err, data) => {
        if (err) {
            res.send({
                "err_code": 400
            })
        } else {
            res.send({
                "err_code": 200
            })
        }
    })
})

//删除权限
app.get("/limitDel", (req, res) => {
    //获取id值
    let id = req.query.id;
    //查询出所有的子权限,并删除
    treedel(id);
    // 通过id删除本条数据
    limitsModel.deleteMany({
        _id: id
    }, (err, data) => {
        res.send({
            "err_code": 200
        })
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

function treedel(id, res) {
    limitsModel.find({
        "pid": id
    }, (err, data) => {
        if (data.length > 0) {
            for (let i in data) {
                treedel(data[i]._id)
                limitsModel.deleteMany({
                    "_id": data[i]._id
                }, (err, data) => {})

            }
        }
    })

}

//-----------------------角色接口-----------------------------------
const roleModel = require("./model/roles")
//添加角色  post--角色名称，权限数组
app.post("/roleAdd", (req, res) => {
    let {
        title,
        limitId
    } = req.body;
    roleModel.create({
        "title": title,
        "limitId": limitId
    }, (err, data) => {
        if (err) {
            res.send({
                "err_code": 400
            })
        } else {
            res.send({
                "err_code": 200
            })
        }
    })

})


//获取所有角色  get
app.get("/roleGet", (req, res) => {
    roleModel.find({}, (err, data) => {
        if (err) {
            res.send({
                "err_code": 400
            })
        } else {
            res.send({
                "err_code": 200,
                data: data
            })
        }
    })
})

//删除接口
app.get("/roleDel", (req, res) => {
    roleModel.deleteOne({
        _id: req.query.id
    }, (err, data) => {
        if (err) {
            res.send({
                "err_code": 400
            })
        } else {
            res.send({
                "err_code": 200
            })
        }
    })
})

//修改一  根据角色id  获取角色其信息
app.get("/roleId", (req, res) => {
    roleModel.findOne({
        _id: req.query.id
    }, (err, data) => {
        if (err) {
            res.send({
                "err_code": 400
            })
        } else {
            res.send({
                "err_code": 200,
                data: data
            })
        }
    })
})

//修改二
app.post("/roleChange", (req, res) => {
    let {
        id,
        title,
        limitId
    } = req.body;
    roleModel.updateOne({"_id":id},{
        "_id": id,
        "title": title,
        "limitId": limitId
    }, (err, data) => {
        if (err) {
            res.send({
                "err_code": 400
            })
        } else {
            res.send({
                "err_code": 200
            })
        }
    })
})

//-----------------管理员----------------------------------------
// const loginModel=require("./model/logins")
//添加后台管理员   ---post---管理员名---角色id
app.post("/managerAdd", (req, res) => {
    let {
        admin,
        password,
        roleId
    } = req.body;
    loginModel.create({
        name: admin,
        password: password,
        roleId: roleId
    }, (err, data) => {
        if (err) {
            res.send({
                "err_code": 400
            })
        } else {
            res.send({
                "err_code": 200
            })
        }
    })
})

//获取所有管理员 ---get
app.get("/managerGet", (req, res) => {
    loginModel.find({}).populate("roleId").exec((err, data) => {
        if (err) {
            res.send({
                "err_code": 400
            })
        } else {
            console.log(data)
            res.send({
                "err_code": 200,
                data: data, 
                name:'asd'
            })
        }

    })
})

//删除管理员
app.get("/managerDel", (req, res) => {
    let id = req.query.id;
    loginModel.deleteOne({
        _id: id
    }, (err, data) => {
        if (err) {
            res.send({
                "err_code": 400
            })
        } else {
            res.send({
                "err_code": 200
            })
        }
    })
})

//修改managerId
app.get("/managerId", (req, res) => {
    let id = req.query.id;
    loginModel.findOne({
        _id: id
    }, (err, data) => {
        if (err) {
            res.send({
                "err_code": 400
            })
        } else {
            // console.log(data+'asd')
            res.send({
                "err_code": 200,
                data: data
            })
        }

    })
})

//修改2
app.post("/managerChange", (req, res) => {
    let {
        id,
        admin,
        password,
        roleId
    } = req.body;
    loginModel.updateOne({
        _id: id
    }, {
        "name": admin,
        "password": password,
        "roleId": roleId
    }, (err, data) => {
        if (err) {
            res.send({
                "err_code": 400
            })
        } else {
            // console.log(data)
            res.send({
                "err_code": 200,
                data: data
            })
        }
    })
})


//根据管理员id 获取管理员信息-->角色id --》角色-->权限表中相应权限
app.get("/limitShow", (req, res) => {
    let id = req.query.id;
    loginModel.findOne({
        _id: id
    }).populate("roleId").exec((err, data) => {
        //获取到管理员对应的角色，角色对应的权限，此时权限是一个二维数组
        //下面对权限数组进行降维去重
        let limitObj = {
            "id": data._id,
            "name": data.name,
            "password": data.password
        }
        let limitId = data.roleId.limitId;
        let limitArr = Array.from(new Set(limitId.flat(Infinity)));
        limitsModel.find({
            _id: {
                $in: limitArr
            }
        }, (err, data) => {
            limitObj.limitArr = data;
            res.send(limitObj)
        })
    })

})

// 判断是否有权限
app.get("/checklimit", (req, res) => {
    //接收两个参数，管理员的id，管理员的权限
    let name = req.query.name;
    let id = req.query.id;
    loginModel.findOne({
        _id: id
    }).populate("roleId").exec((err, data1) => {
        // console.log(data1)
        let limitId=data1.roleId.limitId
            // data1--    _id:id值，name,password, roleid:{limitId:[[]],title:"超级管理员"，}
            let limit = Array.from(new Set(limitId.flat(Infinity)))
            limitsModel.find({
                    _id: {
                        $in: limit
                    }
                }, (err, data2) => {
                    // data2   [{_id,title,name,pid},{_id,title,name,pid},]
                    let flag = data2.findIndex(val => val.name == name)
                    if(flag>-1){
                        res.send({err_code:200})
                    }else{
                        res.send({err_code:400})
                    }
                
            })
    })
})
// ------------------------------------商品分类管理-----------------------------------------------------------------------------
// ******
//商品分类管理-增加--图片上传
//托管静态文件
app.use(express.static('public'))
//引入模块
var multer=require("multer");
//使用multer模块
let storage=multer.diskStorage({
    //将文件存储到硬盘上
    // 文件路径
    destination:function(req,file,cb){
         cb(null,"./public/sort")
    },
    //文件名
    filename:function(req,file,cb){            
        cb(null,file.originalname)
    }   

})
var upload=multer({storage:storage});
//{storage:storage}  将文件存储
app.post("/fileup",upload.single("picture"),(req,res)=>{
    //接收文件，需要模块multer
    // console.log(req.headers)
    //  console.log(req.file)
     let imgurl="/sort/"+req.file.originalname;
     res.send({"imgurl":imgurl})
})

//商品分类管理
//1、查找所有分类
const sortModel=require("./model/sorts")
app.get("/sortGet",(req,res)=>{
    sortModel.find({},(err,data)=>{
        if (err) {
            res.send({
                "err_code": 400
            })
        } else {
            res.send({
                "err_code": 200,
                data: data
            })
        }

    })
})
//2、添加分类
   app.post("/sortAdd",(req,res)=>{
       let {title,src,pid}=req.body;
       let obj={"title":title,"src":src,"pid":pid}
       sortModel.create(obj,(err,data)=>{
        if (err) {
            res.send({
                "err_code": 400
            })
        } else {
            res.send({
                "err_code": 200,
                data: data
            })
        }
       })
   })
//3、删除分类
//4、修改分类---根据分类id查找分类信息
//5、修改分类---将查出来的数据修改

//------------------------------增加商品-------------------------
//缩略图上传
let ministorage=multer.diskStorage({
    //将文件存储到硬盘上
    // 文件路径
    destination:function(req,file,cb){
         cb(null,"./public/mini")
    },
    //文件名
    filename:function(req,file,cb){            
        const filenameArr = file.originalname.split('.');
        cb(null, Date.now() + '.' + filenameArr[filenameArr.length - 1]);

    }   

})
var miniupload=multer({storage:ministorage});
app.post("/minifileup",miniupload.single("picture"),(req,res)=>{
     let minisrc="/mini/"+req.file.filename;
     res.send({"minisrc":minisrc})
})


//上传轮播图
let swiperstorage=multer.diskStorage({
    destination:function(req,file,cb){
         cb(null,"./public/swiper")
    },
    //文件名   根据时间戳将文件名转换为随机非汉字文件名
    filename:function(req,file,cb){            
        const filenameArr = file.originalname.split('.');
        cb(null, Date.now() + '.' + filenameArr[filenameArr.length - 1]);

    }   

})
var swiperupload=multer({storage:swiperstorage});
app.post("/swiperfileup",swiperupload.single("picture"),(req,res)=>{
     let swiperurl="/swiper/"+req.file.filename;
     res.send({"swiperurl":swiperurl})
})
 
//添加商品
const goodsModel=require('./model/goods')
app.post("/goodadd",(req,res)=>{
    // let {}=req.body;
    let obj=req.body;
    goodsModel.create(obj,(err,data)=>{
        if(err){
            res.send({"err_code":400})
        }else{
            res.send({"err_code":200,data:data})
        }
    })

})

//分页接口
//返回总条数   30
app.get("/goodList",(req,res)=>{
    //得到总条数
    let query={};
    let flag=req.query.search;
    if(flag){
        if(req.query.goodsname !=""){
            const reg=new RegExp(req.query.goodsname,'i')
            query.goodsname={$regex:reg}
            // query.goodsname=req.query.goodsname;
        }
        if(req.query.price!=""){
            query.price=req.query.price;
        }
    }else{
        query={}
    }
    goodsModel.countDocuments(query,(err,data)=>{
        res.send({"sum":data})
    })
})
//分页返回数据   当前页数page=1  每条显示数据limit=3  
app.get("/goodBreak",(req,res)=>{
    //page   第几页
    //limit  每页显示几条数据
    let page=Number(req.query.page);
    let limit=Number(req.query.limit);
    //搜索传参
    let query={};
    let flag=req.query.search;
    if(flag){
        if(req.query.goodsname !=""){
            const reg=new RegExp(req.query.goodsname,'i')
            query.goodsname={$regex:reg}
            // query.goodsname=req.query.goodsname;
        }
        if(req.query.price!=""){
            query.price=req.query.price;
        }
    }else{
        query={}
    }
    //查询 --跳过几条--每页显示多少条
    goodsModel.find(query,{goodsname:1,price:1,minisrc:1,txt:1,updown:1})
    .skip((page-1)*limit).limit(limit).sort({"_id":-1}).exec((err,data)=>{
        //sort({"_id":-1})倒叙返回
        res.send({"info":data})
    })
})

//修改switch 的值

app.get("/updownval",(req,res)=>{
    goodsModel.updateOne({_id:req.query.id},{updown:req.query.updown},(err,dtat)=>{
        if(err){
            res.send({"err_code":400})
        }else{
            res.send({"err_code":200})
        }
    })
})                                                                                              

//删除商品
app.get("/goodDel",(req,res)=>{
    goodsModel.deleteOne({_id:req.query.id},(err,data)=>{
        if(err){
            res.send({"err_code":400})
        }else{
            res.send({"err_code":200})
        }
    })
})


//------------------------------------用户分析表--------------------------------
const usersModel = require("./model/uservip")
app.get("/vipGet",(req,res)=>{
    usersModel.find({},(err,data)=>{
        if(err){
            res.send({"err_code":400})
        }else{
            res.send({"err_code":200,"data":data})
        }
    })
})


//--------------------------商品分析表-------------------------------------------------
app.get("/goodAnalysis",(req,res)=>{
    goodsModel.aggregate([
        //根据分类id分组求个数---pid
        {$group:{_id:"$pid",count:{$sum:1}}},
        //通过pid对_id进行分组，
        //连表查询 ---分类表---》分类名称
        {
            $lookup:{
                from:"sorts",  //需要连接的表名
                localField:"_id",  //本表需要关联的字段
                foreignField: "_id",   //被连接表需要关联的字段
                as:"arr"    //查询出结果的集合名
            }
           
        }
    ]).exec((err,data)=>{
        let newarr=[];
        for(let v of data){
            newarr.push({title:v.arr[0].title,sum:v.count})
        }
        res.send(newarr)
    })
})


//订单管理
const ordersModel=require("./model/order")
app.get("/orderFind",(req,res)=>{
    ordersModel.find({},(err,data)=>{
        res.send(data)
    })
})

//分页查询
app.get("/orderbreak",(req,res)=>{
    console.log(req.query)
    let page=Number(req.query.page);
    let limit=Number(req.query.limit);
    let search={};
    //查询条件   订单号count   日期（开始日期，结束日期）date
    if("count" in req.query&&req.query.count !=""){
        search.count=req.query.count
    }
    if("date" in req.query&&req.query.date !=""){
        search.paytime={$gt:req.query.date[0],$lt:req.query.date[1]}
    }
    console.log(search)
    ordersModel.find(search).skip((page-1)*limit).limit(limit).sort({"paytime":-1}).exec((err,data)=>{
        res.send(data)
    })
})

//查询总条数
app.get("/orderpage",(req,res)=>{
    let search={};
    //查询条件   订单号count   日期（开始日期，结束日期）date
    if("count" in req.query&&req.query.count !=""){
        search.count=req.query.count
    }
    if("date" in req.query&&req.query.date !=""){
        search.paytime={$gt:req.query.date[0],$lt:req.query.date[1]}
    }
    ordersModel.count(search,(err,data)=>{
        res.send({"sum":data})
    })
})



app.listen(3000, function () {
    console.log(3000);
})