import dayjs from 'dayjs'

Page({
  data: {
    // 日历中日期
    markDays: ['2024-12-01'], // 标记日期
    curDate: '2024-12-01' // 选中日期
  },
  onLoad: function (options) {},
  onReady: function() {},
  onShow: function() {
    const today = dayjs().format('YYYY-MM-DD');
    console.log("显示出来",today);
  },
  onMyEvent(e) {
    console.log('接受到子级传值', e)
  },
  onDayClick(e) {
    const resData = e.detail
    this.setData({
      curDate: resData.date
    })
  },
})
