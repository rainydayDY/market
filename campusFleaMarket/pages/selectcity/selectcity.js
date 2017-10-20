Page({
  data: {
    gcity:'定位中...',
    hascity:'城市',
    citylist:[]
  },
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'glocate',
      success: function (res) {
        var result = res.data.split('&');
        that.setData({
          gcity: result[1].replace('市', '')
        });
        wx.request({
          url: 'https://wx.gzqskjw.com/index.php?c=category&a=showcampus',
          data: {
            sname: result[1].replace('市', '')
          },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function (res) {
            console.log(res.data);
            that.setData({ citylist: res.data });
          },
          fail: function (res) {
            // fail
          },
          complete: function (res) {
            // complete
          }
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },
  selectcampus:function(event){
    wx.setStorage({
      key: 'sname',
      data: event.target.dataset.sname,
    })
    wx.switchTab({
      url: '../index/index'
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: '最专业的校内二手网，精选好货等你来', // 分享标题
      desc: '品质好货，值得信赖', // 分享描述
      path: '/pages/index/index' // 分享路径
    }
  },
})