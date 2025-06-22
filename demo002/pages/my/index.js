// index.js
Page({
  data: {
    motto: 'Hello World',
  },
  onLoad:function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
          selected: 2
        })
      }
  },
  onShow: function () {},
  _init() {
    this.getData()
  },
  getData() {},
})
