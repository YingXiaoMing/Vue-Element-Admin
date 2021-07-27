
<template>
  <el-upload
    :multiple="multiple"
    :data="data"
    :action="action"
    :headers="defaultConfig.headers"
    :name="defaultConfig.name"
    :accept="defaultConfig.accept"
    :limit="allowCount"
    :before-upload="beforUpload"
    :on-success="onUploadSuccess"
    :on-error="onUploadError"
    :on-preview="onUploadPreview"
    :on-remove="onUploadRemove"
    :on-exceed="onExceed"
    :file-list="fileList"
    list-type="text"
  >
    <el-button size="small" type="primary">选择文件</el-button>
    <div slot="tip" class="el-upload__tip">{{ defaultConfig.tips }}</div>
  </el-upload>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { Message } from 'element-ui'
import * as local from '@/utils/local'
import * as env from '@/utils/env'

export default {
  name: 'CustomElementUploadFile',
  props: {
    id: {
      type: String,
      default: function() {
        return (
          'customElement_uploadFile_' +
          +new Date() +
          ((Math.random() * 1000).toFixed(0) + '')
        )
      }
    },
    ckey: { type: String, default: () => '' },
    action: {
      type: String,
      default: () => env.VUE_APP_ADMIN_API + '/file/uploadfile'
    },
    multiple: { type: Boolean, default: () => false },
    files: { type: Array, default: () => [] },
    allowCount: { type: Number, default: () => 1 },
    data: {
      type: Object,
      default: () => {
        return {
          useFilename: false,
          folder: ''
        }
      }
    }
  },
  data() {
    return {
      // 图文、图片=2M，支持bmp/png/jpeg/jpg/gif格式、语音=2M，播放长度不超过60s，mp3/wma/wav/amr格式、视频=10MB，支持MP4格式
      defaultConfig: {
        name: '',
        tips: '文件大小不超过200M',
        headers: {
          Authorization: `bearer ${local.get('auth_token')}`
        },
        // accept: "image/png,image/jpeg",
        maxSize: 10 * 1000 * 1000
      }
    }
  },
  computed: {
    fileList() {
      this.files.forEach(file => {
        file.url = env.VUE_APP_ADMIN_API + file.url
      })
      return this.files
    }
  },
  watch: {},
  methods: {
    ...mapActions({
      deleteFile: 'file/delete'
    }),
    beforUpload(file) {
      if (
        this.defaultConfig.accept &&
        (this.defaultConfig.accept.indexOf(file.type) == -1 ||
          file.size > this.defaultConfig.maxSize)
      ) {
        Message({ type: 'error', message: this.tips })
        return false
      }
      this.$emit('beforUpload', this.ckey, file)
    },
    onUploadSuccess(res, file, files) {
      if (res.error) {
        Message({
          type: 'error',
          message:
            res.error.detail || res.error.message || '文件上传过程中出现错误'
        })
        return false
      }
      this.$emit('onUploadSuccess', this.ckey, res, file, files)
    },
    onUploadPreview(res) {
      this.$emit('onUploadPreview', this.ckey, res)
    },
    onUploadRemove(file, files) {
      const filePath = file.response
        ? file.response.result
        : file.url.replace(env.VUE_APP_ADMIN_API, '')
      this.deleteFile({ filePath: filePath })
      this.$emit('onUploadRemove', this.ckey)
    },
    onUploadError(err, file, files) {
      Message({ type: 'error', message: '文件上传过程中出现错误' })
      this.$emit('onUploadError', this.ckey, err, file, files)
    },
    onExceed(err, file, files) {
      Message({
        type: 'error',
        message: `文件上传数量超出限制，只能上传${this.allowCount}个文件`
      })
      this.$emit('onExceed', this.ckey, err, file, files)
    }
  }
}
</script>
