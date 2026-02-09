<template>
  <div class="test-container">
    <Layout>
      <template #left>
        <div class="left">左边栏区域，宽度适应内容，溢出隐藏</div>
      </template>
      <template #main>
        <div class="main">主区域，宽度沾满剩余空间，溢出隐藏</div>
      </template>
      <template #right>
        <div class="right">右边栏，宽度适应内容，溢出隐藏</div>
      </template>
    </Layout>
  </div>
</template>

<script>
import Layout from "./";

export default {
  components: {
    Layout,
  },
};
</script>

<style scoped>
.test-container {
  width: 1000px;
  height: 600px;
  border: 2px solid;
}
.left {
  width: 200px;
  height: 100%;
  background: lightblue;
}
.main {
  width: 100%;
  height: 100%;
  background: lightcoral;
}
.right {
  width: 150px;
  height: 100%;
  background: lightcyan;
}
</style>
