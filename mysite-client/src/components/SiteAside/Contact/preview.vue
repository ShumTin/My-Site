<template>
  <div class="test-container">
    <Contact />
  </div>
</template>

<script>
import Contact from "./";
export default {
  components: {
    Contact,
  },
};
</script>

<style scoped>
.test-container {
  width: 400px;
  height: 400px;
  background: #000;
  margin: 100px auto;
}
</style>
