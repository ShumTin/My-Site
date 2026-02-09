<template>
  <div>
    <div class="title">{{ uploadTitle }}</div>
    <el-upload
      class="avatar-uploader"
      action="/api/upload"
      :headers="headers"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeUpload"
    >
      <img v-if="value" :src="value" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon" />
    </el-upload>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
export default {
  props: {
    uploadTitle: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    maxSize: {
      type: Number,
      default: 2 // 默认 2MB
    }
  },
  computed: {
    headers() {
      return {
        Authorization: 'Bearer ' + getToken()
      }
    }
  },
  methods: {
    handleAvatarSuccess(resp) {
      if (!resp.code && resp.data) {
        // 上传成功，并且返回了上传后的服务器地址
        this.$emit('input', resp.data)
      } else if (resp.code === 413) {
        this.$message({
          message: '文件大小超出限制',
          type: 'error'
        })
      }
    },
    beforeUpload(file) {
      const isLtMax = file.size / 1024 / 1024 < this.maxSize
      if (!isLtMax) {
        this.$message.error(`图片大小不能超过 ${this.maxSize}MB`)
      }
      return isLtMax
    }
  }
}
</script>

<style lang="scss" scoped>
.title{
    margin: 15px 0;
    font-weight: 500;
}
.avatar-uploader .el-upload {
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
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
