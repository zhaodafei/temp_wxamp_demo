// index.js
Page({
  data: {
    motto: 'Hello World',
  },
  onLoad:function () {},
  onShow: function () {},
  _init() {
    this.getData()
  },
  getData() {},
  toChildPage(){
    wx.navigateTo({
      url: '/pages/indexSub/about/index'
    })
  }
})
