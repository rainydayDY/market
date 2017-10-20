
// pages/list/list.js
Page({
  data: {
    lid: 0,
    select: 32,
    sort: 3,
    isload: 0,
    listArray: [],
    page: 0,
    not: 1,
    time: 'desc',
    sort: 'pubtime',
    action: 'showgoods',
    cata_id: 2
  },
  onLoad: function (options) {
    var lid = options.lid;
    var searchname = options.searchname;
    console.log(searchname);
    var uid = options.uid;
    var that = this;
    if (uid) {
      if (isNaN(Number(uid))) {
        that.setData({ 
          cnot: 0 
        });
      } else {
        that.data.oriaction = 'mycollect';
        that.data.action = that.data.oriaction;
        that.data.uid = uid;
        that.data.actionHeader = 'mycollect';
        wx.request({
          url: 'https://wx.gzqskjw.com/index.php?c=Category&a=' + that.data.action,
          data: {
            uid: uid,
            time: that.data.time,
            sort: that.data.sort,
            page: that.data.page,
          },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function (res) {
            console.log(res.data.length);
            if (res.data.length == 0) {
              that.setData({ cnot: 0 });
            } else {
              that.setData({
                goods_key: res.data,
                cnot: 1,
                cata_id: that.data.cata_id
              });
              that.data.page = 1;
              for (var i = 0; i < res.data.length; i++) {
                that.data.listArray.push(res.data[i]);
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

    }
    if (lid) {
      wx.getStorage({
        key: 'uid',
        success: function(res) {
          that.data.oriaction = 'tolist';
          that.data.action = that.data.oriaction;
          that.data.uid = res.data;
          that.data.tid = lid;
          that.data.actionHeader = 'tolistcollect';          
          that.getCity('1', res.data);//serch
        }
      })
    };
    if (searchname) {
      console.log(searchname);
      wx.getStorage({
        key: 'uid',
        success: function(res) {
          console.log('当前的用户' + res.data);
          that.data.oriaction = 'searchList';
          that.data.action = that.data.oriaction;
          that.data.uid = res.data;
          that.data.actionHeader = 'searchListcollect';
          that.data.searchname = searchname;
          that.getCity('2', res.data);//serch 
        },
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
  getCity: function (e,u) {
    var that = this;
    wx.getStorage({
      key: 'sname',
      success: function (res) {
        that.setData({
          gcity: res.data
        });
        that.data.page = 0;
        that.reqList('1',u);
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
  onReachBottom: function (event) {
    var that = this;
    that.setData({
      isload: 1
    }),
      wx.request({
        url: 'https://wx.gzqskjw.com/index.php?c=Category&a=' + that.data.action,
        data: {
          uid: that.data.uid,
          time: that.data.time,
          sort: that.data.sort,
          page: that.data.page,
          tid: that.data.tid,
          searchname: that.data.searchname
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
  reqList:function(e,u){
    var that=this;
    wx.request({
      url: 'https://wx.gzqskjw.com/index.php?c=Category&a=' + that.data.action,
      data: {
        uid: u,
        tid: that.data.tid,
        time: that.data.time,
        sort: that.data.sort,
        page: that.data.page,
        gcity: that.data.gcity,
        searchname: that.data.searchname
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log(res.data.length);
        if (res.data.length == 0) {
          that.setData({ not: 0 });
        } else {
          that.setData({
            goods_key: res.data,
            not: 1,
            cata_id: that.data.cata_id
          });
          that.data.page = 1;
          for (var i = 0; i < res.data.length; i++) {
            that.data.listArray.push(res.data[i]);
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
  },
  toDetail: function (event) {
    var postId = event.currentTarget.dataset.postid;
    if (event.currentTarget.dataset.state==1){
      wx.showToast({
        title: '商品已下架',
        image: '/images/hint.png',
        duration: 1000
      })
    }else{
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
    }
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
  sortPrice: function (event) {
    var that = this;
    var cataid = event.target.dataset.cataid;
    that.data.action = that.data.oriaction;
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
      wx.request({
        url: 'https://wx.gzqskjw.com/index.php?c=Category&a=' + that.data.action,
        data: {
          uid: that.data.uid,
          time: that.data.time,
          sort: that.data.sort,
          page: that.data.page,
          tid: that.data.tid,
          searchname: that.data.searchname,
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
      wx.request({
        url: 'https://wx.gzqskjw.com/index.php?c=Category&a=' + that.data.action,
        data: {
          uid: that.data.uid,
          time: that.data.time,
          sort: that.data.sort,
          page: that.data.page,
          tid: that.data.tid,
          searchname: that.data.searchname,
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
        that.data.action = that.data.actionHeader;
      that.data.time = 'desc';
      that.data.page = 0;
      that.data.listArray = [];
      wx.request({
        url: 'https://wx.gzqskjw.com/index.php?c=Category&a=' + that.data.action,
        data: {
          uid: that.data.uid,
          time: that.data.time,
          page: that.data.page,
          tid: that.data.tid,
          searchname: that.data.searchname,
          sort: 'collect',
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
        that.data.action = that.data.actionHeader;
      that.data.time = 'asc';
      that.data.page = 0;
      that.data.listArray = [];
      wx.request({
        url: 'https://wx.gzqskjw.com/index.php?c=Category&a=' + that.data.action,
        data: {
          uid: that.data.uid,
          time: that.data.time,
          page: that.data.page,
          tid: that.data.tid,
          searchname: that.data.searchname,
          sort: 'collect',
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
    that.data.action = that.data.oriaction;
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
      wx.request({
        url: 'https://wx.gzqskjw.com/index.php?c=Category&a=' + that.data.action,
        data: {
          uid: that.data.uid,
          time: that.data.time,
          sort: that.data.sort,
          page: that.data.page,
          tid: that.data.tid,
          searchname: that.data.searchname,
          gcity:that.data.gcity
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
      wx.request({
        url: 'https://wx.gzqskjw.com/index.php?c=Category&a=' + that.data.action,
        data: {
          uid: that.data.uid,
          time: that.data.time,
          sort: that.data.sort,
          page: that.data.page,
          tid: that.data.tid,
          searchname: that.data.searchname,
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