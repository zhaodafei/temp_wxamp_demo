// index.js
Page({
  data: {
    motto: 'Hello World',
    showKeyboard:false,
  },
  inputCarNum() {
    this.setData({showKeyboard: true})
  },
  onOk(e){
    console.log('输入的车牌号:',e.detail)
  },
  onCancel(){
    this.setData({ showKeyboard: false   })
  }
})
