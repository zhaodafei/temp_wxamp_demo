// 自定义内容

Component({
  data: {
    selected: 0, // 页面里设置 selected
    iPhoneX: true, // 是否是 iPhoneX 这个手机
    color: '#7A7E83',
    selectedColor: '#C7700A',
    list: []
  },
  lifetimes: {
    attached() {
        const zh_tabBar = [
            {
                "pagePath": "/pages/index/index",
                "iconPath": "/static/image/icon_component.png",
                "selectedIconPath": "/static/image/icon_component_HL.png",
                "text": "首页A"
              },
              {
                "pagePath": "/pages/about/index",
                "iconPath": "/static/image/icon_API.png",
                "selectedIconPath": "/static/image/icon_API_HL.png",
                "text": "关于我们tab"
              },
              {
                "pagePath": "/pages/my/index",
                "iconPath": "/static/image/icon_API.png",
                "selectedIconPath": "/static/image/icon_API_HL.png",
                "text": "我的B"
              }
        ]
        this.setData({ list: zh_tabBar })
    },
    detached() {
      // console.log("detached ============");
    }
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
      // console.log("shouw ============");
    },
    hide: function () {
      // console.log("hide ============");
    },
    resize: function () {
      // console.log("resize: ============");
    }
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
    // wx.navigateTo({ url: '/pages/indexHome/index'})
    // wx.switchTab({ url: '/pages/my/index' })

      // wx.switchTab({url})
      // this.setData({
      //   selected: data.index // 0,1,2,3
      // })

      // 不用出现页面,直接跳转
      if (data.index === 1) {
        wx.switchTab({
            url,
            success: function (e) {
              // var page = getCurrentPages().pop()
              // page.onLoad()
            }
        })
      } else {
        wx.switchTab({
          url,
          success: function (e) {
            // var page = getCurrentPages().pop()
            // page.onLoad()
          }
        })
      }

      // // 页面里面使用
      // if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      //   this.getTabBar().setData({
      //     selected: 2,
      //   })
      // }
    }
  }
})
