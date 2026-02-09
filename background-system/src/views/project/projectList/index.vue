<template>
  <div>
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
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="项目名称"
        width="180"
      >
        <template slot-scope="scope">
          <a :href="scope.row.url" target="_blank" class="proName">{{ scope.row.name }}</a>
        </template>
      </el-table-column>
      <el-table-column
        label="项目描述"
      >
        <template slot-scope="scope">
          <pre>{{ scope.row.description.join(';\n') }}</pre>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="预览图"
        width="150"
      >
        <template slot-scope="scope">
          <el-image
            style="width: 120px"
            :src="scope.row.thumb"
            fit="contain"
            :preview-src-list="srcList"
          />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="140"
      >
        <template slot-scope="scope">
          <el-row>
            <el-col :span="8">
              <el-tooltip class="item" effect="dark" content="github" placement="top">
                <el-button type="info" icon="iconfont icon-github" circle size="mini" @click="toGithub(scope.row)" />
              </el-tooltip>
            </el-col>
            <el-col :span="8">
              <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                <el-button type="warning" icon="el-icon-edit" circle size="mini" @click="editProject(scope.row)" />
              </el-tooltip>
            </el-col>
            <el-col :span="8">
              <el-tooltip class="item" effect="dark" content="删除" placement="top">
                <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="deleteProject(scope.row)" />
              </el-tooltip>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑对话框 -->
    <el-dialog
      title="请编辑项目信息"
      :visible.sync="dialogFormVisible"
      fullscreen
    >
      <el-form :model="form">
        <el-form-item label="项目名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="项目描述（每项描述以英文分号分隔）">
          <el-input v-model="form.description" type="textarea" rows="8" resize="none" />
        </el-form-item>
        <el-form-item label="项目链接">
          <el-input v-model="form.url" />
        </el-form-item>
        <el-form-item label="源码(github)">
          <el-input v-model="form.github" />
        </el-form-item>
        <el-form-item label="预览图">
          <upload-img v-model="form.thumb" />
        </el-form-item>
        <el-form-item label="项目等级">
          <el-select v-model="form.order" placeholder="项目等级">
            <el-option label="1" value="1" />
            <el-option label="2" value="2" />
            <el-option label="3" value="3" />
            <el-option label="4" value="4" />
            <el-option label="5" value="5" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getProject, modifyProject, delProject } from '@/api/project'
import UploadImg from '@/components/UploadImg/index.vue'
export default {
  components: {
    UploadImg
  },
  data() {
    return {
      data: [],
      loading: false,
      srcList: [],
      dialogFormVisible: false,
      form: {
        name: '',
        description: '',
        url: '',
        github: '',
        thumb: '',
        order: 1
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.loading = true
      const resp = await getProject()
      this.loading = false
      this.data = resp.data
      this.data.forEach(item => {
        this.srcList.push(item.thumb)
      })
    },
    toGithub(projectInfo) {
      window.open(projectInfo.github)
    },
    editProject(projectInfo) {
      this.dialogFormVisible = true
      this.form = { ...projectInfo,
        description: projectInfo.description.join(';\n')
      }
    },
    deleteProject(projectInfo) {
      this.$confirm('是否删除此项目', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delProject(projectInfo.id).then(() => {
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
    confirmEdit() {
      const data = {
        ...this.form,
        description: this.form.description.split(';\n'), // 转回数组
        order: parseInt(this.form.order)
      }
      modifyProject(data.id, data).then(() => {
        this.dialogFormVisible = false
        this.fetchData()
        this.$message.success('修改成功')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.proName:hover{
  color:rgb(163,163,163)
}
</style>
