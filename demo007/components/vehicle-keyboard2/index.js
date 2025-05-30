//车牌号输入框个数
const EmptyArray = new Array(8).fill('') //['','','','','','','','']

const INPUT_INDEX = { FIRST: 0, SECOND: 1 } // 车牌输入框的下标( 控制键盘 )
const provinceArr1 = ['京', '沪', '津', '苏', '粤', '冀', '晋', '蒙', '辽', '吉']
const provinceArr2 = ['黑', '浙', '皖', '闽', '赣', '鲁', '豫', '鄂', '湘', '桂', '琼']
const provinceArr3 = ['渝', '川', '贵', '云', '藏', '陕', '甘', '青', '宁', '新', '港', '澳', '台']

Component({
  properties: {},
  data: {
    iPhoneX: true,
    provinceArr: [...provinceArr1, ...provinceArr2, ...provinceArr3],
    strArrOne: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'P'],
    strArrTwo: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    strArrThree: ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
    numArr: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    hiddenPro: false, // 隐藏省份键盘
    hiddenStr: true, // 隐藏数字字母键盘
    carNumArr: EmptyArray, // 车牌号
    selectInputIndex: 0,
    btnDisabled: true
  },
  observers: {},
  attached: function () {
    console.log('立即执行')
  },
  methods: {
    onCancel() {
      this.setData({ carNumArr: EmptyArray })
      this.triggerEvent('onCancel')
    },
    inputCarNum(e) {
      const { index } = e.currentTarget.dataset
      this.setData({ showCarKeyboard: true, selectInputIndex: index })

      if (index === INPUT_INDEX.FIRST) {
        // 第一个输入框展示省份键盘，第二个展示字母数字输入框(数字不可点),以后就是数字字母输入框(都可点)
        this.setData({ hiddenPro: false, hiddenStr: true })
      } else if (index === INPUT_INDEX.SECOND) {
        this.setData({ hiddenPro: true, hiddenStr: false })
      } else {
        this.setData({ hiddenPro: true, hiddenStr: false })
      }
    },
    onOk() {
      const carNum = this.data.carNumArr.join('')
      this.triggerEvent('onOk', carNum)
    },

    // =========== ↓↓↓键盘操作↓↓
    // 只有输入内容的车牌号位数合法时，展示确认按钮
    btnDisabled() {
      const { carNumArr } = this.data
      const disabled = carNumArr.some((item, index) => {
        if (index !== carNumArr.length - 1) {
          return !item
        }
        return false
      })
      return disabled
    },
    //点击省份
    proTap(e) {
      let province = e.currentTarget.dataset.province
      const { carNumArr, selectInputIndex } = this.data
      this.setData({ hiddenPro: true, hiddenStr: false })
      carNumArr[selectInputIndex] = province
      // 选择车牌号时触发
      this.setData({
        carNumArr,
        // 选中一个后，下一个输入框聚焦
        selectInputIndex: selectInputIndex !== carNumArr.length - 1 ? selectInputIndex + 1 : selectInputIndex,
        btnDisabled: this.btnDisabled()
      })
    },
    //点击字母数字
    strTap(e) {
      const str = e.currentTarget.dataset.str
      const { carNumArr, selectInputIndex } = this.data
      carNumArr[selectInputIndex] = str
      this.setData({
        carNumArr,
        // 选中一个后，下一个输入框聚焦
        selectInputIndex: selectInputIndex !== carNumArr.length - 1 ? selectInputIndex + 1 : selectInputIndex,
        btnDisabled: this.btnDisabled()
      })
    },
    //删除
    backSpace() {
      const { carNumArr, selectInputIndex } = this.data
      carNumArr[selectInputIndex] = ''
      const new_selectInputIndex = selectInputIndex !== INPUT_INDEX.FIRST ? selectInputIndex - 1 : selectInputIndex

      this.setData({
        carNumArr,
        selectInputIndex: new_selectInputIndex,
        btnDisabled: this.btnDisabled()
      })
      if (new_selectInputIndex === INPUT_INDEX.FIRST) {
        //这里必须要用this.data.selectInputIndex，用最新的
        this.setData({ hiddenPro: false, hiddenStr: true })
      }
    },
    xx() {}
  }
})
