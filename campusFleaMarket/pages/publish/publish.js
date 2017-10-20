
// pages/publish/publish.js
Page({
  data: {
    uploadshow: 1,
    num: 9,
    imgArray: [],
    btn: '选择类别',
    view: 1,
    viewIndex: 8,
    selectid: 63,
    label: ['全新', '好用', '免费', '进口', '管送', '有赠品', '诚心卖'],
    larray: [],
    disable: 1,
    gpic: [],
    firstname:'一级分类',
    secondname:'二级分类',
    twoindex:'1'
  },
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'uid',
      success: function (res) {
        console.log(Number(res.data));
        that.data.uid = res.data;
        if (isNaN(Number(res.data))) {
          wx.showModal({
            title: '提示',
            content: '完善个人信息后才可发布帖子~',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '../completeInfo/completeInfo?p=publish'
                })
              }
            }
          })
        } else {
          wx.request({
            url: 'https://wx.gzqskjw.com/index.php?c=Category&a=showType',
            data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
              that.setData({ categoryList: res.data });
              wx.getStorage({
                key: 'glocate',
                success: function (res) {
                  var result = res.data.split('&');
                  that.data.glocation = result[0];
                  that.data.gcity = result[1];
                  if (that.data.glocation == undefined) {
                    that.data.glocation = '可能是在火星';
                  }
                },
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
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
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
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: '最专业的校内二手网，精选好货等你来', // 分享标题
      desc: '品质好货，值得信赖', // 分享描述
      path: '/pages/index/index' // 分享路径
    }
  },
  uploadImg: function (event) {
    var that = this;
    console.log('数组长度' + that.data.imgArray.length);
    var nownum = that.data.num - that.data.imgArray.length;
    wx.chooseImage({
      count: nownum, // 最多可以选择的图片张数，默认9
      sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        console.log(res.tempFilePaths);
        for (var i = 0; i < res.tempFilePaths.length; i++) {
          that.data.imgArray.push(res.tempFilePaths[i]);
        }
        that.setData({
          tempFilePaths: that.data.imgArray
        });
        if (that.data.imgArray.length == 9) {
          that.setData({
            uploadshow: 0
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
  
  deleteImg: function (event) {
    var that = this;
    var imgid = event.target.dataset.imgid;
    that.data.imgArray.splice(imgid, 1);
    that.setData({
      tempFilePaths: that.data.imgArray
    });
    if (that.data.imgArray.length < 9) {
      that.setData({
        uploadshow: 1
      })
    }
  },
  publishgoods: function () {
    var that = this;
    if (that.data.imgArray.length == 0) {
      that.showToast('未选择照片！', '/images/hint.png')
    } else {
      console.log('物品名' + that.data.goosname);
      if ((that.data.goosname == undefined) || (that.data.gooslabel == undefined) || (that.data.goosprice == undefined)) {
        that.showToast('信息不完整！', '/images/hint.png')
      } else {
        for (var i = 0; i < that.data.imgArray.length; i++) {
          wx.uploadFile({
            url: 'https://wx.gzqskjw.com/index.php?c=Publish&a=upload',
            filePath: that.data.imgArray[i],
            name: 'photo',
            header: {
              'content-type': 'multipart/form-data'
            }, // 设置请求的 header
            // formData: {}, // HTTP 请求中其他额外的 form data
            success: function (res) {
              that.data.gpic.push(res.data);
              that.checkDone(that.data.gpic.length);
            },
            fail: function (res) {
              that.showToast('图片上传失败!', '/images/hint.png')
            },
            complete: function (res) {
              // complete
            }
          })
        }
      }
    }

  },
  checkDone: function (len) {
    var that = this;
    if (len == that.data.imgArray.length) {
      wx.request({
        url: 'https://wx.gzqskjw.com/index.php?c=Publish&a=addGoods',
        data: {
          gname: that.data.goosname,
          glabel: that.data.gooslabel,
          gprice: that.data.goosprice,
          gpic: that.data.gpic.join(),
          gstype: that.data.selectid,
          uid: that.data.uid,
          glocation: that.data.glocation,
          gcost:that.data.gcost,
          gcity: that.data.gcity.replace('市', '')
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          wx.showToast({
            title: '发布成功！',
            icon: 'sucess',
            duration: 2000
          })
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
        fail: function (res) {
          // fail
        },
        complete: function (res) {
          // complete
        }
      })
    }
  },
  selectType: function (event) {
    var that = this;
    that.setData({
      view: 0,
      viewIndex: 0
    })
  },
  selectCategory: function (event) {
    var that = this;
    console.log(event.target.dataset.parid);
    that.setData({
      viewIndex: event.target.dataset.parid,
      firstname: event.target.dataset.parname
    });
    that.data.twoindex = event.target.dataset.parid;
  },
  toList: function (event) {
    var that = this;
    that.setData({
      view: 1,
      btn: event.target.dataset.typename,
      secondname: event.target.dataset.typename
    })
    that.data.selectid = event.target.dataset.typeid;
  },
  showFirst:function(event){
    var that=this;
    that.setData({
      view: 0,
      viewIndex: 0
    })
  },
  hidelayer:function(){
    this.setData({
      view: 1
    })
  },
  showSecond: function (event) {
    var that = this;
    console.log("查看" + that.data.twoindex);
    that.setData({
      view: 0,
      viewIndex: that.data.twoindex
    })
  },
  inputPrice: function (event) {
    var that = this;
    that.data.goosprice = event.detail.value;
     if(isNaN(that.data.goosprice)){
      that.showToast('价格必须是纯数字！', '/images/hint.png');
    }
  },
  inputgcost: function (event) {
    var that = this;
    that.data.gcost = event.detail.value;
    if (isNaN(that.data.gcost)) {
      that.showToast('价格必须是纯数字！', '/images/hint.png');
    }
  },
  selectLabel: function (event) {
    var that = this;
    var lid = event.target.dataset.labelid;
    that.data.larray.push(that.data.label[lid]);
    if (that.data.larray.join().length > 10) {
      that.showToast('太多了哦！', '/images/hint.png')
    } else {
      that.setData({
        labelview: that.data.larray.join()
      })
    }

  },
  inputName: function (event) {
    var that = this;
    that.data.goosname = event.detail.value;
  },
  inputLabel: function (event) {
    var that = this;
    that.data.gooslabel = event.detail.value;
    console.log(that.data.gooslabel);
    if (that.data.gooslabel.length > 20) {
      that.showToast('太多了哦！', '/images/hint.png')
    }
  },
  checknum: function (event) {
    var that = this;
    that.data.gooslabel = event.detail.value;
    if (that.data.gooslabel.length > 20) {
      that.showToast('太多了哦！', '/images/hint.png')
      that.setData({
        disable: 0
      })
    } else {
      that.setData({
        disable: 1
      })
    }
  },
  showToast: function (title, img) {
    wx.showToast({
      title: title,
      image: img,
      duration: 2000
    })
  },
  backIndex: function (event) {
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
  }
})