import { APIDict_getList } from '@/api/common'

Page({
  data: {
    motto: 'Hello World',
  },
  onLoad:function () {

  },
  onShow: function () {
    this._init();
  },
  async _init() {
    const res = await APIDict_getList({code: 'exhibition_type'})
    console.log("网络返回",res);
  },
})
