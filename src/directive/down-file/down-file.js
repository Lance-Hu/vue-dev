// 下载文件
// v-down-file="{
//     httpUrl: '/hd-api/br/glr/wsManager/flws/downloadFjxx',
//     httpData: { fjid: material.clfjid }
// }"

// 务必添加此css
// ::v-deep {
//     .down-file-disabled {
//       pointer-events: none;
//     }
//     .down-file-not-support {
//       pointer-events: none;
//     }
// }

import axios from 'axios'
import { saveAs } from 'file-saver'
import { Message } from 'element-ui'
import qs from 'qs'
const ctx = '@@download'
export default {
  bind: (el, binding) => {
    el[ctx] = binding.value
    let isFileSaverSupported = false
    try {
      isFileSaverSupported = !!new Blob()
    } catch (err) {
      console.log(err)
    }
    if (!isFileSaverSupported) {
      el.classList.add(`down-file-not-support`)
    }

    el.addEventListener(
      'click',
      ev => {
        _click(ev)
      },
      false
    )

    const _click = ev => {
      if (!isFileSaverSupported) {
        ev.stopPropagation()
        ev.preventDefault()
        return
      }
      setDisabled(true)
      const obj = el[ctx]
      // 自定义token
      const token = sessionStorage.getItem('token')
      const config = {
        url: obj.httpUrl,
        method: obj.httpMethod || 'get',
        params: obj.httpData || {},
        responseType: 'blob',
        data: obj.httpBody,
        headers: { Authorization: 'Bearer ' + token || '' }
      }
      if (config.params && config.params.exportCols) {
        config.paramsSerializer = function(params) {
          return qs.stringify(params, {
            arrayFormat: 'indices',
            allowDots: true
          })
        }
      }
      axios
        .request(config)
        .then(res => {
          if (res.status !== 200 || res.data.size <= 0) {
            Message.error('下载失败')
            return
          }
          if (res.data.type === 'text/plain') {
            const reader = new FileReader()
            reader.onload = function() {
              const err = JSON.parse(reader.result)
              Message.warning(err.errMsg)
            }
            reader.readAsText(res.data)
            return
          }

          const disposition = getDisposition(
            res.headers['content-disposition']
          )
          let fileName = obj.fileName
          if (typeof fileName === 'function') fileName = fileName(res)
          fileName =
            fileName ||
            disposition[`filename*`] ||
            disposition[`filename`] ||
            res.headers['filename'] ||
            res.headers['x-filename']
          saveAs(res.data, fileName)
          Message.success('下载成功')
        })
        .catch((err) => {
          Message.error('下载失败')
          console.log(err)
        })
        .finally(() => setDisabled(false))
    }

    const getDisposition = data => {
      const arr = (data || '')
        .split(';')
        .filter(i => i.includes('='))
        .map(v => {
          const strArr = v.split('=')
          const utfId = `UTF-8''`
          let value = strArr[1]
          if (value.startsWith(utfId)) value = value.substr(utfId.length)
          return { [strArr[0].trim()]: value }
        })
      return arr.reduce((_o, item) => item, {})
    }

    const setDisabled = status => {
      el.disabled = status
      el.classList[status ? 'add' : 'remove'](`down-file-disabled`)
    }
  },
  update(el, binding) {
    if (binding.value !== binding.oldValue) {
      el[ctx] = binding.value
    }
  }
}
