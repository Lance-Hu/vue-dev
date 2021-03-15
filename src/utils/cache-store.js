
const axios = require('axios')

if (!window._CACHE_STORE) {
  window._CACHE_STORE = (function() {
    var cache = {}
    var cacheArr = []
    return {
      get(fldm) {
        return new Promise((resolve) => {
          if (cache[fldm]) {
            resolve(cache[fldm])
          } else {
            if (cacheArr.length > 70) {
              const _fldm = cacheArr.shift()
              cache[_fldm] = undefined
            }
            resolve(this.set(fldm))
          }
        })
      },

      set(fldm) {
        return new Promise((resolve) => {
          axios.get('/core/auth/zdflmx/getDictItemsByFldm', {
            params: { fldm }
          }).then(res => {
            cacheArr.push(fldm)
            cache[fldm] = res.data
            resolve(res.data)
          })
        })
      }
    }
  })()
}
