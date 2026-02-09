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
        label="文章名称"
        width="180"
      >
        <template slot-scope="scope">
          <el-popover
            placement="right"
            title="博客预览图"
            width="230"
            trigger="hover"
          >
            <el-image
              style="width: 200px"
              :src="scope.row.thumb"
              fit="contain"
              :preview-src-list="srcList"
            />
            <template slot="reference">
              <a href="#" target="_blank" @click.prevent="goToTitleHandle(scope.row)">{{ scope.row.title }}</a>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="文章描述"
      >
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="浏览数"
        width="120"
      >
        <template slot-scope="scope">
          {{ scope.row.scanNumber }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="评论数"
        width="120"
      >
        <template slot-scope="scope">
          {{ scope.row.commentNumber }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="所属分类"
        width="180"
      >
        <template slot-scope="scope">
          {{ scope.row.category === null ? '未分类' : scope.row.category.name }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="创建日期"
        width="240"
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
          <el-row>
            <el-col :span="12" :push="1">
              <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                <el-button type="warning" icon="el-icon-edit" circle size="mini" @click="editBlog(scope.row)" />
              </el-tooltip>
            </el-col>
            <el-col :span="12" :pull="1">
              <el-tooltip class="item" effect="dark" content="删除" placement="top">
                <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="deleteBlog(scope.row)" />
              </el-tooltip>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <div class="pager-container">
      <pagination-bar :total="total" :current-page="currentPage" :page-size="pageSize" @change="handlePageChange" />
    </div>
  </div>
</template>

<script>
import { getBlog, deleteBlog } from '@/api/blog.js'
import { formatDate } from '@/utils/tools'
import PaginationBar from '@/components/PaginationBar/index.vue'
import { FRONT_END_URL } from '@/urlConfig'

export default {
  components: {
    PaginationBar
  },
  data() {
    return {
      data: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
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
      getBlog(this.currentPage, this.pageSize).then(resp => {
        this.data = resp.data.rows.map(item => ({
          ...item,
          createDate: formatDate(item.createDate)
        }))
        this.total = resp.data.total
        this.srcList = this.data.map(item => item.thumb)
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
      this.fetchData()
    },
    goToTitleHandle(blogInfo) {
      window.open(`${FRONT_END_URL}/article/${blogInfo.id}`)
    },
    deleteBlog(blogInfo) {
      this.$confirm('删除该文章将一并删除评论', '是否删除此文章', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBlog(blogInfo.id).then(() => {
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
    editBlog(blogInfo) {
      this.$router.push(`/editBlog/${blogInfo.id}`)
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
