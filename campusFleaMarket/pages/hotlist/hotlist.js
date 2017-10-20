// pages/list/list.js
Page({
  data: {
    select: 32,
    sort: 3,
    isload: 0,
    listArray: [],
    page: 0,
    not: 1,
    time: 'desc',
    sort: 'pubtime',
    cata_id: 2
  },
  onLoad: function (options) {
    var action = options.action;
    var that = this;
    that.data.action = action;
    that.data.actionHeader = action+'collect';
    that.data.uid = options.uid;
    that.data.original=action;
    wx.getStorage({
      key: 'sname',
      success: function (res) {
        that.setData({
          gcity: res.data,
          cityname: res.data.substr(0, 6)
        });
        that.data.page = 0;
        that.reqList('1');
      },
      fail: function () {
        wx.getLocation({
          type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
          success: function (res) {
            console.log('当前位置' + res.accuracy);
            wx.request({
              url: 'https://wx.gzqskjw.com/index.php?c=User&a=locate',
              data: {
                latitude: res.latitude,
                longitude: res.longitude
              },
              method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
              // header: {}, // 设置请求的 header
              success: function (res) {
                console.log(res.data);
                var result = res.data.split('&');
                that.setData({
                  gcity: result[1].replace('市', '')
                });
                that.reqList('2');
                wx.setStorage({
                  key: 'glocate',
                  data: res.data,
                });
              },
              fail: function (res) {
                wx.setStorage({
                  key: 'glocate',
                  data: '可能是在火星',
                });
              }
            })
          },
          fail: function (res) {
            wx.setStorage({
              key: 'glocate',
              data: '可能是在火星',
            });
          }
        });
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
  onReachBottom: function (event) {
    var that = this;
    that.setData({
      isload: 1
    }),
      that.reqList('3');

  },
  reqList:function(e){
    var that=this;
    wx.request({
      url: 'https://wx.gzqskjw.com/index.php?c=Publish&a=' + that.data.action,
      data: {
        uid: that.data.uid,
        time: that.data.time,
        sort: that.data.sort,
        page: that.data.page,
        gcity: that.data.gcity
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log(res);
        if (res.data.length == 0) {
          that.setData({
            not: 0,
            isload: 0
          })
        } else {
          for (var i = 0; i < res.data.length; i++) {
            that.data.listArray.push(res.data[i]);
          }
          that.setData({
            goods_key: that.data.listArray,
            cata_id: that.data.cata_id
          });
          that.data.page += 1;
        }
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
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
  backto: function (event) {
    wx.switchTab({
      url: '../index/index',
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
  },
  sortPrice: function (event) {
    var that = this;
    var cataid = event.target.dataset.cataid;
    if (cataid == 1) {
      //上选下不选
      that.setData({
        select: 12,
        sort: 1
      }),
        that.data.sort = 'gprice';
      that.data.time = 'desc';
      that.data.page = 0;
      that.data.listArray = [];
      that.data.action = that.data.original;
      wx.request({
        url: 'https://wx.gzqskjw.com/index.php?c=Publish&a=' + that.data.action,
        data: {
          uid: that.data.uid,
          time: that.data.time,
          sort: that.data.sort,
          gcity: that.data.gcity
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          that.setData({
            goods_key: res.data,
            cata_id: 2
          });
          that.data.page = 1;
          for (var i = 0; i < res.data.length; i++) {
            that.data.listArray.push(res.data[i]);
          }
        },
        fail: function (res) {
          // fail
        },
        complete: function (res) {
          // complete
        }
      })
    } else {
      that.setData({
        select: 11,
        sort: 1
      }),
        that.data.sort = 'gprice';
      that.data.time = 'asc';
      that.data.page = 0;
      that.data.listArray = [];
      that.data.action = that.data.original;
      wx.request({
        url: 'https://wx.gzqskjw.com/index.php?c=Publish&a=' + that.data.action,
        data: {
          uid: that.data.uid,
          time: that.data.time,
          sort: that.data.sort,
          gcity: that.data.gcity
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          that.setData({
            goods_key: res.data,
            cata_id: 1
          });
          that.data.page = 1;
          for (var i = 0; i < res.data.length; i++) {
            that.data.listArray.push(res.data[i]);
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
  },
  sortHot: function (event) {
    var that = this;
    var cataid = event.target.dataset.cataid;
    if (cataid == 1) {
      //上选下不选
      that.setData({
        select: 22,
        sort: 2
      }),
      that.data.sort = 'desc';
      that.data.page = 0;
      that.data.listArray = [];
      that.data.action = that.data.actionHeader;
      wx.request({
        url: 'https://wx.gzqskjw.com/index.php?c=Publish&a=' + that.data.action,
        data: {
          uid: that.data.uid,
          sort: that.data.sort,
          gcity: that.data.gcity
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          console.log(res);
          that.setData({
            goods_key: res.data,
            cata_id: 2
          });
          that.data.page = 1;
          for (var i = 0; i < res.data.length; i++) {
            that.data.listArray.push(res.data[i]);
          }
        },
        fail: function (res) {
          // fail
        },
        complete: function (res) {
          // complete
        }
      })
    } else {
      that.setData({
        select: 21,
        sort: 2
      }),
      that.data.sort = 'asc';
      that.data.page = 0;
      that.data.listArray = [];
      that.data.action = that.data.actionHeader;
      wx.request({
        url: 'https://wx.gzqskjw.com/index.php?c=Publish&a=' + that.data.action ,
        data: {
          uid: that.data.uid,
          sort: that.data.sort,
          gcity: that.data.gcity
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          console.log(res);
          that.setData({
            goods_key: res.data,
            cata_id: 1
          });
          that.data.page = 1;
          for (var i = 0; i < res.data.length; i++) {
            that.data.listArray.push(res.data[i]);
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
  },
  sortTime: function (event) {
    var that = this;
    var cataid = event.target.dataset.cataid;
    if (cataid == 1) {
      //上选下不选
      that.setData({
        select: 32,
        sort: 3
      }),
      that.data.sort = 'pubtime';
      that.data.time = 'desc';
      that.data.page = 0;
      that.data.listArray = [];
      that.data.action = that.data.original;
      wx.request({
        url: 'https://wx.gzqskjw.com/index.php?c=Publish&a=' + that.data.action,
        data: {
          uid: that.data.uid,
          time: that.data.time,
          sort: that.data.sort,
          gcity: that.data.gcity
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          that.setData({
            goods_key: res.data,
            cata_id: 2
          });
          that.data.page = 1;
          for (var i = 0; i < res.data.length; i++) {
            that.data.listArray.push(res.data[i]);
          }
        },
        fail: function (res) {
          // fail
        },
        complete: function (res) {
          // complete
        }
      })
    } else {
      that.setData({
        select: 31,
        sort: 3
      }),
      that.data.sort = 'pubtime';
      that.data.time = 'asc';
      that.data.page = 0;
      that.data.listArray = [];
      that.data.action = that.data.original;
      wx.request({
        url: 'https://wx.gzqskjw.com/index.php?c=Publish&a=' + that.data.action,
        data: {
          uid: that.data.uid,
          time: that.data.time,
          sort: that.data.sort,
          gcity: that.data.gcity
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          that.setData({
            goods_key: res.data,
            cata_id: 1
          });
          that.data.page = 1;
          for (var i = 0; i < res.data.length; i++) {
            that.data.listArray.push(res.data[i]);
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
  },
  backIndex: function () {
    wx.switchTab({
      url: '../index/index',
    })
  }
})