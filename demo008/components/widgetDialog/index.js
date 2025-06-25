/**
 *  使用:
 * <WidgetDialog v-if="{{dialogShow}}" height="700" isShow="{{dialogShow}}" bind:onAction="onAction">
 *   <view slot="headerText">隐私条款提示</view>
 *   <view slot="bodyText">这里是插入到组件slot中的内容</view>
 * </WidgetDialog>
 *
 *   父组件使用
 *   dialogShow: false, 定义参数
 *   handelDialog() { // 操作按钮
 *     this.setData({ dialogShow: !this.data.dialogShow })
 *   },
 *   onAction(e) {  // 回调方法
 *     this.setData({ dialogShow: !this.data.dialogShow })
 *     const detail = e.detail
 *     console.log('接受到了', detail)
 *   }
 * */

Component({
    options: {
      multipleSlots: true
    },
    properties: {
      height: {
        type: Number,
        value: 500 // 500
      },
      isShow: {
        type: Boolean,
        value: false,
        observer: function (val) {
          this.setData({ show: val })
        }
      }
    },
    data: {
      show: false,
      overlayHeight: '500rpx',
      bodyHeight: '295rpx'
    },
    observers: {
      height(val) {
        this.setData({
          overlayHeight: val + 'rpx',
          bodyHeight: val - 100 - 105 + 'rpx'
        })
      }
    },
    methods: {
      handleCancel() {
        this.setData({ show: false })
        this.triggerEvent('onAction', 'cancel')
      },
      handleConfirm() {
        this.setData({ show: false })
        this.triggerEvent('onAction', 'onConfirm')
      }
    }
  })
  