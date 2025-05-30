Component({
  // 组件的属性列表
  properties: {},
  // 组件的初始数据
  data: {
    isLoading: false,
    appUserId: "",
    escapeOrderList: [],
    carNumList: [],
    hasOrder: false,
    isKeyboard: false,
    isNumberKB: true,
    tapNum: false,
    disableKey: "1234567890港澳学", // keyboardNumber: "1234567890ABCDEFGHJKLMNPQRSTUVWXYZ港澳学",
    keyboardNumber: "1234567890QWERTYUP港澳ASDFGHJKL学ZXCVBNM",
    keyboard1: "渝川京沪粤津冀晋蒙辽吉黑苏浙皖闽赣鲁豫鄂湘桂琼贵云藏陕甘青宁新",
    inputPlates: {
      index0: "渝", index1: "", index2: "", index3: "", index4: "", index5: "", index6: "", index7: ""
    },
    inputOnFocusIndex: "",
    isNewEnergy: false,
    carNum: ""
  },
  // 组件的方法列表
  methods: {
    //切换车牌
    changePlate: function () {
      var that = this;
      console.log("isNewEnergy", that.data.isNewEnergy);
      that.setData({
        isNewEnergy: !that.data.isNewEnergy,
      });
      this.checkCarNum();
    },
    //切换车牌
    changePlate1: function () {
      var that = this;
      that.setData({
        flag: true, inputPlates: {
          index0: "渝", index1: "", index2: "", index3: "", index4: "", index5: "", index6: "", index7: ""
        },
      })
    },
    inputClick: function (t) {
      var that = this;
      //console.log('输入框:', t);
      //console.log('输入框:', t.target.dataset.id);

      if (t.target.dataset.id == 0) {
        that.setData({
          inputOnFocusIndex: t.target.dataset.id, isNumberKB: true, isKeyboard: true, tapNum: false,
        })
      }
      ;
      if (t.target.dataset.id == 1) {
        that.setData({
          inputOnFocusIndex: t.target.dataset.id, isNumberKB: false, isKeyboard: true, tapNum: false,
        })
      }
      if (t.target.dataset.id > 1) {
        that.setData({
          inputOnFocusIndex: t.target.dataset.id, isNumberKB: false, isKeyboard: true, tapNum: true,
        })
      }
    },
    //键盘点击事件
    tapKeyboard: function (t) {
      t.target.dataset.index;
      var a = t.target.dataset.val;
      //console.log("data",this.data);
      //console.log('键盘:',a);
      //console.log("index",t.target.dataset.index);
      //console.log("focus",this.data.inputOnFocusIndex);
      switch (parseInt(this.data.inputOnFocusIndex)) {
        case 0:
          this.setData({
            "inputPlates.index0": a, inputOnFocusIndex: "1"
          });
          break;
        case 1:
          this.setData({
            "inputPlates.index1": a, inputOnFocusIndex: "2"
          });
          break;
        case 2:
          this.setData({
            "inputPlates.index2": a, inputOnFocusIndex: "3"
          });
          break;
        case 3:
          this.setData({
            "inputPlates.index3": a, inputOnFocusIndex: "4"
          });
          break;
        case 4:
          this.setData({
            "inputPlates.index4": a, inputOnFocusIndex: "5"
          });
          break;
        case 5:
          this.setData({
            "inputPlates.index5": a, inputOnFocusIndex: "6"
          });
          break;
        case 6:
          this.setData({
            "inputPlates.index6": a, inputOnFocusIndex: "7"
          });
          break;
        case 7:
          this.setData({
            "inputPlates.index7": a, inputOnFocusIndex: "7"
          });
      }
      var n = this.data.inputPlates.index0 + this.data.inputPlates.index1 + this.data.inputPlates.index2 + this.data.inputPlates.index3 + this.data.inputPlates.index4 + this.data.inputPlates.index5 + this.data.inputPlates.index6 + this.data.inputPlates.index7
      console.log('车牌号:', n);
      this.data.carNum = n;
      this.checkedSubmitButtonEnabled();
      this.checkCarNum();

    }, //键盘关闭按钮点击事件
    tapSpecBtn: function (t) {
      var a = this, e = t.target.dataset.index;
      if (0 == e) {
        switch (parseInt(this.data.inputOnFocusIndex)) {
          case 0:
            this.setData({
              "inputPlates.index0": "", inputOnFocusIndex: "0"
            });
            break;
          case 1:
            this.setData({
              "inputPlates.index1": "", inputOnFocusIndex: "0"
            });
            break;
          case 2:
            this.setData({
              "inputPlates.index2": "", inputOnFocusIndex: "1"
            });
            break;
          case 3:
            this.setData({
              "inputPlates.index3": "", inputOnFocusIndex: "2"
            });
            break;
          case 4:
            this.setData({
              "inputPlates.index4": "", inputOnFocusIndex: "3"
            });
            break;
          case 5:
            this.setData({
              "inputPlates.index5": "", inputOnFocusIndex: "4"
            });
            break;
          case 6:
            this.setData({
              "inputPlates.index6": "", inputOnFocusIndex: "5"
            });
            break;
          case 7:
            this.setData({
              "inputPlates.index7": "", inputOnFocusIndex: "6"
            });
        }
        this.checkedSubmitButtonEnabled();
      } else 1 == e && a.setData({
        isKeyboard: !1, isNumberKB: !1, inputOnFocusIndex: ""
      });
      var n = this.data.inputPlates.index0 + this.data.inputPlates.index1 + this.data.inputPlates.index2 + this.data.inputPlates.index3 + this.data.inputPlates.index4 + this.data.inputPlates.index5 + this.data.inputPlates.index6 + this.data.inputPlates.index7
      //console.log('车牌号:', n);
      this.data.carNum = n;
      this.checkCarNum();
    }, //键盘切换
    checkedKeyboard: function () {
      var t = this;
      //console.log("键盘切换", this.data.inputOnFocusIndex);
      if (this.data.inputOnFocusIndex == 0) {
        t.setData({
          tapNum: false, isNumberKB: true
        })
      }
      if (this.data.inputOnFocusIndex == 1) {
        t.setData({
          tapNum: false, isNumberKB: false
        })
      }
      if (this.data.inputOnFocusIndex > 1) {
        t.setData({
          tapNum: true, isNumberKB: false
        })
      }
    }, checkedSubmitButtonEnabled: function () {
      this.checkedKeyboard();
      var t = !0;
      for (var a in this.data.inputPlates) if ("index7" != a && this.data.inputPlates[a].length < 1) {
        t = !1;
        break;
      }
    },
    //校验车牌号-车牌输入限制了正确格式只判断车牌位数
    checkCarNum: function () {
      if (this.data.isNewEnergy && this.data.carNum.length < 8) {
        let res = {
          carNum: this.data.carNum, isPlate: false
        }
        this.triggerEvent("setCarNum", res);
        return false
      }
      if (!this.data.isNewEnergy) {
        if (this.data.carNum.length < 7) {
          let res = {
            carNum: this.data.carNum, isPlate: false
          }
          this.triggerEvent("setCarNum", res);
          return false
        } else {
          var carNum = this.data.carNum.substr(0, 7);
          let res = {
            carNum: carNum, isPlate: true
          }
          this.triggerEvent("setCarNum", res);
          return true;
        }
      }
      let res = {
        carNum: this.data.carNum, isPlate: true
      }
      this.triggerEvent("setCarNum", res);
      return true;
    }
  }
})
