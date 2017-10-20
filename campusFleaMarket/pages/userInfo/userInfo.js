// pages/userInfo/userInfo.js
Page({
  data: {
    view: 1,
    viewIndex: 0
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // var that = this;
    // wx.getStorage({
    //   key: 'uid',
    //   success: function (res) {
    //     console.log('当前用户的uid'+res.data);
    //     that.data.uid = res.data;
       
    //     wx.request({
    //       url: 'https://wx.gzqskjw.com/index.php?c=User&a=userCenter',
    //       data: {
    //         uid: res.data
    //       },
    //       method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //       // header: {}, // 设置请求的 header
    //       success: function (res) {
    //         console.log(res.data);
    //         that.setData({
    //           userinfo: res.data[0]
    //         })
    //         if (res.data.length != 0) {
    //           that.setData({
    //             uname: res.data[0].uname,
    //             upic: res.data[0].upic,
    //             uroom: res.data[0].uroom,
    //             uwechat: res.data[0].uwechat,
    //             uphone: res.data[0].uphone,
    //             ugrade: res.data[0].ugrade
    //           })
    //         } else {
    //           wx.getStorage({
    //             key: 'uname',
    //             success: function (res) {
    //               that.setData({
    //                 uname: res.data,
    //                 ugrade: 10,
    //                 uroom: '未填写',
    //                 uwechat: '未填写',
    //                 uphone: '未填写'
    //               })
    //             }
    //           }), wx.getStorage({
    //             key: 'upic',
    //             success: function (res) {
    //               that.setData({
    //                 upic: res.data
    //               })
    //             }
    //           })
    //         }
    //       },
    //       fail: function (res) {
    //         // fail
    //       },
    //       complete: function (res) {
    //         // complete
    //       }
    //     })
    //   },
    //   fail: function (res) {
    //     // fail
    //   },
    //   complete: function (res) {
    //     // complete
    //   }
    // })


  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    var that = this;
    wx.getStorage({
      key: 'uid',
      success: function (res) {
        console.log('当前用户的uid' + res.data);
        that.data.uid = res.data;

        wx.request({
          url: 'https://wx.gzqskjw.com/index.php?c=User&a=userCenter',
          data: {
            uid: res.data
          },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function (res) {
            console.log(res.data);
            that.setData({
              userinfo: res.data[0]
            })
            if (res.data.length != 0) {
              that.setData({
                uname: res.data[0].uname,
                upic: res.data[0].upic,
                uroom: res.data[0].uroom,
                uwechat: res.data[0].uwechat,
                uphone: res.data[0].uphone,
                ugrade: res.data[0].ugrade
              })
            } else {
              wx.getStorage({
                key: 'uname',
                success: function (res) {
                  that.setData({
                    uname: res.data,
                    ugrade: 10,
                    uroom: '未填写',
                    uwechat: '未填写',
                    uphone: '未填写'
                  })
                }
              }), wx.getStorage({
                key: 'upic',
                success: function (res) {
                  that.setData({
                    upic: res.data
                  })
                }
              })
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
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
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
  onPullDownRefresh:function(){
    var that=this;
    wx.request({
      url: 'https://wx.gzqskjw.com/index.php?c=User&a=userCenter',
      data: {
        uid: that.data.uid
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log(res.data);
        that.setData({
          userinfo: res.data[0]
        })
        if (res.data.length != 0) {
          that.setData({
            uname: res.data[0].uname,
            upic: res.data[0].upic,
            uroom: res.data[0].uroom,
            uwechat: res.data[0].uwechat,
            uphone: res.data[0].uphone,
            ugrade: res.data[0].ugrade
          })
        } else {
          wx.getStorage({
            key: 'uname',
            success: function (res) {
              that.setData({
                uname: res.data,
                ugrade: 10,
                uroom: '未填写',
                uwechat: '未填写',
                uphone: '未填写'
              })
            }
          }), wx.getStorage({
            key: 'upic',
            success: function (res) {
              that.setData({
                upic: res.data
              })
            }
          })
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
  touserCollect: function (event) {
    var that = this;
    wx.navigateTo({
      url: '../list/list?uid=' + that.data.uid,
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
  touserPublish: function (event) {
    var that = this;
    wx.navigateTo({
      url: '../mypublish/mypublish?uid=' + that.data.uid,
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
  changePic: function (event) {
    var that = this;
    if (isNaN(Number(that.data.uid))) {
      wx.showModal({
        title: '提示',
        content: '您还没有完善个人信息哦？',
        success: function (res) {
          if (res.confirm) {
            that.toUserInfo();
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths[0];
          wx.uploadFile({
            url: 'https://wx.gzqskjw.com/index.php?c=User&a=uploadPic',
            filePath: tempFilePaths,
            name: 'photo',
            header: {
              'content-type': 'multipart/form-data'
            }, // 设置请求的 header
            // formData: {}, // HTTP 请求中其他额外的 form data
            success: function (res) {
              that.setData({
                upic: tempFilePaths
              });
              wx.request({
                url: 'https://wx.gzqskjw.com/index.php?c=User&a=changePic',
                data: {
                  upic: res.data,
                  uid: that.data.uid
                },
                method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                success: function (res) {
                  wx.showToast({
                    title: '上传成功！',
                    icon: 'success',
                    duration: 1000
                  })
                }
              })
            },
            fail: function (res) {
              wx.showToast({
                title: '图片上传失败！',
                image: '/images/hint.png',
                duration: 1000
              })
            },
            complete: function (res) {
              // complete
            }
          })
        }
      })
    }

  },
  changeName: function (event) {
    var that = this;
    if (isNaN(Number(that.data.uid))) {
      wx.showModal({
        title: '提示',
        content: '您还没有完善个人信息哦？',
        success: function (res) {
          if (res.confirm) {
            that.toUserInfo();
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      that.setData({
        view: 0,
        viewIndex: 1
      });
    }

  },
  changeRoom: function (event) {
    var that = this;
    if (that.data.uroom == "未填写") {
      that.toUserInfo();
    } else {
      that.setData({
        view: 0,
        viewIndex: 2
      });
    }

  },
  toUserInfo: function () {
    wx.showModal({
      title: '提示',
      content: '去完善个人信息',
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
  changeWexin: function (event) {
    var that = this;
    if (that.data.uwechat == "未填写") {
      that.toUserInfo();
    } else {
      that.setData({
        view: 0,
        viewIndex: 3
      });
    }
  },
  changeTel: function (event) {
    var that = this;
    if (that.data.uphone == "未填写") {
      that.toUserInfo();
    } else {
      that.setData({
        view: 0,
        viewIndex: 4
      });
    }
  },
  bindblur: function (event) {
    var that = this;
    var viewid = event.currentTarget.dataset.viewid;
    console.log(viewid);
    if (viewid == 0) {
      that.data.uname = event.detail.value;
    } else if (viewid == 1) {
      that.data.uroom = event.detail.value;
    } else if (viewid == 2) {
      that.data.uwechat = event.detail.value;
    } else if (viewid == 3) {
      that.data.uphone = event.detail.value;
    }
  },
  submitName: function (event) {
    var that = this;
    console.log(that.data.uname)
    if (that.data.uname != "") {
      wx.request({
        url: 'https://wx.gzqskjw.com/index.php?c=User&a=changeName',
        data: {
          uname: that.data.uname,
          uid: that.data.uid
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        success: function (res) {
          wx.showToast({
            title: '修改成功！',
            icon: 'success',
            duration: 1000
          });
          that.setData({
            view: 1,
            uname: that.data.uname
          })
        }
      })
    } else {
      wx.showToast({
        title: '不能为空！',
        image: '/images/hint.png',
        duration: 1000
      })
    }
  },
  submitRoom: function (event) {
    var that = this;
    console.log(that.data.uname)
    if (that.data.uname != "") {
      wx.request({
        url: 'https://wx.gzqskjw.com/index.php?c=User&a=changeRoom',
        data: {
          uroom: that.data.uroom,
          uid: that.data.uid
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        success: function (res) {
          wx.showToast({
            title: '修改成功！',
            icon: 'success',
            duration: 1000
          });
          that.setData({
            view: 1,
            uroom: that.data.uroom
          })
        }
      })
    } else {
      wx.showToast({
        title: '不能为空！',
        image: '/images/hint.png',
        duration: 1000
      })
    }
  },
  submitWeixin: function (event) {
    var that = this;
    console.log(that.data.uname)
    if (that.data.uname != "") {
      wx.request({
        url: 'https://wx.gzqskjw.com/index.php?c=User&a=changeWexin',
        data: {
          uwechat: that.data.uwechat,
          uid: that.data.uid
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        success: function (res) {
          wx.showToast({
            title: '修改成功！',
            icon: 'success',
            duration: 1000
          });
          that.setData({
            view: 1,
            uwechat: that.data.uwechat
          })
        }
      })
    } else {
      wx.showToast({
        title: '不能为空！',
        image: '/images/hint.png',
        duration: 1000
      })
    }
  },
  submitTel: function (event) {
    var that = this;
    console.log(that.data.uname)
    if (that.data.uname != "") {
      wx.request({
        url: 'https://wx.gzqskjw.com/index.php?c=User&a=changeTel',
        data: {
          uphone: that.data.uphone,
          uid: that.data.uid
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        success: function (res) {
          wx.showToast({
            title: '修改成功！',
            icon: 'success',
            duration: 1000
          });
          that.setData({
            view: 1,
            uphone: that.data.uphone
          })
        }
      })
    } else {
      wx.showToast({
        title: '不能为空！',
        image: '/images/hint.png',
        duration: 1000
      })
    }
  },
  cancel: function (event) {
    this.setData({
      view: 1
    })
  },
  tonews:function(event){
    var that=this;
    wx.navigateTo({
      url: '../news/news?uid=' + that.data.uid,
    })
  }
});

