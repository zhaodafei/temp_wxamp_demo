// index.js
Page({
  data: {
    motto: 'Hello World',
    showKeyboard:false,
  },
  inputCarNum() {
    this.setData({showKeyboard: true})
  },
  onOk(e) {
    console.log('输入的车牌号:', e.detail)
    const fullPlate = e.detail
    const reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-Z0-9]{4,5}[A-Z0-9挂学警港澳]$/;
    if (reg.test(fullPlate)) {
      wx.showToast({icon: 'none', title: '车牌合法',})
    } else {
      wx.showToast({icon: 'none', title: '车牌错误',})
    }
  },
  onCancel(){
    this.setData({ showKeyboard: false   })
  }
})
