// pages/category/category.js
Page({
  data: {
    viewIndex: 1,
    pic: 'https://wx.gzqskjw.com/Public/categoryImg/'
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://wx.gzqskjw.com/index.php?c=Category&a=showType',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log(res);
        that.setData({ categoryList: res.data });
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  selectCategory: function (event) {
    var currentCid = event.target.dataset.parid;
    this.setData({
      viewIndex: currentCid
    })
  },
  toList: function (event) {
    var currentLid = event.target.dataset.typeid;
    wx.navigateTo({
      url: '../list/list?lid=' + currentLid,
      success: function (res) {
        // success
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
  bindfocus:function(event){
    this.setData({
      focus:0
    })
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: '最专业的校内二手网，精选好货等你来', // 分享标题
      desc: '品质好货，值得信赖', // 分享描述
      path: '/pages/index/index' // 分享路径
    }
  },
  publishImg: function (event) {
    wx.redirectTo({
      url: '../publish/publish',
      success: function (res) {
        // success
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  }
})