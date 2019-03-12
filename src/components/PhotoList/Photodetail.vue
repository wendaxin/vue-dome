<template>
    <div>
      <nev-bar title="图文详情"></nev-bar>

      <div class="header">
        {{texts.title}}
      </div>

      <div class="info">
        <div class="datatime">
          发起日期:{{texts.add_time}}
        </div>
        <div class="click">
          {{texts.click}}次浏览
        </div>
        <div class="classify">
          分类:{{texts.classify}}
        </div>
      </div>

      <vue-preview :slides="imgs" ></vue-preview>

      <div class="content">
        {{texts.content}}
      </div>
      <my-comment :id="query" from="photo.detail"/>
    </div>
</template>

<script>
    export default {
      name: "Photodetail",
      props:["query"],
      data(){
        return {
          texts: {},
          imgs: []
        }
      },
      created(){
        this.$axios.get('getimageInfo')
          .then(({data})=>{
            let id = this.query
            switch (id) {
              case "1":
                this.texts = data.a
                break
              case "2":
                this.texts = data.b
                break
              case "3":
                this.texts = data.c
                break
              default:
                this.texts = data.d
            }
          })
          .catch(err=>console.log(err,"图文详情文字获取失败"))

        this.$axios.get("gettwfximages")
          .then(({data})=>{
            let {id} = this.$route.query
            switch (String(id)) {
              case "1":
                this.imgs = data.a
                break
              case "2":
                this.imgs = data.b
                break
              case "3":
                this.imgs = data.c
                break
              default:
                this.imgs = data.d
            }
            this.imgs = this.imgs.map((i)=>{
              return {
                src: i.img,
                msrc: i.img,
                alt: ".",
                title: ".",
                w: 375,
                h: 266
              }
            })
          })
          .catch(err=>console.log(err,"图片获取失败"))
      }
    }
</script>

<style scoped lang="less">
  @rem:25rem;

  .header{
    font-size: 24px;
    color: #44c5ff;
    padding: 10px 6px;
  }
  .info{
    font-size: 16px;
    color: #000000;
    display: flex;
    flex-flow: row wrap;
    .datatime{
      width: 100%;
      box-sizing: border-box;
      padding: 2px 2px;
    }
    .click{
      min-width: 30%;
      padding: 2px 10px 2px 2px;
      box-sizing: border-box;
    }
    .classify{
      box-sizing: border-box;
      padding: 2px;
    }
  }
  .content{
    font-size: 16px;
    color: #000000;
    line-height: 24px;
    margin-bottom: 20px;
  }

</style>
