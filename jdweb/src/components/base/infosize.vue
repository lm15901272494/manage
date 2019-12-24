<template>
    <div>
        <dl>
         <dt><img src="" alt=""></dt>
         <dd>价格</dd>
         <dd>还有111件</dd>
       </dl>
       <hr>
       <ul>
         <li>
           <span>种类</span>
         </li>
         <li>
           <span>尺寸</span>
         </li>
         <li>
           <span>我要买</span><span>(1件起售，限购5件)</span>
           <div>
             <button>-</button>
             <input type="text" value="0">
             <button>+</button>
           </div>
         </li>
         <li>
           <span>订单备注</span><span></span>
         </li>
         <li>
           <van-goods-action>
              <van-goods-action-button color="#be99ff" type="warning" text="取消" />
              <van-goods-action-button color="#7232dd" type="danger" text="确定" />
            </van-goods-action>
         </li>
       </ul>
    </div>
</template>