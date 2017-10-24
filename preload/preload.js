//图片预加载：将插件写在局部作用域中，使得js插件和外部作用域互不影响，但是js没有局部作用域，一般使用闭包来模拟局部作用域，这样里面的变量和外部没冲突
(function($) {
  function preLoad(imgs, options) {
    this.imgs = (typeof imgs === 'string' ? [imgs] : imgs); //一张图片也可以传递路径的字符串，所以要加判断
    this.options = $.extend({}, preLoad.DEFAULT, options); // 如果用户未传递值，就使用默认值，
      // console.log('第一步options'+options);
    this._unordered();
  }
  preLoad.DEFAULT = {
    each: null, //每张图片加载完后执行
    all: null //所有图片加载完执行
  }
  preLoad.prototype._unordered = function() {
    var imgs = this.imgs,
      opts = this.options,
      count=0,
      len=imgs.length;
    $.each(imgs, function(i, src) {
      if (typeof src != 'string') return; //首先判断是不是字符串
      var imgObj = new Image();
      $(imgObj).on('load error', function() {
        opts.each&&opts.each(count); //先判断用户是否传入each这个参数，没传入的话就是null
        if (count>=len-1){
          opts.all&&opts.all();
        }
        count++;
      });
      imgObj.src=src;
    })
  };
  //jQuery调用插件方式
  //$.fn.extend->$('#img').preLoad();
  //$.extend->$.preLoad;
  $.extend({
    preLoad:function(imgs,opts){
      new preLoad(imgs,opts);//实例化构造函数

    }
  })
})(jQuery)
