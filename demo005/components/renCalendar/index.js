// components/renCalendar/index.js
import dayjs from 'dayjs'

Component({
  properties: {
    // 星期几为第一天(0为星期日) weekStart
    weekStart: {
      type: Number,
      value: 0
    },
    // 标记的日期
    markDays: {
      type: Array,
      // value: ['2024-12-17', '2024-12-18', '2024-12-19']
      // value: ['2024-12-17']
      value: []
    },
    //是否展示月份切换按钮
    headerBar: {
      type: Boolean,
      value: true
    },
    // 是否展开
    open: {
      type: Boolean,
      value: true
    },
    //是否可收缩
    collapsible: {
      type: Boolean,
      value: true
    },
    //未来日期是否不可点击
    disabledAfter: {
      type: Boolean,
      value: false
    },
    // 日历中格式日期
    format: {
      type: String,
      value: 'YYYY-MM-DD'
      // value: 'MM-DD'
      // value: 'DD'
    },
    propFei001: {
      type: Boolean,
      value: false,
      observer: function (newVal, oldVal) {
        console.log('属性值变化时执行')
        // this.setData({})
      }
    },
    propFei002: {
      type: String,
      value: 'default value'
    }
  },
  data: {
    weekText: ['日', '一', '二', '三', '四', '五', '六'],
    y: new Date().getFullYear(), // 年(必须是数字)
    m: new Date().getMonth() + 1, // 月(必须是数字)
    dates: [], // 当前月的日期数据
    monthOpen: true,
    positionTop: 0,
    choose: '',

    weekDay: ['日', '一', '二', '三', '四', '五', '六'], // 顶部星期栏(动态计算)
    height: '460rpx', // 日历高度(动态计算)( 在 observers 中实现 )
    dataFei01: '数据datafei001'
  },
  observers: {
    // 监听组件: https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/observer.html
    dates(val) {
      const heightVal = (val.length / 7) * 80 + 'rpx'
      this.setData({ height: heightVal })
    }
  },
  lifetimes: {
    attached() {
      // // 获取 data中数据
      // console.log('data中数据', this.data.dataFei01)
      // // 获取 properties 中数据
      // console.log('111', this.properties.propFei001)
      // console.log('222', this.properties.propFei002)
      // // 提交父级方法( 父子传值 ) this.triggerEvent
      // // 调用本组件中方法( 对外的方法 ) 在 methods 中直接写

      // console.log(this.data.y, this.data.m)
      // const y = '2024'
      // const m = '12'
      // const d = '07'
      // console.log('sssss', dayjs(`${y}-${m}-${d}`).format('YYYY-MM-DD'))
      this._weekDay()
      this._init()
    }
  },
  methods: {
    //========== ↓↓↓JS内部操作方法↓↓↓
    // 初始化加载
    _init() {
      this.setData({
        dates: this._monthDay(this.data.y, this.data.m),
        choose: this._getToday().date
      })

      if (!this.properties.open) {
        this._toggle()
      }
    },
    //是否工作日
    _isWorkDay(y, m, d) {
      //是否工作日
      let ymd = `${y}/${m}/${d}`
      let formatDY = new Date(ymd.replace(/-/g, '/'))
      let week = formatDY.getDay()
      if (week == 0 || week == 6) {
        return false
      } else {
        return true
      }
    },
    _isToday(y, m, d) {
      let checkD = y + '-' + m + '-' + d
      let today = this._getToday().date
      if (checkD == today) {
        return true
      } else {
        return false
      }
    },
    // 标记日期
    _isMarkDay(y, m, d) {
      let flag = false
      for (let i = 0; i < this.properties.markDays.length; i++) {
        let dy = `${y}-${m}-${d}`
        if (this.properties.markDays[i] === dy) {
          flag = true
          break
        }
      }

      return flag
    },
    // 展开收起
    _toggle() {
      this.setData({
        monthOpen: !this.data.monthOpen
      })
      if (this.data.monthOpen) {
        this.setData({ positionTop: 0 })
      } else {
        let index = -1
        this.data.dates.forEach((item, ind) => {
          this._isToday(item.year, item.month, item.date) && (index = ind)
        })

        this.setData({
          positionTop: -((Math.ceil((index + 1) / 7) || 1) - 1) * 80
        })
      }
    },
    _weekDay() {
      const weekDay = this.data.weekText
          .slice(this.properties.weekStart)
          .concat(this.data.weekText.slice(0, this.properties.weekStart))
      this.setData({
        weekDay: weekDay
      })
    },
    _formatNum(num) {
      let res = Number(num)
      return res < 10 ? '0' + res : res
    },
    _getToday() {
      let date = new Date()
      let y = date.getFullYear()
      let m = date.getMonth()
      let d = date.getDate()
      let week = new Date().getDay()
      let weekText = ['日', '一', '二', '三', '四', '五', '六']
      let formatWeek = '星期' + weekText[week]
      let today = {
        date: y + '-' + this._formatNum(m + 1) + '-' + this._formatNum(d),
        week: formatWeek
      }
      return today
    },
    // 获取当前月份数据
    _monthDay(y, month) {
      let dates = []
      let m = Number(month)
      let firstDayOfMonth = new Date(y, m - 1, 1).getDay() // 当月第一天星期几
      let lastDateOfMonth = new Date(y, m, 0).getDate() // 当月最后一天
      let lastDayOfLastMonth = new Date(y, m - 2, 0).getDate() // 上一月的最后一天
      let weekStart = this.properties.weekStart === 7 ? 0 : this.properties.weekStart
      let startDay = (() => {
        // 周初有几天是上个月的
        if (firstDayOfMonth == weekStart) {
          return 0
        } else if (firstDayOfMonth > weekStart) {
          return firstDayOfMonth - weekStart
        } else {
          return 7 - weekStart + firstDayOfMonth
        }
      })()
      let endDay = 7 - ((startDay + lastDateOfMonth) % 7) // 结束还有几天是下个月的
      for (let i = 1; i <= startDay; i++) {
        dates.push({
          date: this._formatNum(lastDayOfLastMonth - startDay + i),
          day: weekStart + i - 1 || 7,
          month: m - 1 >= 0 ? this._formatNum(m - 1) : 12,
          year: m - 1 >= 0 ? y : y - 1
        })
      }
      for (let j = 1; j <= lastDateOfMonth; j++) {
        let year = y
        let month = this._formatNum(m)
        let date = this._formatNum(j)
        /*dates.push({
          date: this._formatNum(j),
          day: (j % 7) + firstDayOfMonth - 1 || 7,
          month: this._formatNum(m),
          year: y,
          isCurM: true, //是否当前月份
        })*/
        dates.push({
          date: date,
          day: (j % 7) + firstDayOfMonth - 1 || 7,
          month: month,
          year: year,
          isCurM: true, //是否当前月份
          isMarkDay: this._isMarkDay(year, month, date), // 标记日期
          // dateFormat: dayjs(`${year}-${month}-${date}`).format('YYYY-MM-DD') // 格式化日期
          dateFormat: dayjs(`${year}-${month}-${date}`).format(this.properties.format), // 格式化日期
          isToday: this._isToday(year, month, date), // 是否是今天
          isWorkDay: this._isWorkDay(year, month, date) // 是否工作日
        })
      }
      for (let k = 1; k <= endDay; k++) {
        dates.push({
          date: this._formatNum(k),
          day: (lastDateOfMonth + startDay + weekStart + k - 1) % 7 || 7,
          month: m + 1 <= 11 ? this._formatNum(m + 1) : 0,
          year: m + 1 <= 11 ? y : y + 1
        })
      }

      return dates
    },
    //========== ↑↑↑JS内部操作方法↑↑↑

    //========== ↓↓↓页面操作事件↓↓↓
    changeMonth(e) {
      const { type } = e.currentTarget.dataset
      let y = this.data.y
      let m = this.data.m
      if (type === 'pre') {
        if (this.data.m + 1 === 2) {
          m = 12
          y = this.data.y - 1
        } else {
          m = this.data.m - 1
        }
      } else {
        if (this.data.m + 1 === 13) {
          m = 1
          y = this.data.y + 1
        } else {
          m = this.data.m + 1
        }
      }

      this.setData({
        y: y,
        m: m,
        dates: this._monthDay(y, m)
      })
    },
    selectOne(e) {
      const { item } = e.currentTarget.dataset
      let date = `${item.year}-${item.month}-${item.date}`
      let selectD = new Date(date).getTime()
      let curTime = new Date().getTime()
      let week = new Date(date).getDay()
      let weekText = ['日', '一', '二', '三', '四', '五', '六']
      let formatWeek = '星期' + weekText[week]
      let response = {
        date: date,
        week: formatWeek
      }
      if (!item.isCurM) {
        // console.log('不在当前月范围内');
        return false
      }

      let choose = ''
      if (selectD > curTime) {
        if (this.properties.disabledAfter) {
          console.log('未来日期不可选')
          return false
        } else {
          choose = date
          this.triggerEvent('onDayClick', response)
        }
      } else {
        choose = date
        this.triggerEvent('onDayClick', response)
      }

      this.setData({
        choose: choose
      })
    },
    toggle(e) {
      this._toggle()
    },
    //========== ↑↑↑页面操作事件↑↑↑
    onTapFei001(e) {
      console.log('子级组件内部接受参数11', e)
      const feiParams = {
        foo: '数据001',
        bar: '数据002'
      }
      this.triggerEvent('myevent', feiParams)
    }
  }
})
