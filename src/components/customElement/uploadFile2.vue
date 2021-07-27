
<template>
  <el-upload
    ref="upload"
    :multiple="multiple"
    :data="data"
    :action="action"
    :headers="defaultConfig.headers"
    :name="defaultConfig.name"
    :accept="defaultConfig.accept"
    :limit="allowCount"
    :before-upload="beforUpload"
    :http-request="upload"
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
import request from '@/utils/request'
import axios from 'axios'
import * as env from '@/utils/env'

export default {
  name: 'CustomElementUploadFile2',
  props: {
    id: {
      type: String,
      default: function() {
        return (
          'customElement_uploadFile2_' +
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
    upload(options) {
      // let { uploadFiles } = this.$refs.upload;
      // console.log('uploadFiles',uploadFiles)

      const file = options.file
      // let filename = options.filename
      if (file) {
        const filename = file.name
        let fname = ''
        if (filename.length > 0) {
          fname = filename.split('.')[0]
        }

        let duration = 0
        if (file.type.indexOf('video') > -1) {
          // 获取视频时长
          var url = URL.createObjectURL(file)
          var audioElement = new Audio(url)
          audioElement.addEventListener('loadedmetadata', function(_event) {
            duration = audioElement.duration // 时长为秒，小数，182.36
            // console.log('播放时长：',parseInt(duration));
          })
        }

        let base64Str = ''
        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          base64Str = reader.result
          if (base64Str !== '') {
            const blob = this.dataURItoBlob(base64Str)
            // 前端上传，服务器后台获取相应值
            request.get('/file/getosspostparam').then(res => {
              // console.log('getosspostparam',res)
              if (res.success) {
                const key = `YKTFT/${res.result.currentDate}/${
                  res.result.guid
                }${this.getSuffix(filename)}`
                const OSSAccessKeyId = res.result.ossAccessKeyId
                const policy = res.result.encodedPolicy
                const Signature = res.result.signature
                var formData = new FormData()
                // 注意formData里append添加的键的大小写
                formData.append('key', key) // 存储在oss的文件路径
                formData.append('OSSAccessKeyId', OSSAccessKeyId) // accessKeyId
                formData.append('policy', policy) // policy
                formData.append('Signature', Signature) // 签名
                // 如果是base64文件，那么直接把base64字符串转成blob对象进行上传就可以了
                formData.append('file', blob)
                formData.append('success_action_status', 200) // 成功后返回的操作码

                // 前端上传
                var url = res.result.ossUrl
                var fileUrl = `${url}${key}`
                axios({
                  method: 'post',
                  url: 'https://ossfile.yikuaiting.com',
                  data: formData
                })
                  .then(response => {
                    // console.log('fileUrl',fileUrl);
                    const res = {
                      result: fileUrl,
                      success: true,
                      name: fname,
                      duration: parseInt(duration)
                    }
                    this.$emit('onUploadSuccess', this.ckey, res, file, '')
                  })
                  .catch(error => {
                    // console.log(error);
                  })
              }
            })
          }
        }
      }
    },
    // 获取文件后缀包含.
    getSuffix(fileName) {
      var pos = fileName.lastIndexOf('.')
      var suffix = ''
      if (pos != -1) {
        suffix = fileName.substring(pos)
      }
      return suffix
    },
    // base64转成bolb对象
    dataURItoBlob(base64Data) {
      let byteString
      if (base64Data.split(',')[0].indexOf('base64') >= 0) {
        byteString = atob(base64Data.split(',')[1])
      } else {
        byteString = unescape(base64Data.split(',')[1])
      }
      const mimeString = base64Data
        .split(',')[0]
        .split(':')[1]
        .split(';')[0]
      const ia = new Uint8Array(byteString.length)
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
      }
      return new Blob([ia], { type: mimeString })
    },
    beforUpload(file) {
      if (
        this.defaultConfig.accept &&
        (this.defaultConfig.accept.indexOf(file.type) == -1 ||
          file.size > this.defaultConfig.maxSize)
      ) {
        Message({ type: 'error', message: this.tips })
        return false
      }

      // var fileName = file.name || "";
      // var ext = fileName.split(".")[fileName.split(".").length - 1];
      // console.log('上传文件后缀名称：',ext);

      // if (ext == "mp4") {
      //   // 获取视频时长
      //   var url = URL.createObjectURL(file);
      //   var audioElement = new Audio(url);
      //   var duration;
      //   audioElement.addEventListener("loadedmetadata", function(_event) {
      //     duration = audioElement.duration; //时长为秒，小数，182.36
      //     console.log('播放时长：',parseInt(duration));
      //   });
      // }

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
