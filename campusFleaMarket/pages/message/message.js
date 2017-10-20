// pages/userInfo/userInfo.js
Page({
    data: {},
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        var that = this;
        that.data.uid = options.uid;
        that.data.rid = options.rid;
        that.data.gid = options.gid;
        that.data.dialog = options.gid + options.uid + options.rid;
        that.data.isreply=options.isreply
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
    backdetail: function () {
        var that=this;
        wx.redirectTo({
            url: '../detail/detail?id=' + that.data.gid,
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
    inputmsg: function (event) {
        var content = event.detail.value;
        this.data.message = content;
    },
    sendmsg: function (event) {
        var that = this;
        if (that.data.message == undefined) {
            that.showToast('内容不能为空！', '/images/hint.png');
        } else {
            wx.request({
                url: 'https://wx.gzqskjw.com/index.php?c=Publish&a=addMessage',
                data: {
                    uid: that.data.uid,
                    rid: that.data.rid,
                    gid: that.data.gid,
                    dialog: that.data.dialog,
                    message: that.data.message,
                    isreply:that.data.isreply
                },
                method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                // header: {}, // 设置请求的 header
                success: function (res) {
                    wx.showToast({
                        title: '发送成功！',
                        icon: 'sucess',
                        duration: 2000
                    });
                    wx.redirectTo({
                        url: '../detail/detail?id=' + that.data.gid,
                        success: function (res) {
                          wx.request({
                            url: 'https://wx.gzqskjw.com/index.php?c=Publish&a=addNews',
                            data: {
                              receive: that.data.rid,
                              gid: that.data.gid,
                              send: that.data.uid,
                              news_type: '收到留言：',
                              content: that.data.message
                            },
                            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                            // header: {}, // 设置请求的 header
                            success: function (res) {

                            },
                            fail: function (res) {
                              // fail
                            },
                            complete: function (res) {
                              // complete
                            }
                          })
                        },
                        fail: function (res) {
                            // fail
                        },
                        complete: function (res) {
                            // complete
                        }
                    })
                },
                fail: function (res) {
                    // fail
                },
                complete: function (res) {
                    // complete
                }
            })
        }
    },
    showToast: function (title, img) {
        wx.showToast({
            title: title,
            image: img,
            duration: 1000
        })
    },
});


