<template>
  <div class="app-container">
    <div class="block"><h2>网站信息</h2></div>
    <div class="block">网站标题</div>
    <div style="width: 500px;">
      <el-input v-model="personalSetting.siteTitle" placeholder="请输入网站标题" disabled />
    </div>
    <div class="block">邮箱</div>
    <div style="width: 500px;">
      <el-input v-model="personalSetting.mail" placeholder="请输入邮箱地址" disabled />
    </div>
    <div class="block">备案号</div>
    <div style="width: 500px;">
      <el-input v-model="personalSetting.icp" placeholder="请输入备案号" disabled />
    </div>
    <el-divider />
    <div class="block"><h2>个人头像</h2></div>
    <div>
      <el-image style="width: 100px;height: 100px;" :src="personalSetting.avatar" />
    </div>
    <el-divider />
    <div class="block"><h2>网站图标信息</h2></div>
    <div class="block">网站图标地址</div>
    <div>
      <el-input v-model="personalSetting.favicon" placeholder="请输入图片地址" disabled />
    </div>
    <div class="block">网站图标预览</div>
    <div>
      <el-image style="width: 50px;height: 50px;" :src="personalSetting.favicon" />
    </div>
    <el-divider />
    <div class="block"><h2>github 信息</h2></div>
    <div class="block">github 昵称</div>
    <div style="width: 500px;">
      <el-input v-model="personalSetting.githubName" placeholder="请输入github昵称 " disabled />
    </div>
    <div class="block">github 地址</div>
    <div style="width: 500px;">
      <el-input v-model="personalSetting.github" placeholder="请输入github地址 " disabled />
    </div>
    <el-divider />
    <div class="block"><h2>QQ 信息</h2></div>
    <div class="block">QQ 号码</div>
    <div style="width: 500px;">
      <el-input v-model="personalSetting.qq" placeholder="请输入QQ号码 " disabled />
    </div>
    <div class="block">QQ 二维码</div>
    <div>
      <el-image style="width: 100px;height: 100px;" :src="personalSetting.qqQrCode" />
    </div>
    <el-divider />
    <div class="block"><h2>微信信息</h2></div>
    <div class="block">微信号</div>
    <div style="width: 500px;">
      <el-input v-model="personalSetting.weixin" placeholder="请输入微信号码 " disabled />
    </div>
    <div class="block">微信二维码</div>
    <div>
      <el-image style="width: 100px;height: 100px;" :src="form.weixinQrCode" />
    </div>
    <el-divider />
    <el-button type="primary" @click="dialogFormVisible=true">进入编辑模式</el-button>
    <!-- 编辑 -->
    <el-dialog title="请编辑信息" :visible.sync="dialogFormVisible" width="50%" top="0" :close-on-click-modal="false">
      <el-form :model="form">
        <el-form-item label="网站标题">
          <el-input v-model="form.siteTitle" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.mail" />
        </el-form-item>
        <el-form-item label="备案号">
          <el-input v-model="form.icp" />
        </el-form-item>
        <el-form-item label="个人头像">
          <upload-img v-model="form.avatar" />
        </el-form-item>
        <el-form-item label="网站图标地址">
          <el-input v-model="form.favicon" />
        </el-form-item>
        <el-form-item label="github 昵称">
          <el-input v-model="form.githubName" />
        </el-form-item>
        <el-form-item label="github 地址">
          <el-input v-model="form.github" />
        </el-form-item>
        <el-form-item label="QQ 号码">
          <el-input v-model="form.qq" />
        </el-form-item>
        <el-form-item label="QQ 二维码">
          <upload-img v-model="form.qqQrCode" />
        </el-form-item>
        <el-form-item label="微信号">
          <el-input v-model="form.weixin" />
        </el-form-item>
        <el-form-item label="微信二维码">
          <upload-img v-model="form.weixinQrCode" />
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="confirmEditSetting">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import UploadImg from '@/components/UploadImg/index.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    UploadImg
  },
  data() {
    return {
      form: {
        avatar: '',
        favicon: '',
        github: '',
        githubName: '',
        icp: '',
        id: '',
        mail: '',
        qq: '',
        qqQrCode: '',
        siteTitle: '',
        weixin: '',
        weixinQrCode: ''
      },
      dialogFormVisible: false
    }
  },
  computed: {
    ...mapGetters(['personalSetting'])
  },
  watch: {
    personalSetting: {
      immediate: true,
      handler(val) {
        if (val) {
          this.form = { ...val }
        }
      }
    }
  },
  methods: {
    processData() {
      this.form = { ...this.personalSetting }
    },
    confirmEditSetting() {
      this.$store.dispatch('settings/updateSetting', this.form).then(() => {
        this.dialogFormVisible = false
        this.$message.success('修改成功')
      }).catch(() => {
        this.$message.error('修改失败')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.block{
    margin: 15px 0;
}
</style>
