<template>
    <div>
      <my-lunbo url="getlunbo" wt="width: 100%"></my-lunbo>

      <my-list class="grid">
        <my-listchild v-for="(item,id) in grids" :key="id">
          <router-link :to="item.router">
            <div :class="item.classname"></div>
            <span>{{item.title}}</span>
          </router-link>
        </my-listchild>
      </my-list>
    </div>
</template>

<script>
  export default {
    name: "Home",
    data(){
      return {
        imgs:[],
        grids: [
          {
            classname: 'grid-news',
            title: '新闻资讯',
            router:{ name: 'news.list' }
          },
          {
            classname: 'grid-photo',
            title: '图文分享',
            router:{ name: 'photo.list',params: {categoryId: 0} }
          },
          {
            classname: 'grid-good',
            title: '商品展示',
            router:{ name: 'good.list'}
          },
          {
            classname: 'grid-leave',
            title: '留言反馈',
            router:""
          },
          {
            classname: 'grid-seek',
            title: '搜索资讯',
            router:""
          },
          {
            classname: 'grid-touch',
            title: '联系我们',
            router:""
          }
        ],
      }
    }
  }
</script>

<style scoped lang="less">
  @rem:25rem;

  .grid{
    a{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-flow: column;
      width: 100%;
      height: 100%;
      color: #111111;
      span{
        font-size: 18px;
      }
      .grid-news{
        background: url("../../assets/img/toucan.png") no-repeat;
        background-size: cover;
        width: 50px;
        height: 50px;
      }
      .grid-photo{
        background: url("../../assets/img/cow.png") no-repeat;
        background-size: cover;
        width: 50px;
        height: 50px;
      }
      .grid-good{
        background: url("../../assets/img/giraffe.png") no-repeat;
        background-size: cover;
        width: 50px;
        height: 50px;
      }
      .grid-leave{
        background: url("../../assets/img/frog.png") no-repeat;
        background-size: cover;
        width: 50px;
        height: 50px;
      }
      .grid-seek{
        background: url("../../assets/img/lion.png") no-repeat;
        background-size: cover;
        width: 50px;
        height: 50px;
      }
      .grid-touch{
        background: url("../../assets/img/penguin.png") no-repeat;
        background-size: cover;
        width: 50px;
        height: 50px;
      }
    }
  }
</style>
