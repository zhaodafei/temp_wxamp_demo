// app.js
import i18n from 'miniprogram-i18n-plus'
import zhLocale from './i18n/zh-CN.js'
import enLocale from './i18n/en-US.js'

App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    // 语言切换
    const locales = {
        zh_CN: {
          test: "测试一二三",
          ...zhLocale
        },
        en_US: {
          test: "Test_test",
          ...enLocale
        }
      }

      i18n.setLocale('zh_CN')
      // i18n.setLocale("en_US");
      i18n.loadTranslations(locales)
      // i18n.effect(this);
  },
  globalData: {
    userInfo: null
  }
})
