/**
 * 是否都是空数据（类型：字符串，数值，对象，数组，布尔）
 */
export const isEmpty = (...values) => {
    const isEmptyFunc = (val) => {
      switch (typeof val) {
        case 'string':
        case 'number': return !val // 数值0为空
        case 'object':
          // 数组
          if (Array.isArray(val)) return val.length === 0
          // null/对象
          return val === null || Object.keys(val).length === 0
        case 'boolean': return false // 布尔类型即非空
        // undefined / function
        default: return true
      }
    }
    let result = true
    values.forEach(m => { result = result && isEmptyFunc(m) })

    return result
  }

  /**
   * 验证
   */
  export const validate = {
    /** 是车牌号 */
    vehicle(value) {
      let result = false
      if (value && [7, 8].includes(value.length)) {
        const express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4,5}[A-Z0-9挂学军警港澳]{1}$/
        result = express.test(value)
      }
      return result
    }
  }
