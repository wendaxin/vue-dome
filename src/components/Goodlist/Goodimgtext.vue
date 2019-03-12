<template>
  <div class="detail">
    <nev-bar title="图文介绍"></nev-bar>

    <div class="title">{{content.title}}</div>

    <div class="content">
      {{content.content}}
    </div>

    <img :src="content.img_url" alt="" class="img"/>

  </div>
</template>

<script>
    export default {
      name: "Goodimgtext",
      data(){
        return {
          content:{}
        }
      },
      created(){
        let {id} = this.$route.query
        this.$axios.get('getgoodimgtext')
          .then(({data})=>{
            let {a,b,c,d,e} = data

            switch (id) {
              case '1':
                this.content = a
                break
              case '2':
                this.content = b
                break
              case '3':
                this.content = c
                break
              case '4':
                this.content = d
                break
              default:
                this.content = e
            }
          })
          .catch(e=>console.log(e,"图文获取失败"))
      }
    }
</script>

<style scoped lang="less">
  @rem:25rem;

  .detail{
    width: 100%;
    display: flex;
    flex-flow: column;
    .title{
      font-size: 18px;
      height: 36px;
      line-height: 36px;
      color: rgb(44, 165, 255);
      font-weight: bolder;
    }
    .content{
      font-size: 18px;
      line-height: 24px;
    }
    .img{
      width: 100%;
    }
  }
</style>
