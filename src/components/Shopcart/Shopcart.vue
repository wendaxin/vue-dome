<template>
  <div>
    <nev-bar title="购物车"></nev-bar>

    <ul class="list" v-if="list.length">
      <li class="wrap" v-for="item in list" :key="item.id">
        <i class="dot" v-if="!item.isbuy" @click="select(item.id)">
        </i>
        <svg class="icon" aria-hidden="true" v-else="item.isbuy" @click="select(item.id)">
          <use xlink:href="#icon-iconfontxuanzhong1"></use>
        </svg>
        <img :src="item.img" alt="" class="img"/>
        <div class="box">
          <div class="title">{{item.title}}</div>
          <div class="level">
            <div class="l">
              ￥{{item.rate}}
            </div>
            <div class="btn" @click="sub(item.id)">-</div>
            <div>{{item.num}}</div>
            <div class="btn" @click="add(item.id)">+</div>
            <span class="delete" @click="deleteitem(item.id)">删除</span>
          </div>
        </div>
      </li>
    </ul>

    <router-link :to="{name: 'good.list'}" v-else="!list.length">
      <div class="skip">空空如也</div>
    </router-link>

    <div class="close">
      <span class="w100">总计(不含运费):￥{{total}}</span>
      <span>已经选择商品{{amount}}件</span>
      <button class="btn" @click="close" :class="{active:!total}">去结算</button>
    </div>

  </div>
</template>

<script>
  import shop from '@/storage.js'

  export default {
    name: "Shopcart",
    data() {
      return {
        list: []
      }
    },
    created() {
      shop.getshop() ? this.list = shop.getshop() : this.list = []
    },
    methods:{
      select(i){
        this.list = this.list.map(item=>{
          if(item.id == i){
            item.isbuy = !item.isbuy
          }
          return item
        })
      },
      sub(i){
        this.list = this.list.map(item=>{
          if(item.id == i && item.num>1){
            item.num--
          }
          return item
        })
      },
      add(i){
        this.list = this.list.map(item=>{
          if(item.id == i){
            item.num++
          }
          return item
        })
      },
      deleteitem(i){
        this.list = this.list.filter(item=>{
          if(item.id == i){
            return false
          }else {
            return true
          }
        })
      },
      close(){
        if(this.total>0){
          this.$toast({
            message: `你又买不起 : )`,
            iconClass: 'icon icon-success',
            duration: 1500
          })
        }
      }
    },
    computed:{
      total(){
        return this.list.reduce((add,i)=>{
          return i.isbuy ? add + i.num * i.rate : add
        },0)
      },
      amount(){
        return this.list.reduce((add,i)=>{
          return i.isbuy ? add + i.num : add
        },0)
      }
    },
    beforeRouteLeave (to, from, next) {

      if(this.list.length == 0 ||confirm("要离开这个婴儿车么?")){
        shop.setshop(this.list)
        next(true)
      }else {
        next(false)
      }

    }
  }
</script>

<style scoped lang="less">
  @rem:25rem;

  .list{
    .wrap{
      width: 100%;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      margin-bottom: 10px;
      .dot{
        width: 16px;
        height: 16px;
        border: 1px solid #9c9c9c;
        border-radius: 50%;
        margin: 0 10px;
      }
      .img{
        width: 80px;
        height: 80px;
        margin-right: 10px;
      }
      .box{
        display: flex;
        flex-flow: column;
        font-size: 18px;
        .title{
          font-size: 24px;
          font-weight: bolder;
          color: #bd00ff;
          line-height: 36px;
        }
        .level{
          display: flex;
          flex-flow: row nowrap;
          line-height: 30px;
          .l{
            width: 90px;
          }
          .btn{
            padding: 0 10px;
            border: 1px solid #c7c7c7;
            border-radius: 10px;
            margin: 0 10px;
          }
          .delete{
            color: #ff0008;
            font-size: 12px;
          }
        }
      }
    }
    li:nth-last-of-type(1){
      margin-bottom: 145px;
    }
  }
  .close{
    width: 100%;
    display: flex;
    position: fixed;
    bottom: 55px;
    left: 0;
    flex-flow: row wrap;
    background: #b8b8b8;
    font-size: 18px;
    line-height: 30px;
    box-sizing: border-box;
    padding: 10px;
    justify-content: space-between;
    .w100{
      width: 100%;
    }
    .btn{
      padding: 0 10px;
      border-radius: 10px;
      background: #ff1c23;
      color: #ffffff;
    }
    .active{
      background: #666666;
    }
  }
  .icon {
    width: 18px; height: 18px;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    margin: 0 10px;
  }
  .skip{
    width: 100%;
    text-align: center;
    line-height: 200px;
    font-size: 18px;
    color: #111111;
  }
</style>
