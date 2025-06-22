// index.js
import i18n from 'miniprogram-i18n-plus'
Page({
  data: {
    motto: 'Hello World',
    tCom: i18n.getLanguage().com,
  },
  onLoad:function () {},
  onShow: function () {
    i18n.effect(this) // 刷新语言
    const { com } = i18n.getLanguage()
    this.setData({ tCom: com })

    console.log(this.data.tCom)
    console.log(i18n.getLanguage())
  },
  _init() {
    this.getData()
  },
  getData() {},
  changeLang(){
    const nowLang = i18n.getLocale()
    if (nowLang === 'zh_CN') {
      i18n.setLocale('en_US')
    } else {
      i18n.setLocale('zh_CN')
    }
    wx.reLaunch({
      url: '/pages/index/index'
    })
  }
})
