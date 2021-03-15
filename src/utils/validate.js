/* eslint-disable eqeqeq */
/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

export const validate = {
  // 公共方法去掉字符串头尾空格
  trim: str => {
    return str.replace(/(^\s*)|(\s*$)/g, '')
  },

  /**
   * 校验身份证号码
   * @param idCard 身份证号码
   * @return
   */
  idCardValidate: idCard => {
    if (idCard.length == 15) {
      return validate.isValidityBrithBy15idCard(idCard) // 进行15位身份证的校验
    } else if (idCard.length == 18) {
      const a_idCard = idCard.split('') // 得到身份证数组
      if (
        validate.isValidityBrithBy18idCard(idCard) &&
        validate.isTrueValidateCodeBy18idCard(a_idCard)
      ) {
        // 进行18位身份证的基本校验和第18位的校验
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  },

  /**
   * 判断身份证号码为18位时最后的校验位是否正确
   * @param a_idCard 身份证号码数组
   * @return
   */

  isTrueValidateCodeBy18idCard: a_idCard => {
    const Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1] // 加权因子
    const ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2] // 身份证校验位值.10代表X
    let sum = 0 // 声明加权求和变量
    if (a_idCard[17].toLowerCase() == 'x') {
      a_idCard[17] = 10 // 将最后位为x的校验码替换为10方便后续操作
    }
    for (let i = 0; i < 17; i++) {
      sum += Wi[i] * a_idCard[i] // 加权求和
    }
    const valCodePosition = sum % 11 // 得到校验码所位置
    if (a_idCard[17] == ValideCode[valCodePosition]) {
      return true
    } else {
      return false
    }
  },

  /**
   * 校验18位数身份证号码中的生日是否是有效生日
   * @param idCard 18位书身份证字符串
   * @return
   */

  isValidityBrithBy18idCard(idCard18) {
    const year = idCard18.substring(6, 10)
    const month = idCard18.substring(10, 12)
    const day = idCard18.substring(12, 14)
    const temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day))
    if (
      temp_date.getFullYear() != parseFloat(year) ||
      temp_date.getMonth() != parseFloat(month) - 1 ||
      temp_date.getDate() != parseFloat(day)
    ) {
      return false
    } else {
      return true
    }
  },

  /**
   * 校验15位数身份证号码中的生日是否是有效生日
   * @param idCard15 15位书身份证字符串
   * @return
   */
  isValidityBrithBy15idCard: idCard15 => {
    const year = idCard15.substring(6, 8)
    const month = idCard15.substring(8, 10)
    const day = idCard15.substring(10, 12)
    const temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day))
    // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
    if (
      temp_date.getYear() != parseFloat(year) ||
      temp_date.getMonth() != parseFloat(month) - 1 ||
      temp_date.getDate() != parseFloat(day)
    ) {
      return false
    } else {
      return true
    }
  },

  /**
   * 护照
   * @param idCard 护照
   * @return
   */
  passportValidate: idCard => {
    const a = /^[a-zA-Z0-9]{5,17}$/
    const c = /^[a-zA-Z]{5,17}$/
    idCard = validate.trim(idCard.replace(/ /g, '')) // 去掉字符串头尾空格
    if (a.test(idCard) || c.test(idCard)) {
      return true
    }
    return false
  },

  /**
   * 台湾来往内地通行证格式校验
   * @param idCard 台湾来往内地通行证
   * @return
   */
  taiwValidateL: idCard => {
    const a = /^[0-9]{8}$/
    const b = /^[0-9]{10}$/
    idCard = validate.trim(idCard.replace(/ /g, '')) // 去掉字符串头尾空格
    if (a.test(idCard) || b.test(idCard)) {
      return true
    }
    return false
  },

  /**
   * 港澳来往内地通行证格式校验
   * @param idCard 港澳来往内地通行证
   * @return
   */
  hKongMacaoValidate: idCard => {
    const a = /^[CGHMhm]{1}([0-9]{10}|[0-9]{8})$/
    idCard = validate.trim(idCard.replace(/ /g, '')) // 去掉字符串头尾空格
    if (a.test(idCard)) {
      return true
    }
    return false
  },

  /**
   * 统一信用代码校验
   * @param code 统一信用代码
   * @return
   */
  checkSocialCredit: code => {
    code = validate.trim(code)
    const ws = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28] // 统一信用代码的加权因子
    const str = '0123456789ABCDEFGHJKLMNPQRTUWXY' // 统一信用代码 代码字符集
    const reg = /[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}/ // 统一信用代码的正则 17+1
    let sum = 0
    let index_18 = '' // 统一信用代码第18位
    if (code.length == 18) {
      // 当输入长度为18位时
      if (!reg.test(code)) {
        return false
      }
      // 前17位求和
      for (let i = 0; i < code.length; i++) {
        if (i < 17) {
          sum += str.indexOf(code.charAt(i)) * ws[i]
        } else {
          index_18 = code.charAt(i)
        }
      }
      // 求模
      let c18 = 31 - (sum % 31)
      if (c18 == 30) {
        c18 = 'Y'
      } else if (c18 == 31) {
        c18 = '0'
      } else {
        const arr = str.split('')
        // 遍历arr2
        for (let i = 0; i < arr.length; i++) {
          if (c18 == i) {
            c18 = arr[i]
            break
          }
        }
      }

      if (c18 != index_18) {
        return false
      } else {
        return true
      }
    } else if (code.length < 18 && code.length > 0) {
      return false
    } else if (code.length > 18) {
      return false
    } else {
      return false
    }
  },

  /**
   * 营业执照号校验
   * @param code 营业执照号
   * @return
   */
  checkRegistration: code => {
    code = validate.trim(code)
    // 开始校验企业营业执照号
    if (code.length == 15) {
      // 营业执照注册号为15位
      const s = []
      const p = []
      const a = []
      const m = 10
      p[0] = m
      for (let i = 0; i < code.length; i++) {
        a[i] = parseInt(code.substring(i, i + 1), m)
        s[i] = (p[i] % (m + 1)) + a[i]
        if (s[i] % m == 0) {
          p[i + 1] = 10 * 2
        } else {
          p[i + 1] = (s[i] % m) * 2
        }
      }
      if (s[14] % m == 1) {
        return true
      } else {
        return false
      }
    } else if (code == '') {
      // 如果营业执照为空
      return false
    } else {
      return false
    }
  },

  /**
   * 组织机构代码校验
   * @param code 组织机构代码
   * @return
   */
  checkOrganization: code => {
    const ws = [3, 7, 9, 10, 5, 8, 4, 2] // 组织机构代码的加权因子
    const str = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ' // 组织机构代码 代码字符集
    const reg = /^([0-9A-HJ-NPQRTUWXY]){9}$/ // 组织机构代码的正则   8+1
    let sum = 0
    let index_9 = '' // 组织机构代码第9位
    code = validate.trim(code)
    code = code.replace(/-/, '') // 把'-' 替换成 '' 空字符串

    if (code.length == 9) {
      // 当输入长度为9时
      if (!reg.test(code)) {
        return false
      }
      for (let i = 0; i < code.length; i++) {
        if (i < 8) {
          sum += str.indexOf(code.charAt(i)) * ws[i]
        } else {
          index_9 = code.charAt(i)
        }
      }
      // 求模
      let c9 = 11 - (sum % 11)

      if (c9 == 11) {
        c9 = '0'
      } else if (c9 == 10) {
        c9 = 'X'
      }

      if (c9 != index_9) {
        return false
      } else {
        return true
      }
    } else if (code.length < 9 && code.length > 0) {
      return false
    } else if (code.length > 9) {
      return false
    } else {
      return false
    }
  },

  /**
   * 校验身份证号码
   * @param idCard 身份证号码
   * @return
   */
  checkIdCard(rule, value, callback) {
    if (!value) {
      return callback(new Error('请输入身份证号码'))
    }
    if (value.length == 15) {
      if (validate.isValidityBrithBy15idCard(value)) {
        // 进行15位身份证的校验
        callback()
      } else {
        callback(new Error('身份证号码格式有误'))
      }
    } else if (value.length == 18) {
      const a_idCard = value.split('') // 得到身份证数组
      if (
        validate.isValidityBrithBy18idCard(value) &&
        validate.isTrueValidateCodeBy18idCard(a_idCard)
      ) {
        // 进行18位身份证的基本校验和第18位的校验
        callback()
      } else {
        callback(new Error('身份证号码格式有误'))
      }
    } else {
      callback(new Error('身份证号码格式有误'))
    }
  },

  /**
   * 电子邮箱校验
   * @param str 电子邮箱
   * @return
   */
  email(rule, value, callback) {
    const pattern = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
    if (!value) {
      callback()
    } else {
      if (pattern.test(value)) {
        callback()
      } else {
        callback(new Error('格式有误'))
      }
    }
  },

  /**
   * 手机号码校验
   * @param number 手机号码 非+86
   * @return
   */
  cellphone(rule, value, callback) {
    const pattern = /^1\d{10}$/
    if (!value) {
      callback(new Error('手机号不能为空'))
    } else {
      if (pattern.test(value)) {
        callback()
      } else {
        callback(new Error('格式有误'))
      }
    }
  },
  validMobile(value) {
    const pattern = /^1\d{10}$/
    return pattern.test(value)
  },

  /**
   * 用户名校验
   * 以字母开头、数字、字母大小写的7至20位
   * @param username 用户名
   * @return
   */
  userNameValidate: username => {
    const pattern = /^[a-zA-Z][a-zA-Z0-9_]{7,20}$/
    if (pattern.test(username)) {
      return true
    } else {
      return false
    }
  },

  /**
   * 密码校验
   * 需要字母和数字组合，且位数在8-16位之间
   * @param password 密码
   * @return
   */
  passWordValidate: password => {
    const pattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
    if (pattern.test(password)) {
      return true
    } else {
      return false
    }
  },
  /**
   * 邮政编码校验
   * @param {*}
   */
  postalCodeValidate(rule, value, callback) {
    const pattern = /^[1-9][0-9]{5}$/
    if (!value) {
      callback()
    } else {
      if (pattern.test(value)) {
        callback()
      } else {
        callback(new Error('格式有误'))
      }
    }
  },

  /**
   * 通过身份证判断是男是女
   * @param idCard 15/18位身份证号码
   * @return 'female'-女、'male'-男
   */
  maleOrFemalByidCard: idCard => {
    idCard = validate.trim(idCard.replace(/ /g, '')) // 对身份证号码做处理。包括字符间有空格。
    if (idCard.length == 15) {
      if (idCard.substring(14, 15) % 2 == 0) {
        return 'female'
      } else {
        return 'male'
      }
    } else if (idCard.length == 18) {
      if (idCard.substring(14, 17) % 2 == 0) {
        return 'female'
      } else {
        return 'male'
      }
    } else {
      return null
    }
  },
  /**
   * 校验联系方式
   * @param {*} rule
   * @param {*} value
   * @param {*} callback
   */
  isContactType(rule, value, callback) {
    const pattern = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/
    if (!value) {
      callback()
    } else {
      if (pattern.test(value)) {
        callback()
      } else {
        callback(new Error('格式有误'))
      }
    }
  }
}
