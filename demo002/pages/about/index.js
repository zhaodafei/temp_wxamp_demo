// index.js
Page({
  data: {
    motto: 'Hello World',
  },
  onLoad:function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        })
      }
  },
  onShow: function () {},
  _init() {
    this.getData()
  },
  getData() {},
})
