<template>
    <div class="base">
        <div class="header">
            <van-nav-bar title="标题" left-text="返回" left-arrow>
            <van-icon name="search" slot="right" />
            </van-nav-bar>
            <form action="/">
                <van-search
                    placeholder="请输入搜索关键词"
                    show-action
                    @focus="focus"
                />
                </form>
                
        </div>
        <div class="main">
            <router-view></router-view>
        </div>
        <div class="footer">
            <ul>
                <router-link to="/base/msite" tag="li">首页</router-link>
                <router-link :to="{name:'sort'}" tag="li">分类</router-link>
                <router-link :to="{name:'car'}" tag="li">购物车</router-link>
                <router-link :to="{name:'person'}" tag="li">个人中心</router-link>
            </ul>

        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            souval:"",
        }
    },
    methods:{
    focus(){
        this.$router.push({"name":"search"})
    }
    }
}
</script>
<style >
html,body,#app,.base{
    height: 100%;
    margin: 0;
    padding: 0;
}
.base{
    display: flex;
    flex-direction: column;
}
.header,.footer{
    height: 60px;
    background: lightblue
}
.main{
    flex: 1;
    overflow: hidden;
}
.footer ul{
    display: flex;
    justify-content: space-around;
    font: bold 20px/60px "微软雅黑";
}
.router-link-exact-active{
    color: red;
}
</style>