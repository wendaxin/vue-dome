<template>
  <div class="grid">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "my-list"
  }
</script>

<style scoped lang="less">
  .grid{
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    justify-content: center;
  }
</style>
