
<template>
  <el-upload
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
    list-type="picture"
  >
    <el-button size="small" type="primary">选择图片</el-button>
    <div slot="tip" class="el-upload__tip">{{ defaultConfig.tips }}</div>
  </el-upload>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { Message } from 'element-ui'
import * as local from '@/utils/local'
import * as env from '@/utils/env'

export default {
  name: 'CustomElementUploadImg',
  props: {
    id: {
      type: String,
      default: function() {
        return (
          'customElement_uploadImg_' +
          +new Date() +
          ((Math.random() * 1000).toFixed(0) + '')
        )
      }
    },
    ckey: { type: String, default: () => '' },
    action: {
      type: String,
      default: () => env.VUE_APP_ADMIN_API + '/file/uploadimg'
    },
    files: { type: Array, default: () => [] },
    allowCount: { type: Number, default: () => 1 }
  },
  data() {
    return {
      defaultConfig: {
        name: '',
        tips: '只能上传png文件，且不超过500kb',
        headers: {
          Authorization: `bearer ${local.get('auth_token')}`
        },
        accept: 'image/png,image/jpeg',
        maxSize: 500 * 1000
      }
    }
  },
  computed: {
    fileList() {
      const path = this.action.replace('/file/uploadimg', '')
      this.files.forEach(file => {
        if (!file.url.includes('http')) {
          file.url = path + file.url
        }
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
      // return ;
      if (
        this.defaultConfig.accept.indexOf(file.type) == -1 ||
        file.size > this.defaultConfig.maxSize
      ) {
        console.log('msg', this.tips)
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
            res.error.detail || res.error.message || '图片上传过程中出现错误'
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
        ? file.response.result.thumbnailFilePath
        : file.url.replace(env.VUE_APP_ADMIN_API, '')
      this.deleteFile({ filePath: filePath })
      this.$emit('onUploadRemove', this.ckey)
    },
    onUploadError(err, file, files) {
      Message({ type: 'error', message: '图片上传过程中出现错误' })
      this.$emit('onUploadError', this.ckey, err, file, files)
    },
    onExceed(err, file, files) {
      Message({
        type: 'error',
        message: `图片上传数量超出限制，只能上传${this.allowCount}张图片`
      })
      this.$emit('onExceed', this.ckey, err, file, files)
    }
  }
}
</script>
