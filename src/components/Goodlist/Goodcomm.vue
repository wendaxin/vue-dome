<template>
  <div>
    <nev-bar title="商品评论"></nev-bar>

    <my-comment :id="query" from="good.comm"/>
  </div>
</template>

<script>
    export default {
      name: "Goodcomm",
      data() {
        return {
          query: '5'
        }
      }
    }
</script>

<style scoped>

</style>
