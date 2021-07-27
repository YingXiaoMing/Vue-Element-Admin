<template>
  <div>
    <!-- 多图片上传 -->
    <el-upload
      :action="action"
      :on-remove="handleRemove"
      :on-preview="handlePictureCardPreview"
      :file-list="fileList"
      :on-success="handleSuccessUpload"
      multiple
      :limit="5"
      list-type="picture-card"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" :modal="false">
      <img width="100%" class="previewImg" :src="dialogImageUrl" alt="预览图片">
    </el-dialog>
  </div>
</template>
<script>
import * as env from '@/utils/env'
export default {
  name: 'CustomElementUploadImgNew',
  props: {
    action: {
      type: String,
      // default: `${env.VUE_APP_ADMIN_API}api/file/UploadingStream`
      default: env.VUE_APP_ADMIN_API + 'api/file/UploadingStream'
    },
    fileList: {
      type: Array,
      default: () => [{ url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }]
    },
    ckey: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      defaultConfig: {
        name: '',
        tips: '只能上传PNG,JPEG格式的文件，且不能超过500kb',
        accept: 'image/png,image/jpeg',
        maxSize: 500 * 1000
      },
      dialogImageUrl: '', // 预览图片
      dialogVisible: false, // 展示弹窗开关
      uploadList: [] // 上传图片列表
    }
  },
  created() {
    console.log(this.action)
  },
  methods: {
    beforeUpload(file) {
      if (this.defaultConfig.accept.indexOf(file.type) == -1 ||
            file.size > this.defaultConfig.maxSize) {
        Message({ type: 'error', message: this.tips })
        return false
      }
      return true
    },
    handleRemove(file, fileList) {
      console.log(file)
      this.uploadList = fileList
      this.$emit('imgUpload', this.ckey, this.uploadList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleSuccessUpload(res, file, fileList) {
      fileList.forEach(item => {
        if (item.uid === file.uid) {
          item.imgId = res.data[0]
        }
      })
      if (res.code == 1) {
        this.uploadList = fileList
        this.$emit('imgUpload', this.ckey, fileList)
      }
    }
  }
}
</script>
<style scoped>
.previewImg {
    height: 650px;
}
</style>

