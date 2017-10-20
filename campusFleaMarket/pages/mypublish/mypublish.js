// pages/mypublish/mypublish.js
Page({
  data: {
    isload: 0,
    listArray: [],
    page: 0,
    not: 1,
    searchname: '',
    focus: 1
  },
  onLoad: function (options) {
    var that=this;
    that.data.uid=options.uid;
    if (isNaN(Number(that.data.uid))){
      that.setData({
        not: 0,
        isload: 0
      })
    }else{
      if (options.searchname) {
        var searchname = options.searchname;
        wx.request({
          url: 'https://wx.gzqskjw.com/index.php?c=Category&a=mypubsearch',
          data: {
            uid: that.data.uid,
            page: that.data.page,
            searchname: searchname
          },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function (res) {
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
          }
        })
      } else {
        wx.request({
          url: 'https://wx.gzqskjw.com/index.php?c=Category&a=mypublish',
          data: {
            uid: that.data.uid,
            page: that.data.page
          },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function (res) {
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
          }
        })
      }
    }
   
  },
  onReachBottom: function (event) {
    var that = this;
    that.setData({
      isload: 1
    }),
      wx.request({
      url: 'https://wx.gzqskjw.com/index.php?c=Category&a=mypublish',
      data: {
        uid: that.data.uid,
        page: that.data.page
      },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
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
  bindfocus: function (event) {
    this.setData({
      focus: 0
    })
  },
  bindblur: function (event) {
    var that = this;
    that.setData({
      focus: 1
    })
    that.data.searchname = event.detail.value;
  },
  search: function (event) {
    var that = this;
    wx.redirectTo({
      url: '../mypublish/mypublish?uid='+that.data.uid+'&searchname=' + that.data.searchname,
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
  deleteGoods:function(event){
    var that = this;
    var gid = event.currentTarget.dataset.gid;
    var index = event.currentTarget.dataset.goodsindex;
    console.log('删除的索引' + index);
    wx.showModal({
      title: '提示',
      content: '确定删除此物品么？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://wx.gzqskjw.com/index.php?c=Category&a=deleteGoods',
            data: {
              gid: gid
            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
              wx.showToast({
                title: '删除成功！',
                icon: 'success',
                duration: 1000
              })
              that.data.listArray.splice(index, 1);
              that.setData({
                goods_key: that.data.listArray
              });
            },
            fail: function (res) {
              // fail
            },
            complete: function (res) {
              // complete
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  changeState: function (event) {
    var that=this;
    var gid = event.currentTarget.dataset.gid;
    var index = event.currentTarget.dataset.goodsindex;
    console.log('改变状态的索引' + index);
    if (event.currentTarget.dataset.state == 1){
      wx.request({
        url: 'https://wx.gzqskjw.com/index.php?c=Category&a=changeState',
        data: {
          gid: gid,
          state:'0'
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          that.data.listArray[index].gstate=0;
          that.setData({
            goods_key: that.data.listArray
          });
          // wx.redirectTo({
          //   url: '../mypublish/mypublish?uid=' + that.data.uid,
          // });
          wx.showToast({
            title: '上架成功',
            icon: 'success',
            duration: 1000
          })
        },
        fail: function (res) {
          // fail
        },
        complete: function (res) {
          // complete
        }
      })
    }else{
      wx.request({
        url: 'https://wx.gzqskjw.com/index.php?c=Category&a=changeState',
        data: {
          gid: gid,
          state:'1'
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          // wx.redirectTo({
          //   url: '../mypublish/mypublish?uid=' + that.data.uid,
          // });
          that.data.listArray[index].gstate = 1;
          that.setData({
            goods_key: that.data.listArray
          });
          wx.showToast({
            title: '下架成功',
            icon: 'success',
            duration: 1000
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