<template>
  <div class="app-container">
    <el-table
      v-loading="loading"
      border
      :data="data"
      style="width: 100%"
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
        label="标题"
        width="180"
      >
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column
        label="描述"
      >
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="中图预览"
        width="180"
      >
        <template slot-scope="scope">
          <el-image
            style="height: 120px;"
            :src="scope.row.midImg"
          />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="大图预览"
        width="180"
      >
        <template slot-scope="scope">
          <el-image
            style="height: 120px;"
            :src="scope.row.bigImg"
          />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
            <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="editBannerHandle(scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="请编辑信息" :visible.sync="dialogFormVisible" width="35%" top="10vh">
      <el-form :model="form">
        <el-form-item label="标题">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description" type="textarea" resize="none" rows="4" />
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="首页中图">
              <UploadImg v-model="form.midImg" />
            </el-form-item></el-col>
          <el-col :span="12">
            <el-form-item label="首页大图">
              <UploadImg v-model="form.bigImg" />
            </el-form-item></el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editBannerConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBanner, setBanner } from '@/api/banner'
import UploadImg from '@/components/UploadImg/index.vue'

export default {
  components: {
    UploadImg
  },
  data() {
    return {
      data: [],
      dialogFormVisible: false, // 编辑对话框是否显示
      form: {
        id: '',
        midImg: '',
        bigImg: '',
        title: '',
        description: ''
      },
      loading: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      getBanner().then(resp => {
        this.data = resp.data
      }).finally(() => {
        this.loading = false
      })
    },
    editBannerHandle(bannerInfo) {
      this.form = { ...bannerInfo }
      this.dialogFormVisible = true
    },
    editBannerConfirm() {
      // api文档要求所有标语一起发送
      const arr = [...this.data]
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === this.form.id) {
          arr[i] = this.form
        }
      }
      setBanner(arr).then(() => {
        this.dialogFormVisible = false
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.fetchData()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
