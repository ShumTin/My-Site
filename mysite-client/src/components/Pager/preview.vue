<template>
  <div class="test-container">
    <Pager :total="800" :current="current" @pageChange="handlePageChange" />
  </div>
</template>

<script>
import Pager from "./";

export default {
  components: {
    Pager,
  },
  data() {
    return {
      current: 5,
    };
  },
  methods: {
    handlePageChange(newPage) {
      this.current = newPage;
    },
  },
};
</script>
