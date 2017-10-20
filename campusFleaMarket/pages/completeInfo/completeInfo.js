Page({
    data: {

    },
    onLoad: function (options) {
        // 生命周期函数--监听页面加载
        console.log('上一个' + options.p);
        if (options.p!=""){
          this.data.p = options.p;
        }else{
          this.data.p = 'index'
        }
        var that = this;
        wx.getStorage({
            key: 'uname',
            success: function (res) {
                that.data.uname = res.data
            }
        }), wx.getStorage({
            key: 'upic',
            success: function (res) {
                that.data.upic = res.data
            }
        }),
            wx.getStorage({
                key: 'ulocation',
                success: function (res) {
                    that.data.ulocation = res.data
                }
            }),
            wx.getStorage({
                key: 'uid',
                success: function (res) {
                    that.data.openid = res.data
                }
            }),
            wx.getStorage({
                key: 'sex',
                success: function (res) {
                    that.data.sex = res.data
                }
            })
    },
    onReady: function () {
        // 生命周期函数--监听页面初次渲染完成
    },
    onShow: function () {
        // 生命周期函数--监听页面显示
    },
    onHide: function () {
        // 生命周期函数--监听页面隐藏
    },
    onUnload: function () {
        // 生命周期函数--监听页面卸载
    },
    onPullDownRefresh: function () {
        // 页面相关事件处理函数--监听用户下拉动作
    },
    onReachBottom: function () {
        // 页面上拉触底事件的处理函数
    },
    onShareAppMessage: function () {
      // 用户点击右上角分享
      return {
        title: '最专业的校内二手网，精选好货等你来', // 分享标题
        desc: '品质好货，值得信赖', // 分享描述
        path: '/pages/index/index' // 分享路径
      }
    },
    submitInfo: function (event) {
        var that = this;
        var wechat = event.detail.value.wechat;
        var phone = event.detail.value.phone;
        var room = event.detail.value.room;
        var ucampus = event.detail.value.ucampus;
        var ucity = event.detail.value.ucity;
        var schoolage = event.detail.value.schoolage;
        if (wechat == '' || phone == '' || room == '') {
            wx.showModal({
                title: '提示',
                content: '信息填写不完整，请检查后提交~',
                showCancel: false
            })
        } else {
            wx.showModal({
                title: '提示',
                content: '一旦提交不可更改，确认无误后提交',
                success: function (res) {
                    if (res.confirm) {
                        wx.request({
                            url: 'https://wx.gzqskjw.com/index.php?c=User&a=login',
                            data: {
                                uname: that.data.uname,
                                upic: that.data.upic,
                                ulocation: that.data.ulocation,
                                sex: that.data.sex,
                                openid: that.data.openid,
                                uwechat: wechat,
                                uroom: room,
                                uphone: phone,
                                ucity:ucity,
                                ucampus:ucampus,
                                schoolage:schoolage
                            },
                            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                            // header: {}, // 设置请求的 header
                            success: function (res) {
                              console.log('注册用户成功后返回' + res.data[0].uid);
                                wx.setStorage({
                                  key: 'uid',
                                  data:  res.data[0].uid,
                                  success: function(res){
                                      var rurl = that.data.p;
                                    wx.redirectTo({
                                       url: '../' + rurl + '/' + rurl
                                    })
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
                }
            })
        }
    },
    backIndex:function(event){
      wx.switchTab({
        url: '../index/index',
      })
    }
})
