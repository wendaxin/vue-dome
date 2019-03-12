<template>
    <div class="wrap">
      <nev-bar title="商品展示"></nev-bar>

      <div class="list-wrap">
        <mt-loadmore :bottom-method="loadBottom" :auto-fill="false" ref="loadmore">
          <ul class="list">
            <li class="item" v-for="(item,id) in list" :key="id">
              <router-link :to="{name:'good.detail',query:{id: item.id}}">
                <div class="border">
                  <img :src="item.img_url" alt="" class="img"/>
                  <span class="w100 ws">{{item.title}}</span>
                  <span class="w100 ws">{{item.text}}</span>
                  <div class="w100 gray">
                    <p class="red">￥{{item.rate}}.00<span class="lt">￥{{item.hrate}}.00</span></p>
                    <span>热卖中</span>
                    <span>剩{{item.num}}件</span>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
        </mt-loadmore>
      </div>

    </div>
</template>

<script>
    export default {
      name: "Goodlist",
      data() {
        return {
          list: []
        }
      },
      created(){
        this.$axios.get('getgoods')
          .then(({data})=>{
            let {a} = data
            this.list = a
          })
          .catch(e=>console.log(e,"商品列表获取失败"))
      },
      methods:{
        loadBottom(){
          this.$axios.get('getgoods')
            .then(({data})=>{
              let {b} = data
              this.list.push(...b)
              // this.list = a
            })
            .catch(e=>console.log(e,"商品列表获取失败"))
          this.$refs.loadmore.onBottomLoaded()
        }
      }
    }
</script>

<style scoped lang="less">
  @rem:25rem;

  .list-wrap{
    height: calc(100% - 50px);
    .list{
      display: flex;
      flex-flow: row wrap;
      .item{
        width: 50%;
        height: 270px;
        box-sizing: border-box;
        padding: 10px;
        .border{
          width: 100%;
          height: 100%;
          border: 2px solid #828282;
          font-size: 12px;
          display: flex;
          flex-flow: row wrap;
          .img{
            width: 100%;
            height: 150px;
          }
          .w100{
            width: 100%;
          }
          .ws{
            white-space: pre-wrap;
            line-height: 16px;
          }
          .gray{
            background: #c7c7c7;
            display: flex;
            flex-flow: row wrap;
            justify-content: space-between;
            line-height: 16px;
            .red{
              width: 100%;
              color: #ff3f14;
              .lt{
                color: #000;
                text-decoration:line-through;
              }
            }
          }
        }
      }
      li:nth-last-of-type(1){
        margin-bottom: 55px;
      }
    }
  }
</style>
