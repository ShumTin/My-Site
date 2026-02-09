<template>
  <div class="app-container">
    <el-table
      v-loading="loading"
      border
      :data="data"
      style="width: 100%"
      element-loading-text="加载中..."
      highlight-current-row
    >
      <el-table-column
        align="center"
        label="序号"
        width="50"
      >
        <template slot-scope="scope">
          {{ scope.$index + (currentPage - 1) * pageSize + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="头像"
        width="80"
      >
        <template slot-scope="scope">
          <el-avatar shape="square" size="small" :src="scope.row.avatar" />
        </template>
      </el-table-column>
      <el-table-column
        label="昵称"
        align="center"
        width="200"
      >
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="评论内容"
      >
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="评论日期"
        width="280"
      >
        <template slot-scope="scope">
          {{ scope.row.createDate }}
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="操作"
        width="140"
      >
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="deleteMessage(scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div class="pager-container">
      <pagination-bar :total="total" :current-page="currentPage" :page-size="pageSize" @change="handlePageChange" />
    </div>
  </div>
</template>

<script>
import { getMessage, delMessage } from '@/api/message'
import { formatDate } from '@/utils/tools'
import PaginationBar from '@/components/PaginationBar/index.vue'

export default {
  components: {
    PaginationBar
  },
  data() {
    return {
      data: [],
      total: 0,
      currentPage: 1,
      pageSize: 20,
      srcList: [],
      loading: false,
      totalPage: 0
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      getMessage(this.currentPage, this.pageSize).then(resp => {
        this.data = resp.data.rows.map(item => ({
          ...item,
          createDate: formatDate(item.createDate)
        }))
        this.total = resp.data.total
        this.totalPage = Math.ceil(this.total / this.pageSize)
        if (this.currentPage > this.totalPage) {
          this.currentPage = this.totalPage
          this.fetchData()
        }
      }).finally(() => {
        this.loading = false
      })
    },
    handlePageChange(page, size) {
      this.currentPage = page
      this.pageSize = size
      this.fetchData(page, size)
    },
    deleteMessage({ id }) {
      this.$confirm('是否删除此评论', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delMessage(id).then((resp) => {
          this.fetchData()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    formatDate
  }
}
</script>

  <style lang="scss" scoped>
  .pager-container{
    margin-top: 20px;
  }
  </style>
