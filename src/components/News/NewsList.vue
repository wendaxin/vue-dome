<template>
  <div>
    <nev-bar title="新闻列表" />

    <div class="list">
      <ul>
        <li v-for="(item,id) in newslist" :key="id">
          <router-link class="list-box" :to="{name: 'news.detail', query: {id :item.id}}">
            <img :src="item.img_url" alt="" class="list-box-img"/>
            <div class="list-box-mess">
              <span class="title">{{item.title}}</span>
              <div class="list-num">
                <p class="click">点击数:{{item.click}}</p>
                <p class="datetime">发表时间:{{item.add_time | convertTime('YYYY-MM-DD')}}</p>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
      name: "NewsList",
      data(){
        return {
          newslist: []
        }
      },
      created(){
        this.$axios.get('getnewslist')
          .then( ({data})=>{
            this.newslist = data.message
          } )
          .catch( err=>console.log('新闻列表未加载',err) )
      }
    }
</script>

<style scoped lang="less">
  @rem:25rem;

  .list-box{
  height: 80px;
  display: flex;
  flex-flow: row;
  .list-box-img{
    box-sizing: border-box;
    padding: 10px;
    width: 100px;
    height: 100%;
  }
  .list-box-mess{
    box-sizing: border-box;
    padding: 10px;
    height: 100%;
    flex-grow: 1;
    display: flex;
    flex-flow: column;
    .title{
      width: 100%;
      height: 60%;
      display: flex;
      align-items: center;
      font-size: 18px;
      color: #000000;
    }
    .list-num{
      width: 100%;
      height: 40%;
      font-size: 12px;
      color: rgb(15,165,255);
      display: flex;
      flex-flow: row nowrap;
      .click{
        width: 25%;
        display: flex;
        align-items: center;
      }
      .datetime{
        flex-grow: 1;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
