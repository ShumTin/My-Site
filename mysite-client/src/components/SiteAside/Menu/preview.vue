<template>
  <div class="test-container">
    <Menu />
  </div>
</template>

<script>
import Menu from "./";
export default {
  components: {
    Menu,
  },
};
</script>

<style scoped>
.test-container {
  width: 400px;
  height: 400px;
  background: black;
  margin: 0 auto;
  overflow: hidden;
}
</style>
