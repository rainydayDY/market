Page({
  data: {
    medium: 'https://wx.gzqskjw.com/upload/',
    select: 32,
    sortnum: 3,
    isload: 0,
    listArray: [],
    page: 0,
    not: 1,
    time: 'desc',
    sort: 'pubtime',
    action: 'showgoods',
    cata_id:2,
    searchname: '',
    focus: 1,
    gcity:'定位....',
    cityname:'定位....'
  },
  onLoad: function (options) {
    console.log('onload');
    wx.clearStorage();
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成
    console.log('onready');
  },
  onShow: function () {
    console.log('onshow');
    // 生命周期函数--监听页面显示
    var that = this;
    wx.login({
      success: function (res) {
        var code = res.code;
        wx.getStorage({
          key: 'uid',
          success: function (res) {
            that.data.uid = res.data;
            that.getCity('1');
            console.log("用户进入首页后通过缓存值返回的uid" + res.data);
          },
          fail: function (res) {
            wx.request({
              url: 'https://wx.gzqskjw.com/index.php?c=User&a=open',
              data: {
                code: code
              },
              method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
              // header: {}, // 设置请求的 header
              success: function (res) {
                console.log(res);
                that.data.uid = res.data;
                console.log("用户进入首页后通过code值返回的uid"+res.data);
                wx.setStorage({
                  key: 'uid',
                  data: res.data
                });
                that.getCity('1');
              }
            })
          },
          complete: function () {
            wx.getUserInfo({
              success: function (res) {
                wx.setStorage({
                  key: 'uname',
                  data: res.userInfo.nickName
                }),
                  wx.setStorage({
                    key: 'upic',
                    data: res.userInfo.avatarUrl
                  }),
                  wx.setStorage({
                    key: 'ulocation',
                    data: res.userInfo.city
                  }),
                  wx.setStorage({
                    key: 'sex',
                    data: res.userInfo.gender
                  })

              },
              fail: function (res) {
                wx.setStorage({
                  key: 'uname',
                  data: '大四一条街忠实粉丝'
                }),
                  wx.setStorage({
                    key: 'upic',
                    data: 'https://wx.gzqskjw.com/Public/categoryImg/logo.png'
                  }),
                  wx.setStorage({
                    key: 'ulocation',
                    data: '未填写'
                  }),
                  wx.setStorage({
                    key: 'sex',
                    data: '女'
                  })
              },
              complete: function (res) {
                // complete
              }
            })

          }
        })

      }
    })

  },
  onHide: function () {
    console.log('onhide');
    // 生命周期函数--监听页面隐藏
  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载
    console.log('onunload');
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: '最专业的校内二手网，精选好货等你来', // 分享标题
      desc: '品质好货，值得信赖', // 分享描述
      path: '/pages/index/index' // 分享路径
    }
  },
  onPullDownRefresh: function () {
    var that=this;
    that.data.listArray=[];
    wx.request({
      url: 'https://wx.gzqskjw.com/index.php?c=Publish&a=' + that.data.action,
      data: {
        uid: that.data.uid,
        time: that.data.time,
        sort: that.data.sort,
        page: 0,
        gcity: that.data.gcity
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        wx.stopPullDownRefresh();
        that.setData({
          goods_key: res.data,
          cata_id: that.data.cata_id
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
  },
  getCity:function(e){
    var that=this;
    wx.getStorage({
      key: 'sname',
      success: function (res) {
        that.setData({
          gcity: res.data,
          cityname:res.data.substr(0,10)
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
                  gcity: result[1].replace('市', ''),
                  cityname: result[1].replace('市', '')
                });
                that.reqList('2');
                wx.setStorage({
                  key: 'glocate',
                  data: res.data,
                });
                wx.setStorage({
                  key: 'sname',
                  data: that.data.gcity,
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
  reqList: function (e) {
    console.log(e);
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
        that.setData({
          goods_key: res.data,
          cata_id: that.data.cata_id
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
  },
  onReachBottom: function (event) {
    var that = this;
    that.setData({
      isload: 1,
      not:1
    }),
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
  publishImg: function (event) {
    wx.navigateTo({
      url: '../publish/publish',
    })
  },
  search: function (event) {
    var that = this;
    that.data.searchname = event.detail.value;
    wx.navigateTo({
      url: '../list/list?searchname=' + that.data.searchname,
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
        sortnum: 1
      }),
        that.data.sort = 'gprice';
      that.data.time = 'desc';
      that.data.action = "showgoods";
      that.data.page = 0;
      that.data.listArray = [];
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
        sortnum: 1
      }),
        that.data.sort = 'gprice';
      that.data.time = 'asc';
      that.data.action = "showgoods";
      that.data.page = 0;
      that.data.listArray = [];
      wx.request({
        url: 'https://wx.gzqskjw.com/index.php?c=Publish&a=showgoods',
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
        sortnum: 2
      }),
        that.data.action = 'collectNum';
      that.data.sort = 'desc';
      that.data.page = 0;
      that.data.listArray = [];
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
        sortnum: 2
      }),
        that.data.action = 'collectNum';
      that.data.sort = 'asc';
      that.data.page = 0;
      that.data.listArray = [];
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
        sortnum: 3
      }),
        that.data.action = 'showgoods';
      that.data.sort = 'pubtime';
      that.data.time = 'desc';
      that.data.page = 0;
      that.data.listArray = [];
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
        sortnum: 3
      }),
        that.data.action = 'showgoods';
      that.data.sort = 'pubtime';
      that.data.time = 'asc';
      that.data.page = 0;
      that.data.listArray = [];
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
  towenju:function(){
    wx.navigateTo({
      url: '../hotlist/hotlist?action=wenju&uid=' + this.data.uid
    })
  },
  togirl: function () {
    wx.navigateTo({
      url: '../hotlist/hotlist?action=girl&uid=' + this.data.uid
    })
  },
  tosport: function () {
    wx.navigateTo({
      url: '../hotlist/hotlist?action=sport&uid=' + this.data.uid
    })
  },
  tozahuo: function () {
    wx.navigateTo({
      url: '../hotlist/hotlist?action=zahuo&uid=' + this.data.uid
    })
  },
  selectcity:function(){
    wx.navigateTo({
      url: '../selectcity/selectcity',
    })
  }
})