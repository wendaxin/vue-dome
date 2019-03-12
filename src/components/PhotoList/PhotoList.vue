<template>
  <div class="box">
    <nev-bar title="图文列表"></nev-bar>

    <div class="classify" v-drag >
      <a
        href="javascript:;"
        class="title"
        :class="{active: isActive == item.id}"
        v-for="item in title"
        :key="item.id"
        @click="active(item.id)"
      >
        {{item.title}}
      </a>
    </div>

    <ul>
      <li class="list" v-for="item in imgs" :key="item.id">
        <router-link :to="{name:'photo.detail',query:{id: item.id,page: 0}}">
          <!--v-lazy="item.img_url"-->
          <img alt="" class="list-img" :src="item.img_url"/>
          <div class="list-mask">
            <p>{{item.title}}</p>
            <p class="list-content">{{item.zhaiyao}}</p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
      name: "PhotoList",
      data(){
        return {
          imgs: [],
          title: [],
          isActive: 0
        }
      },
      created(){
        let {categoryId} = this.$route.params
        this.isActive = categoryId
        this.getimgs(categoryId)
        this.$axios.get('getimgcategory')
          .then(({data})=>{
            this.title = data.message
          })
          .catch(err=>console.log(err,'分类信息获取失败'))
      },
      beforeRouteUpdate(to,from,next){
        let {categoryId} = to.params
        this.isActive = categoryId
        this.getimgs(categoryId)
        next()
      },
      methods:{
        getimgs(categoryId){
          this.$axios.get('getphotoimgs')
            .then( ({data})=>{
              let {a,b} = data
              if(categoryId == 1 || categoryId == 4){
                this.imgs = []
                this.$toast({
                  message: '2，5没图片: )',
                  iconClass: 'iconfont icon-icon_details',
                  duration: 1500
                })
              }else {
                categoryId == 0 ? this.imgs = a : this.imgs = b
              }

            })
            .catch(err=>console.log(err,"图片获取失败"))
        },
        active(i){
          this.isActive = i
          this.$router.push({
            name: 'photo.list',
            params: {categoryId: i}
          })
        }
      },
      directives: {
        drag: {
          bind:function(el,binding){
            let elem = el;
            var vle = 0

            elem.ontouchstart = function(e){
              let disX = e.touches[0].clientX - elem.offsetLeft;
              var l = null,
                  wt = elem.children[elem.children.length-1].offsetLeft+elem.children[0].offsetWidth,
                  boxw = elem.clientWidth

              document.ontouchmove = function(e){
                l = e.touches[0].clientX - disX;

                if (vle * 1 + l * 1 <= 0 && vle * 1 + l * 1 >= wt * (-1) + boxw) {
                  l = vle * 1 + l * 1
                } else if (wt * 1 < boxw || vle * 1 + l * 1 > 0) {
                  l = 0
                } else if (vle * 1 + l * 1 < wt * (-1) + boxw) {
                  l = wt * (-1) + boxw
                }

                elem.style.transform = `translateX(${l/25}rem)`

              }

              document.ontouchend = function(e) {
                vle = String(l) || vle
                document.ontouchend = null
                document.ontouchmove = null

              }

            }

          }
        }
      }
    }
</script>

<style scoped lang="less">
  @rem:25rem;

  .box{
    width: 100%;
    overflow: hidden;
    .classify {
      height: 24px;
      padding: 6px 0;
      font-size: 16px;
      white-space: nowrap;
      .title{
        color: #000000;
        padding: 0 3px;
        margin: 0 6px;
        border-radius: 6px;
        border: 1px solid #002dff;
        width: 100px;
      }
      .active{
        border: 1px solid #ff1d33;
      }
    }

    .list{
      box-sizing: border-box;
      width: 100%;
      padding: 3px 0;
      height: 200px;
      position: relative;
      .list-img{
        width: 100%;
        height: 100%;
      }
      .list-mask{
        width: 100%;
        height: 33%;
        position: absolute;
        bottom: 3px;
        left: 0;
        background: rgba(0,0,0,0.2);
        font-size: 16px;
        display: flex;
        flex-flow: column;
        color: #fdfffb;
        .list-content{
          word-wrap:break-word;
          word-break:break-all;
        }
      }
    } 
  }

</style>
