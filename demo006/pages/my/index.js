Page({
    data: {
      avatar: 'https://pic.cnblogs.com/avatar/1551357/20200522184107.png', // 页面显示
      winHeight: '', //窗口高度
      currentTab: 0, //预设当前项的值
      scrollLeft: 0 //tab标题的滚动条位置
    },
    onLoad: function () {
      var that = this
      //  高度自适应
      wx.getSystemInfo({
        success: function (res) {
          var clientHeight = res.windowHeight,
            clientWidth = res.windowWidth,
            rpxR = 750 / clientWidth
          var calc = clientHeight * rpxR - 180
          console.log(calc)
          that.setData({ winHeight: calc })
        }
      })
    },
    // 滚动切换标签样式
    switchTab: function (e) {
      var that = this
      that.setData({ currentTab: e.detail.current })
      that.checkCor()
    },
    // 点击标题切换当前页时改变样式 switchNav
    switchNav: function (e) {
      var that = this
      var cur = e.target.dataset.current
      if (that.data.currentTab == cur) {
        return false
      } else {
        that.setData({ currentTab: cur })
      }
    },
    //判断当前滚动超过一屏时，设置tab标题滚动条。
    checkCor: function () {
      var that = this
      if (that.data.currentTab > 4) {
        that.setData({ scrollLeft: 300 })
      } else {
        that.setData({ scrollLeft: 0 })
      }
    }
  })
  