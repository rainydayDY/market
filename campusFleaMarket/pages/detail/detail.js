// pages/detail/detail.js
Page({
  data: {
    medium: 'https://wx.gzqskjw.com/upload/',
    small: 'https://wx.gzqskjw.com/small/'
  },
  onLoad: function (options) {
    var postId = options.id;
    var that = this;
    that.data.postId=postId;
    wx.getStorage({
      key: 'uid',
      success: function(res) {
        that.data.uid = res.data;
        console.log('当前用户uid' + that.data.uid);
        wx.request({
          url: 'https://wx.gzqskjw.com/index.php?c=Publish&a=goodsDetail',
          data: {
            postId: postId,
            uid: res.data
          },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function (res) {
            console.log('收藏结果' + res.data[0].collect_img);
            that.setData({
              goods: res.data[0],
              goods_like: res.data[0].goods_like,
              collect_num: res.data[0].collect_num,
              gid: res.data[0].gid,
              collect_img: res.data[0].collect_img,
              comment: res.data[0].comment
            }),
              that.data.rid = res.data[0].uid;
            that.data.gname = res.data[0].goods_name;
            that.data.gcost=res.data[0].gcost;
            that.data.gprice = res.data[0].goods_price;
            that.data.imgurl = res.data[0].imgUrl;
            wx.getStorage({
              key: 'upic',
              success: function (res) {
                that.data.upic = res.data
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
    })
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
  tomsg:function(event){
    var that=this;
     if (isNaN(Number(that.data.uid))) {
      that.showModal('留言');
    } else {
       wx.redirectTo({
      url: '../message/message?uid='+that.data.uid+'&gid='+that.data.gid+'&rid='+that.data.rid+'&isreply=0',
      success: function(res){
        // success
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
    }
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: '【原价'+this.data.gcost+'平台价'+this.data.gprice+'】 '+this.data.gname, // 分享标题
      desc: this.data.gname, // 分享描述
      path: '/pages/detail/detail?id=' + this.data.postId, // 分享路径,
      imageUrl: this.data.medium+this.data.imgurl[0]
    }
  },
  reply:function(event){
    var did=event.currentTarget.dataset.rid;
    console.log('did'+did);
    var that=this;
     if (isNaN(Number(that.data.uid))) {
      that.showModal('回复');
    } else {
       wx.redirectTo({
      url: '../message/message?uid='+that.data.uid+'&gid='+that.data.gid+'&rid='+did+'&isreply=1',
      success: function(res){
        // success
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
    }
  },
  collectGoods: function (event) {
    var that = this;
    var co = new Object();
    co.upic = that.data.upic;
    if (isNaN(Number(that.data.uid))) {
      that.showModal('收藏宝贝');
    } else {
      if (that.data.goods_like == 0) {
        that.data.collect_img.push(co);
        console.log(that.data.collect_img);
        that.setData({
          goods_like: 1,
          collect_num:  Number(that.data.collect_num)+1,
          collect_img: that.data.collect_img
        });
        that.showSuccess('收藏成功！')
        wx.request({
          url: 'https://wx.gzqskjw.com/index.php?c=Publish&a=collectGoods',
          data: {
            uid: that.data.uid,
            gid: that.data.gid
          },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function (res) {
            wx.request({
              url: 'https://wx.gzqskjw.com/index.php?c=Publish&a=addNews',
              data: {
                receive: that.data.rid,
                gid: that.data.gid,
                send: that.data.uid,
                news_type:'收藏了您的宝贝哦~',
                content:''
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
      } else {
        var index = 0;
        for (var i = 0; i < that.data.collect_img.length; i++) {
          if (that.data.collect_img[i].upic == co.upic) {
            index = i;
            that.data.collect_img.splice(index, 1);
            that.setData({
              goods_like: 0,
              collect_num: Number(that.data.collect_num) - 1,
              collect_img: that.data.collect_img
            });
            that.showSuccess('取消收藏！');
            wx.request({
              url: 'https://wx.gzqskjw.com/index.php?c=Publish&a=cancelCollect',
              data: {
                uid: that.data.uid,
                gid: that.data.gid
              },
              method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
              // header: {}, // 设置请求的 header
              success: function (res) {
                wx.request({
                  url: 'https://wx.gzqskjw.com/index.php?c=Publish&a=addNews',
                  data: {
                    receive: that.data.rid,
                    gid: that.data.gid,
                    send: that.data.uid,
                    news_type: '对您的宝贝取消了收藏',
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
                // fail
              },
              complete: function (res) {
                // complete
              }
            });
            break;

          }
        }
      }
    }
  },
  checkUser: function (event) {
    var userid = event.target.dataset.user;
    var that = this;
    if (isNaN(Number(that.data.uid))) {
      that.showModal('查看卖家信息');
    } else {
      wx.request({
        url: 'https://wx.gzqskjw.com/index.php?c=Publish&a=getUser',
        data: {
          uid: userid
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          console.log(res);
          var userArray = ['他的昵称：' + res.data[0].uname, '他的地址：' + res.data[0].uroom, '他的微信：' + res.data[0].uwechat, '他的手机：' + res.data[0].uphone];
          wx.showActionSheet({
            itemList: userArray,
            success: function (res) {
              if (res.tapIndex!=undefined){
                var infoContent = userArray[res.tapIndex].split('：');
                console.log('用户操作信息为：'+infoContent);
                if(res.tapIndex==3){
                  wx.makePhoneCall({
                    phoneNumber: infoContent[1],
                  })
                }else{
                  that.clipText(infoContent)
                }
                
              }
              wx.request({
                url: 'https://wx.gzqskjw.com/index.php?c=Publish&a=addNews',
                data: {
                  receive: that.data.rid,
                  gid: that.data.gid,
                  send: that.data.uid,
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
  toCenter:function(event){
    var userid = event.target.dataset.userid;
    console.log('显示跳转id'+userid);
    wx.navigateTo({
      url: '../usercenter/usercenter?uid=' + userid
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
  previewImg: function (event) {
    var that = this;
    var list = event.target.dataset.urllist;
    var listArray = list.split(',');
    for (var i = 0; i < listArray.length; i++) {
      listArray[i] = that.data.medium + listArray[i];
    }
    var nowurl = that.data.medium + event.target.dataset.nowurl;
    wx.previewImage({
      current: nowurl, // 当前显示图片的链接，不填则默认为 urls 的第一张
      urls: listArray,
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
  backIndex:function(){
    wx.switchTab({
      url: '../index/index',
    })
  }
})