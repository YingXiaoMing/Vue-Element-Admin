import * as local from '@/utils/local'
import fileService from '../../services/file'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async download(cxt, params) {
      const res = await fileService.download(params)
      const file = res
      const filename = params.filename

      let blob = null
      const type = 'application/octet-binary'
      if (typeof (window.Blob) == 'function') {
        blob = new Blob([file], {
          type: type
        })
      } else {
        const blobBuilder = window.BlobBuilder || window.MozBlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder
        blob = new blobBuilder().append([file]).getBolb(type)
      }

      const URL = window.URL || window.webkitURL
      const blobUrl = URL.createObjectURL(blob)
      const el = document.createElement('a')
      if ('download' in el) {
        el.style.visibility = 'hidden'
        el.href = blobUrl
        el.download = filename
        document.body.appendChild(el)
        const evt = document.createEvent('MouseEvents')
        evt.initEvent('click', true, true)
        el.dispatchEvent(evt)
        document.body.removeChild(el)
      } else if (navigator.msSaveBlob) {
        navigator.msSaveBlob(blob, filename)
      } else {
        location.href = blobUrl
      }
    },
    async delete(cxt, params) {
      const res = await fileService.delete(params)
      return res
    }
  }
}
