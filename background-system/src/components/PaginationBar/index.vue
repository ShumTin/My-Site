<template>
  <div class="pagination-container">
    <div class="pagination-left">
      <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="pageSizes"
        :total="total"
        layout="prev, pager, next, total"
        background
        @current-change="$emit('change', $event, pageSize)"
      />
    </div>

    <div class="pagination-right">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="sizes, jumper"
        @size-change="$emit('change', 1, $event)"
        @current-change="$emit('change', $event, pageSize)"
      />
    </div>
  </div>
</template>

<script>

export default {
  name: 'PaginationBar',
  props: {
    total: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 30, 40]
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination-container{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
