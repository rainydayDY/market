Page({
  data: {
    view: 0,
    nid_array: [],
  },
  onLoad: function (options) {
    var that = this;
    that.data.uid = options.uid;
    if (isNaN(Number(that.data.uid))) {
      that.setData({
        view: 1
      })
    } else {
      wx.request({
        url: 'https://wx.gzqskjw.com/index.php?c=Publish&a=showNews',
        data: {
          receive: that.data.uid
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          console.log(res.data);
            that.setData({
              newslist: res.data
            })
            for (var i = 0; i < res.data.length; i++) {
              if(res.data[i].ischeck==0){
                wx.request({
                  url: 'https://wx.gzqskjw.com/index.php?c=Publish&a=updateCheck',
                  data: {
                    nid: res.data[i].nid
                  }
                })
              }
            }
        },
        fail: function (res) {
          // fail
        },
        complete: function (res) {
          // complete
        }
      })
    }
    // 页面初始化 options为页面跳转所带来的参数
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
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: '最专业的校内二手网，精选好货等你来', // 分享标题
      desc: '品质好货，值得信赖', // 分享描述
      path: '/pages/index/index' // 分享路径
    }
  },
  todetail: function (event) {
    wx.redirectTo({
      url: '../detail/detail?id=' + event.currentTarget.dataset.postid,
    })
  },
  backIndex: function () {
    wx.switchTab({
      url: '../index/index',
    })
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
