Page({
  data: {
    view: 1,
    viewIndex: 0,
    small: 'https://wx.gzqskjw.com/small/',
    rid:2
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    that.data.uid = options.uid;
    wx.getStorage({
      key: 'uid',
      success: function (res) {
        console.log('当前uid' + res.data);
        that.data.rid = res.data;
        wx.request({
          url: 'https://wx.gzqskjw.com/index.php?c=Publish&a=showUserInfo',
          data: {
            uid: that.data.uid
          },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function (res) {
            console.log(res.data);
            that.setData({
              userinfo: res.data[0],
              goodsinfo: res.data,
              pubnum: res.data.length,
              collectnum: res.data[res.data.length - 1]
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
    });

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
  toDetail: function (event) {
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: '../detail/detail?id=' + postId,
      success: function (res) {
        // success
        console.log("todetail");
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
  contacta: function (event) {
    var that = this;
    if (isNaN(Number(that.data.uid))) {
      that.showModal('查看卖家信息');
    }else{
      var userArray = ['他的昵称：' + that.data.userinfo.uname, '他的地址：' + that.data.userinfo.uroom, '他的微信：' + that.data.userinfo.uwechat, '他的手机：' + that.data.userinfo.uphone];
      wx.showActionSheet({
        itemList: userArray,
        success: function (res) {
          if (res.tapIndex != undefined) {
            if (res.tapIndex != undefined) {
              var infoContent = userArray[res.tapIndex].split('：');
              console.log('用户操作信息为：' + infoContent);
              if (res.tapIndex == 3) {
                wx.makePhoneCall({
                  phoneNumber: infoContent[1],
                })
              } else {
                that.clipText(infoContent)
              }

            }
          }
          wx.request({
            url: 'https://wx.gzqskjw.com/index.php?c=Publish&a=addNews',
            data: {
              receive: that.data.uid,
              gid: that.data.gid,
              send: that.data.rid,
              news_type: '查看了您的信息',
              content: ''
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
          console.log(res.errMsg)
        }
      })

    }

  },
  showModal: function (opdo) {
    wx.showModal({
      title: '提示',
      content: '完善个人信息后才可' + opdo + '哦~',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          wx.redirectTo({
            url: '../completeInfo/completeInfo?p=publish'
          })
        }
      }
    })
  },
  clipText: function (t) {
    var that = this;
    wx.setClipboardData({
      data: t[1],
      success: function (res) {
        that.showSuccess('剪贴成功')
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })

  },
  showSuccess: function (title) {
    wx.showToast({
      title: title,
      duration: 1000,
      icon: 'success',
      mask: true
    })
  },
  sendmsg:function(){
    wx.redirectTo({
      url: '../message/message?uid=' + that.data.rid + '&gid=0' + '&rid=' + that.data.uid + '&isreply=0',
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
});