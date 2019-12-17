const goodsModel=require('./goods')
let arr=[];
for(let i=0;i<30;i++){
    arr.push({
        "goodsname":"苹果"+i,
        "price":i*10,
         "size":[],
        "minisrc":"http://image.it168.com/n/640x480/5/5301/5301840.jpg",
        swipersrc:[{
            src:"http://image.it168.com/n/640x480/5/5301/5301840.jpg",
            src:"http://image.it168.com/n/640x480/5/5301/5301840.jpg",
            src:"http://image.it168.com/n/640x480/5/5301/5301840.jpg",
        }],
        txt:"苹果",
        enter:false,
        updown:false

    })
}
goodsModel.create(arr,(err,data)=>{
    if (err) throw err;
    console.log("插入成功")
})