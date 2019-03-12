<template>
    <div class="head">
      <h1 @click="goback" class="le">&nbsp<</h1>
      <h1 class="title">{{title}}</h1>
    </div>
</template>

<script>
    export default {
      name: "nev-bar",
      props:{
        title: String
      },
      data(){
        return {

        }
      },
      methods:{
        goback(){
          this.$router.go(-1)
        }
      }
    }
</script>

<style scoped lang="less">


  .head{
  height: 50px;
  width: 100%;
  display: flex;
  .le{
    width: 20%;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .title{
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
