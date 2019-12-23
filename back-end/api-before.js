const express=require("express");
const app=express();
//跨域
const cors=require("cors");
app.use(cors())
//post请求
const bodyparser=require("body-parser");
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
//静态资源发布
app.use(express.static("public"))
app.listen(3333,()=>{
    console.log(3333);
})
//分类表
const sortModel=require("./model/sorts")

//商品表
const goodsModel=require("./model/goods")

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
    console.log(sortid)
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