;(function($){
    $.fn.extend({
        selectone:function(options){
            var params={
              deleteall:'.deleteall',
              deleteone:'.deleteone',
              activeclass:'category_active',
              defaultclass:'category_usual',
              typebtn:'.category_child'
            }
            var opts=$.extend({},params,options),url=window.location.href;
            console.log(opts);
            window.onload=function(){
              if(url.split('?').length>1){
                $('.deleteCategory').show();
              }
              $(opts.typebtn).each(function(){
                var uname=$(this).attr('name'),
                    uvalue=$(this).attr('rel'),
                    keyassign=uname+'='+uvalue,
                    content=$(this).text();
                if(url.split(uname).length>1){
                  var midgress=url.split(uname+'=')[1].split('&')[0];
                  if(uvalue==midgress){
                    $(this).siblings().removeClass(opts.activeclass).addClass(opts.defaultclass);
                    $(this).removeClass(opts.defaultclass).addClass(opts.activeclass);
                    $(opts.deleteall).before('<a rel='+uvalue+' name='+uname+' href="javascript:;" class="p_content category_active deleteone">'+content+'</a>');
                  }
                }
              });
            }
            $(this).click(function(){
              var uname=$(this).attr('name'),
                  uvalue=$(this).attr('rel'),
                  keyassign=uname+'='+uvalue,
                  content=$(this).text();
              if(url.split('?').length<2){
                url=url+'?'+keyassign;
              }else {
                if(url.split(uname).length==2){
                  var mid=url.split(uname+'=')[1].split('&')[0];
                  url=url.replace(uname+'='+mid,keyassign);
                }else {
                  url=url+'&'+keyassign;
                }
              }
              window.location.href=url;
            });
            console.log(opts.deleteone);
            $('.deleteCategory').delegate(opts.deleteone,"click",function(){
              var uname=$(this).attr('name'),
                  uvalue=$(this).attr('rel'),
                  keyassign=uname+'='+uvalue;
                  if(url.split('&').length<2){
                    url=url.replace('?'+keyassign,'');
                  }else {
                    if(url.split(keyassign)[1]==''){
                      url=url.replace('&'+keyassign,'');
                    }else {
                      url=url.replace(keyassign+'&','');
                    }
                    console.log(url);
                  }
              window.location.href=url;
            });
            $(opts.deleteall).click(function(){
              window,location.href=url.split('?')[0];
            })
        }
    })
})(jQuery)
