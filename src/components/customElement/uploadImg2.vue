<template>
  <div>
    <!-- 多图片上传 -->
    <el-upload
      v-if="multiple"
      action="string"
      list-type="picture-card"
      accept="image/*"
      :on-preview="handlePreview"
      :auto-upload="false"
      :on-remove="handleRemove"
      :http-request="upload"
      :on-change="consoleFL"
      :file-list="uploadList"
      :limit="allowCount"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <!-- 多图片预览弹窗 -->
    <el-dialog :visible.sync="dialogVisible" style="text-align: center">
      <img :src="dialogImageUrl" alt="">
    </el-dialog>
    <!-- 剪裁组件弹窗 -->
    <el-dialog :visible.sync="cropperModel" width="1100px" :before-close="beforeClose" custom-class="vueCropper_dialog">
      <Cropper ref="vueCropper" :img-file="file" :fixed-number="fixedNumber" :fixed="fixed" @upload="upload" />
    </el-dialog>
  </div>
</template>
<script>
import Cropper from './cropper'
import { stringify } from 'querystring'
import * as local from '@/utils/local'
import request from '@/utils/request'
import axios from 'axios'
import { setTimeout } from 'timers'
import * as env from '@/utils/env'

export default {
  name: 'Uploader',
  components: {
    Cropper
  },
  props: {
    targetUrl: {
      // 上传地址
      type: String,
      default: `${env.VUE_APP_ADMIN_API}/file/uploadimgoss`
    },
    initUrl: {
      // 初始图片链接
      default: ''
    },
    fixedNumber: {
      // 剪裁框比例设置
      default: function() {
        return [1, 1]
      }
    },
    fixed: {
      type: Boolean,
      default: true // 框是否可以自由拖动大小
    },
    width: {
      // 单图剪裁框宽度
      type: Number,
      default: 178
    },
    height: {
      // 单图剪裁框高度
      type: Number,
      default: 178
    },
    allowCount: { type: Number, default: () => 1 },
    ckey: { type: String, default: () => '' }
  },
  data() {
    return {
      multiple: true,
      file: '', // 当前被选择的图片文件
      imageUrl: '', // 单图情况框内图片链接
      dialogImageUrl: '', // 多图情况弹窗内图片链接
      uploadList: [], // 上传图片列表
      // reupload: true, // 控制"重新上传"开关
      dialogVisible: false, // 展示弹窗开关
      cropperModel: false, // 剪裁组件弹窗开关
      reuploadWidth: this.height * 0.7 // 动态改变”重新上传“大小
    }
  },
  watch: {
    initUrl: function(val) {
      // 监听传入初始化图片
      // console.log('监听传入初始化图片val',val)
      if (val) {
        this.uploadList = this.formatImgArr(val)
      }
    }
  },
  updated() {
    if (this.$refs.vueCropper) {
      this.$refs.vueCropper.Update()
    }
  },
  mounted() {
    this.uploadList = this.formatImgArr(this.initUrl)
  },
  methods: {
    /** **************************** multiple多图情况 **************************************/
    handlePreview(file) {
      // 点击进行图片展示
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove(file, fileList) {
      // 删除图片后更新图片文件列表并通知父级变化
      this.uploadList = fileList
      this.$emit('imgupload', this.ckey, this.uploadList)
    },
    consoleFL(file, fileList) {
      // 弹出剪裁框，将当前文件设置为文件
      this.cropperModel = true
      this.file = file

      // console.log('file',file)
    },
    /** **********************************************************************************/
    // 获取文件后缀包含.
    getSuffix(fileName) {
      var pos = fileName.lastIndexOf('.')
      var suffix = ''
      if (pos != -1) {
        suffix = fileName.substring(pos)
      }
      return suffix
    },
    async upload(data) {
      // console.log('data',data)
      // 自定义upload事件
      const img = new Image()
      img.src = data
      img.onload = async() => {
        const blob = this.dataURItoBlob(data)

        // 后台上传注释
        // let formData = new FormData();
        // formData.append('file', blob, this.file.name); // 有的后台需要传文件名，不然会报错
        // this.imgUpload(formData);

        // 前端上传，服务器后台获取相应值
        request.get('/file/getosspostparam').then(res => {
          // console.log('getosspostparam',res)
          if (res.success) {
            const key = `YKTFT/${res.result.currentDate}/${
              res.result.guid
            }${this.getSuffix(this.file.name)}`
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
                this.uploadList.push({
                  url: fileUrl,
                  name: ''
                })
                this.$emit('imgupload', this.ckey, this.uploadList) // 根据自己实际项目需要将照片返回给父组件
              })
              .catch(error => {
                // console.log(error);
                // 上传失败则显示上传失败，如多图则从图片列表删除图片
                this.uploadList.pop()
              })
            this.$refs.vueCropper.isDisabled = false
          }
        })
        setTimeout(() => {
          this.cropperModel = false
        }, 2000)
      }
    },
    // 后台上传
    async imgUpload(formData) {
      request
        .post('/file/uploadimgoss', formData, 'multipart/form-data')
        .then(res => {
          if (res.success) {
            // 上传成功将照片传回父组件
            const currentPic = res.result
            console.log('res.result', res.result)
            console.log('this.uploadList', this.uploadList)
            if (this.multiple) {
              this.uploadList.push({
                url: currentPic,
                name: '' // uid
              })
              this.$emit('imgupload', this.ckey, this.uploadList) // 根据自己实际项目需要将照片返回给父组件
            } else {
              // this.$emit('imgupload', currentPic);
            }
            this.$refs.vueCropper.isDisabled = false
          } else {
            // 上传失败则显示上传失败，如多图则从图片列表删除图片
            if (this.multiple) {
              this.uploadList.pop()
            }
            this.$refs.vueCropper.isDisabled = false
          }
        })

      this.cropperModel = false
    },
    formatImgArr(arr) {
      // console.log('arr',arr);
      const result = arr.map((item, index) => {
        return {
          url: item.url,
          name: `index${index}` // uid
        }
      })
      return result
    },
    beforeClose() {
      this.cropperModel = false
    },
    // 压缩图片
    compress(img) {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      // let initSize = img.src.length;
      const width = img.width
      const height = img.height
      canvas.width = width
      canvas.height = height
      // 铺底色
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, width, height)
      // 进行压缩
      const ndata = canvas.toDataURL('image/jpeg', 0.8)
      return ndata
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
    }
  }
}
</script>
<style>
/* .el-dialog__wrapper {
  z-index: 99999999 !important;
}
.el-select-dropdown {
  z-index: 999999999 !important;
} */

/*
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    color: #8c939d;
    text-align: center;
  }
  .avatar {
    display: block;
  }
  .reupload {
    border-radius: 50%;
    position: absolute;
    color: #fff;
    background-color: #000000;
    opacity: 0.6;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: none;
  }
  #uploadIcon{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: none;
  } */
</style>
