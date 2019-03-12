<template>
  <div id="app">
    <mt-header fixed title="吖吖吖吖吖"></mt-header>

    <router-view/>

    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="home">
        <img slot="icon" src="./assets/img/chips.png" @click="changeHash">
        首页
        <!--<div class="ico" @click="changeHash">-->
          <!--<img slot="icon" src="./assets/img/chips.png">-->
          <!--首页-->
        <!--</div>-->
      </mt-tab-item>
      <mt-tab-item id="member">
        <img slot="icon" src="./assets/img/drinks.png" @click="changeHash">
        会员
        <!--<div class="ico" @click="changeHash">-->
          <!--<img slot="icon" src="./assets/img/drinks.png">-->
          <!--会员-->
        <!--</div>-->
      </mt-tab-item>
      <mt-tab-item id="shopcart">
        <img slot="icon" src="./assets/img/driedfish.png" @click="changeHash">
        购物车
        <!--<div class="ico" @click="changeHash">-->
          <!--<img slot="icon" src="./assets/img/driedfish.png">-->
          <!--购物车-->
        <!--</div>-->
      </mt-tab-item>
      <mt-tab-item id="search">
        <img slot="icon" src="./assets/img/drumstick.png" @click="changeHash">
        查找
        <!--<div class="ico" @click="changeHash">-->
          <!--<img slot="icon" src="./assets/img/drumstick.png">-->
          <!--查找-->
        <!--</div>-->
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
  import storage from '@/storage.js'

  export default {
    name: 'App',
    data() {
      return {
        selected: ''
      }
    },
    methods: {
      changeHash() {
        // this.$nextTick(function(){
        //   console.log(this.selected)
        // })
        setTimeout(() => {
          this.$router.push({name: this.selected})
        }, 100)
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
