<template>
  <div class="app-container">
    <div class="block">项目名称</div>
    <div style="margin-bottom: 30px;">
      <el-input v-model="form.name" placeholder="请输入项目名称" />
    </div>
    <div class="block">项目描述（每项描述以英文分号并换行分隔）"</div>
    <div style="margin-bottom: 30px;">
      <el-input v-model="form.description" type="textarea" rows="8" resize="none" placeholder="请输入项目描述" />
    </div>
    <div class="block">项目链接</div>
    <div style="margin-bottom: 30px;">
      <el-input v-model="form.url" placeholder="请输入项目链接" />
    </div>
    <div class="block">源码地址(github)</div>
    <div style="margin-bottom: 30px;">
      <el-input v-model="form.github" placeholder="请输入源码地址" />
    </div>
    <div style="margin-bottom: 30px;">
      <upload-img v-model="form.thumb" upload-title="项目预览图" />
    </div>
    <div class="block">项目等级</div>
    <div style="margin-bottom: 30px;">
      <el-select v-model="form.order" placeholder="选择项目等级">
        <el-option label="1" value="1" />
        <el-option label="2" value="2" />
        <el-option label="3" value="3" />
        <el-option label="4" value="4" />
        <el-option label="5" value="5" />
      </el-select>
    </div>
    <div class="block">
      <el-button type="primary" @click="handleSubmit">发布项目</el-button>
    </div>
  </div>
</template>

<script>
import UploadImg from '@/components/UploadImg/index.vue'
import { addProject } from '@/api/project'
export default {
  components: {
    UploadImg
  },
  data() {
    return {
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
  methods: {
    handleSubmit() {
      const data = {
        ...this.form,
        description: this.form.description.split(';\n'),
        order: parseInt(this.form.order)
      }
      addProject(data).then(() => {
        this.$router.push('/projectList')
        this.$message.success('发布成功')
      }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.block{
  margin: 15px 0;
  font-weight: 500;
}
</style>
