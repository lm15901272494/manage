const ordersModel = require("./order")
//生成随机数
function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
//订单编号
let count = random(0, 1234567890);
//用户ID
let uerid = random(0, 1234567890);
//姓名
let firstname = ["张", "王", "李", "赵", "周", "吴"]
let lastname = ["一", "二", "三", "四", "五", "六"]
//商品总价
let allprice = random(0, 100000);
//实付金额
let money = random(0, 100000);
//当前时间
let nowdate = new Date().getTime();
//建立时间
let createtime = random(nowdate, nowdate - 1000 * 3600 * 24 * 365);
//付款时间
let paytime = random(nowdate, nowdate - 1000 * 3600 * 24 * 365);
//状态
let orderflag = ["未支付", "已支付", "未发货", "已发货", "售后"]

//随机数据条数    100条
let data = [];
for (let i = 0; i < 3; i++) {
    let name1=`${firstname[random(0,5)]}${lastname[random(0,5)]}`
    let orderflag1=orderflag[random(0,4)]
    let obj = {
        uerid: uerid, //用户ID
        count: count, //订单编号
        name: name1, //收件人
        allprice: allprice, // 商品总价
        money: money, //实付金额
        // createtime: new Date(createtime), //创建日期
        createtime: createtime, //创建日期
        paytime: paytime, //支付日期
        orderflag: orderflag1, //状态
    }
    // console.log(obj)
    data.push(obj)
}
ordersModel.create(data,(err,data)=>{
    console.log("success");
})
