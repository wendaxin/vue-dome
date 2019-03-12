<template>
    <div>
      <div class="submit">
        <span class="title">提交评论</span>
        <span class="back">返回</span>
        <input type="text" class="inp" v-model="content"/>
        <button class="btn" @click="addcom">发表评论</button>
      </div>

      <div class="list">
        <span class="title">评论列表</span>
        <span class="num">共{{infonum}}条评论</span>
        <!--<div class="info" v-for="(item,id) in infos" :key="id">
          {{`item`}}
        </div>-->
        <div class="info" v-for="(item,id) in infos" :key="id">
          <div class="text">{{item.user_name}}:{{item.content}}</div>
          <div class="time">{{item.add_time | fromNowTime}}</div>
        </div>
        <button class="btn" @click="addarr">加载更多</button>
      </div>
    </div>
</template>

<script>
  import comments from '@/storage.js'

  export default {
    name: "my-comment",
    props: ["id","from"],
    data() {
      return {
        infos: [],
        infonum: 0,
        content: ""
      }
    },
    created() {

      let page = this.$route.query.page || "0";
      this.getinfo(page)
        .then(i => {
          i.length > 0 ? this.infos = i : this.$toast({
            message: '没有评论辣',
            iconClass: 'icon icon-success',
            duration: 1500
          })
        })
    },
    methods: {
      async getinfo(page) {
        var prom
        if (comments.getcomment() && comments.getcomment()["d"].length > 0) {
          prom = comments.getcomment()
        } else {
          prom = await this.$axios.get('getcomments')
            .then(({data}) => {
              comments.setcomment(data)
              return data
            })
            .catch(err => console.log(err, "评论加载失败"))
        }

        return await Promise.resolve(prom)
          .then(({a, b, c, d}) => {
            switch (String(this.id)) {
              case "1":
                return a
                break
              case "2":
                return b
                break
              case "3":
                return c
                break
              default:
                return d
            }
          })
          .then(i => {
            this.infonum = i.length
            return i.slice(6 * (page), 6 * (page * 1 + 1))
          })

      },
      addarr() {
        let page = this.$route.query.page * 1 + 1;
        this.$router.push({
          name: this.from,
          query: {
            id: this.id,
            page: page
          }
        })
        this.getinfo(page)
          .then(i => {
            i.length > 0 ? this.infos.push(...i) : this.$toast({
              message: '没有评论辣',
              iconClass: 'icon icon-success',
              duration: 1500
            })
          })
      },
      addcom() {
        var prom
        if (this.content.length > 0 && this.content.trim().length > 0) {
          prom = new Promise((res, rej) => {
            comments.addcomment(new Date().toISOString(), this.content, this.id)
            res()
          })
        } else if (this.content.length > 0 && this.content.trim().length == 0) {
          prom = new Promise((res, rej) => {
            comments.addcomment(new Date().toISOString(), "???嘤嘤嘤???", this.id)
            res()
          })
        } else {
          this.$toast({
            message: '写点什么八',
            iconClass: 'icon icon-success',
            duration: 1500
          })
          prom = Promise.reject()
        }
        prom.then(() => {
          this.content = ''
          let page = "0";
          this.$router.push({
            name: this.from,
            query: {
              id: this.id,
              page: page
            }
          })
          this.getinfo(page)
            .then(i => {
              this.infos = i
            })
        },()=>{})
      }
    }
  }
</script>

<style scoped lang="less">
  @rem:25rem;
  .submit{
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    .title, .back{
      font-size: 18px;
      min-width: 10%;
      line-height: 30px;
    }
    .title{
      font-weight: bolder;
    }
    .inp{
      width: 100%;
      font-size: 18px;
      line-height: 24px;
      box-sizing: border-box;
      border: 1px solid #a1a0a3;
      border-radius: 2px;
    }
    .btn{
      width: 100%;
      background: #0075ff;
      font-size: 16px;
      color: #ffffff;
      text-align: center;
      line-height: 30px;
      border-radius: 6px;
      margin: 10px 0;
    }
  }

  .list{
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    .title, .num{
      font-size: 18px;
      min-width: 10%;
      line-height: 30px;
    }
    .title{
      font-weight: bolder;
    }
    .info{
      width: 100%;
      box-sizing: border-box;
      border-bottom: 1px solid #8e8e8e;
      font-size: 16px;
      color: #2d2d2d;
      display: flex;
      .text{
        white-space: nowrap;
        text-overflow:ellipsis;
        overflow: hidden;
        line-height: 32px;
        flex-grow: 1;
      }
      .time{
        flex-shrink: 0;
        line-height: 32px;
      }
    }
    .btn{
      width: 100%;
      background: #faf8ff;
      font-size: 16px;
      color: #ff001e;
      box-sizing: border-box;
      border-radius: 6px;
      border: 1px solid red;
      text-align: center;
      line-height: 30px;
      margin: 10px 0;
    }
  }

</style>
