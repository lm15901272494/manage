<template>
    <div>
        <h1>订单页面</h1>
        <div>
            <p>个人信息</p>
            <p @click="$router.push({name:'address'})">收货地址设置</p>
        </div>
    </div>
</template>