<template>
  <mt-swipe :auto="4000">
    <mt-swipe-item v-for="(item,id) in imgs" :key="id">
      <div class="box">
        <img :src="item.img" alt="" :style="wt">
      </div>
    </mt-swipe-item>
  </mt-swipe>
</template>

<script>
    export default {
      name: "my-lunbo",
      props:['url','wt'],
      data(){
        return {
          imgs: []
        }
      },
      created(){
        this.$axios.get(this.url)
          .then(({data})=>{
            this.imgs = data.message
          })
          .catch( err=>console.log('轮播图未加载',err) )
      }
    }
</script>

<style scoped lang="less">
  @rem:25rem;

  .mint-swipe{
    height: 200px;
    .mint-swipe-item{
      .box{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        img{
          height: 100%;
        }
      }
    }
  }
</style>
