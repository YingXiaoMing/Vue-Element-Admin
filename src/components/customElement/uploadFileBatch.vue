<template>
  <el-upload
    ref="upload"
    action="#"
    :auto-upload="false"
    :http-request="uploadFile"
    :multiple="multiple"
    :headers="defaultConfig.headers"
    :name="defaultConfig.name"
    :accept="defaultConfig.accept"
    :limit="allowCount"
    :on-preview="onUploadPreview"
    :on-remove="onUploadRemove"
    :on-success="handleSucess"
    :on-change="onChange"
    :file-list="fileList"
  >
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器 [{{ waitUploadCount }}/{{ waitUploadTotal }}]</el-button>
    <!-- <el-tag v-show="uploadLogo=='1'" >上传中</el-tag>
        <el-tag v-show="uploadLogo=='2'" type="success">上传成功</el-tag>
        <el-tag v-show="uploadLogo=='3'" type="danger">上传失败</el-tag> -->
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
  name: 'CustomElementUploadFileBatch',
  props: {
    id: {
      type: String,
      default: function() {
        return (
          'customElement_uploadFileBatch_' +
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
        maxSize: 100 * 1000 * 1000
      },
      waitUploadTotal: 0,
      waitUploadCount: 0
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
    onUploadPreview(res) {
      this.$emit('onUploadPreview', this.ckey, res)
    },
    onUploadRemove(file, files) {
      // let filePath = file.response
      // ? file.response.result
      // : file.url.replace(env.VUE_APP_ADMIN_API, "");
      // this.deleteFile({ filePath: filePath });
      // this.$emit("onUploadRemove", this.ckey);
    },
    onChange(file, files) {
      this.waitUploadTotal = files.length
      this.waitUploadCount = files.length
    },
    uploadFile(file) {
      // this.fileData.append('file', file.file);
    },
    submitUpload() {
      const { uploadFiles } = this.$refs.upload
      if (uploadFiles.length <= 0) {
        Message({ type: 'error', message: '请选择需要上传的文件！' })
        return false
      }

      this.realUpload(uploadFiles)
    },
    async realUpload(uploadFiles) {
      this.waitUploadCount = uploadFiles ? uploadFiles.length : 0
      if (!uploadFiles || uploadFiles.length <= 0) return
      const file = uploadFiles[0].raw

      let fname, fext
      if (file.name.length > 0) {
        var fileIndex = file.name.lastIndexOf('.')
        fname = file.name.substring(0, fileIndex)
        fext = file.name.substring(fileIndex, file.name.length)

        // console.log('fname',fname)
        // console.log('fext',fext)

        // let filenameArr = file.name.split(".");
        // fname = filenameArr && filenameArr.length > 0 ? filenameArr[0] : "";
        // fext =  filenameArr && filenameArr.length >= 1 ? `.${filenameArr[1]}` : "";
      }

      // 获取视频时长
      this.getVideoSeconds(file, duration => {
        // 上传文件
        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          if (!reader.result) {
            this.realUpload(uploadFiles.slice(1))
          } else {
            const requestUrl = '/file/getosspostparam?t=' + new Date().getTime()
            request.get(requestUrl, '', 'application/json', 20000).then(res => {
              if (!res.success) {
                this.realUpload(uploadFiles.slice(1))
              } else {
                const key = `YKTFT/${res.result.currentDate}/${
                  res.result.guid
                }${fext}`

                // 注意formData里append添加的键的大小写
                var formData = new FormData()
                formData.append('key', key) // 存储在oss的文件路径
                formData.append('OSSAccessKeyId', res.result.ossAccessKeyId) // accessKeyId
                formData.append('policy', res.result.encodedPolicy) // policy
                formData.append('Signature', res.result.signature) // 签名
                // 如果是base64文件，那么直接把base64字符串转成blob对象进行上传就可以了
                formData.append('file', this.dataURItoBlob(reader.result))
                formData.append('success_action_status', 200) // 成功后返回的操作码

                // 前端上传
                axios({
                  url: 'https://ossfile.yikuaiting.com',
                  data: formData,
                  method: 'post'
                })
                  .then(response => {
                    const _res = {
                      result: `${res.result.ossUrl}${key}`,
                      success: true,
                      name: fname,
                      duration: parseInt(duration)
                    }
                    this.$emit(
                      'onBatchUploadSuccess',
                      this.ckey,
                      _res,
                      file,
                      ''
                    )
                    this.realUpload(uploadFiles.slice(1))
                  })
                  .catch(error => {
                    console.log(error)
                    this.realUpload(uploadFiles.slice(1))
                  })
              }
            })
          }
        }
      })
    },
    handleSucess() {},
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
    // 获取视频时长
    getVideoSeconds(file, callback) {
      if (file.type.indexOf('video') <= -1) {
        callback && callback(0)
      }

      var url = URL.createObjectURL(file)
      var audioElement = new Audio(url)
      audioElement.addEventListener('loadedmetadata', _event => {
        callback && callback(audioElement.duration) // 时长为秒，小数，182.36
      })
    }
  }
}
</script>
