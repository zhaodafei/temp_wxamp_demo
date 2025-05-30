Page({
    data: {
      currentIndex: 0,
      firstList: ['foo', 'foo', 'foo', 'foo', 'foo', 'foo'],
      secondList: ['bar', 'bar', 'bar', 'bar', 'bar', 'bar', 'bar', 'bar']
    },
    //用户点击tab时调用
    titleClick: function (e) {
      this.setData({
        //拿到当前索引并动态改变
        currentIndex: e.currentTarget.dataset.idx
      })
    },
    //swiper切换时会调用
    pageChange: function (e) {
      if ('touch' === e.detail.source) {
        let currentPageIndex = this.data.currentIndex
        currentPageIndex = (currentPageIndex + 1) % 2
        this.setData({
          currentIndex: currentPageIndex
        })
      }
    }
  })
  