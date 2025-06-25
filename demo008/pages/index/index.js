// index.js
Page({
  data: {
    motto: 'Hello World',
    dialogShow: false, // 弹窗
  },
  onLoad:function () {},
  onShow: function () {},
  _init() {
    this.getData()
  },
  getData() {},
  handelDialog() { // 操作按钮
    this.setData({ dialogShow: !this.data.dialogShow })
  },
  onAction(e) {  // 回调方法
    this.setData({ dialogShow: !this.data.dialogShow })
    const detail = e.detail
    console.log('接受到了', detail)
  }
})
