<template>
  <div class="app-container">
    <!-- 添加分类 -->
    <el-input v-model="input" placeholder="请输入要添加的分类，并选择分类等级" class="input-with-select">
      <el-select slot="prepend" v-model="select" placeholder="请选择">
        <el-option label="1级" value="1" />
        <el-option label="2级" value="2" />
        <el-option label="3级" value="3" />
        <el-option label="4级" value="4" />
        <el-option label="5级" value="5" />
      </el-select>
      <el-button slot="append" @click="addBlogTypeHandle">添加</el-button>
    </el-input>
    <!-- 表格 -->
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
        width="80"
      >
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="博客类别"
        min-width="400"
      >
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="文章数量"
        width="160"
      >
        <template slot-scope="scope">
          {{ scope.row.articleCount }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="200"
      >
        <template slot-scope="scope">
          <el-row>
            <el-col :span="12" :push="2">
              <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                <el-button type="warning" icon="el-icon-edit" circle size="mini" @click="editBlogTypeInfo(scope.row)" />
              </el-tooltip>
            </el-col>
            <el-col :span="12" :pull="2">
              <el-tooltip class="item" effect="dark" content="删除" placement="top">
                <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="deleteBlogType(scope.row)" />
              </el-tooltip>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑文章分类 -->
    <el-dialog title="编辑文章分类" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分类名称">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="排序等级">
          <el-select v-model="form.order" placeholder="分类等级">
            <el-option label="1级" value="1" />
            <el-option label="2级" value="2" />
            <el-option label="3级" value="3" />
            <el-option label="4级" value="4" />
            <el-option label="5级" value="5" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEditBlogType">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getBlogType, addBlogType, delBlogType, updateBlogType, findOneBlogType } from '@/api/blogType'
export default {
  data() {
    return {
      loading: false,
      data: [],
      input: '',
      select: '1',
      dialogFormVisible: false,
      form: {
        name: '',
        order: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      getBlogType().then(resp => {
        this.data = resp.data
      }).finally(() => {
        this.loading = false
      })
    },
    addBlogTypeHandle() {
      if (this.input) {
        addBlogType({ name: this.input, order: this.select }).then(() => {
          this.fetchData()
          this.$message.success('添加成功')
        })
      } else {
        this.$message.error('分类名称不能为空')
      }
    },
    deleteBlogType(editInfo) {
      this.$confirm('删除该分类后，该分类下的所有文章将变为未分类状态', '是否删除该分类', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delBlogType(editInfo.id).then(() => {
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
    editBlogTypeInfo(blogTypeInfo) {
      findOneBlogType(blogTypeInfo.id).then(resp => {
        this.form = resp.data
        this.dialogFormVisible = true
      })
    },
    confirmEditBlogType(editInfo) {
      updateBlogType({
        id: this.form.id,
        data: this.form
      }).then(resp => {
        this.fetchData()
        this.$message.success('编辑成功')
        this.dialogFormVisible = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-select .el-input {
  width: 90px;
}
.input-with-select{
  margin-bottom: 20px;
  width: 500px;
  .el-input-group__prepend {
    background-color: #fff;
  }
}
</style>
