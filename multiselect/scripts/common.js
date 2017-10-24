/**
 * Created by dy on 2017/4/7.
 */

$(document).ready(function(){
    var active_index=0;
    $(".nav_ul").children().each(function(){
        if($(this).hasClass("li_active")){
            active_index=$(this).index();
        }
        $(this).mouseenter(function(event){
            $(this).parent().children().removeClass().addClass("li_usual");
            $(this).css({"cursor":"pointer"});
            var w= $(this).width(),h=$(this).height(),mouse_x= event.pageX;
            var direction=getDirection(w,this,mouse_x);
            Animation(event,direction,this,w,h,$(this).text());
        }).mouseleave(function(event){
            $(this).css({"cursor":"pointer"});
            var w= $(this).width(),h=$(this).height(),mouse_x= event.pageX;
            var direction=getDirection(w,this,mouse_x);
            Animation(event,direction,this,w,h);
        });
        $(".nav_ul").mouseleave(function(event){
            $(this).children().eq(active_index).removeClass().addClass("li_active");
        })
    });
    function getDirection(w,e,t){
        //    判断鼠标是从元素的哪个方向进入的，结合焦点偏移量、元素偏移量以及元素尺寸
        var w_x= $(e).offset().left;
        if(t-w_x-w/2<0){
            return 0;//鼠标从元素左侧进入
        }else{
            return 1;//鼠标从元素右侧进入
        }
    }
    function Animation(t,d,e,w,h,p){
        var layer_left;
        switch(d){
            case 0:
                layer_left= "-100%";
                break;
            case 1:
                layer_left= "100%";
                break;
        }
        if(t.type=="mouseover"|| t.type=="mouseenter"){
            var div_layer=document.createElement("div");
            div_layer.className="layer";
            $(div_layer).css({
                "position":"absolute",
                "top":"0",
                "left":layer_left,
                "width":w,
                "height":h,
                "background-color":"#f9781c",
                "color":"white"
            });
            $(div_layer).text(p);
            $(e).append(div_layer);
            $(div_layer).animate({"left":"0"},200);
            $(div_layer).click(function(){
                var now_href=$(this).parent().attr("data-id");
                window.location.href=now_href;
            })
        }else{
            var layer=$(e).find(".layer");
            $(layer).animate({"left":layer_left},200,function(){
                $(this).remove();
            });
        }
    }
    var clientHeight=$("body").height();
    $(".feedback").click(function(){
        $(".cover_layer").show().css({"height":clientHeight+"px"});
        $("body").css({"overflow-y":"hidden"});
    });
    $(".feedback").mouseenter(function(){
        $(this).removeClass().addClass("feedback bg_active");
    });
    $(".feedback").mouseleave(function(){
        $(this).removeClass().addClass("feedback bg_white");
    });
    $(".toTop").click(function(){
        $("body").scrollTop(0);
    });
    $(".toTop").mouseenter(function(){
        $(this).removeClass().addClass("toTop bg_active");
    });
    $(".toTop").mouseleave(function(){
        $(this).removeClass().addClass("toTop bg_usual");
    });
    $(".close").click(function(){
        $(".cover_layer").hide();
        $("body").css({"overflow-y":"auto"});
    });
    $(".showQR").mouseenter(function(){
        $(".qr").show();
    });
    $(".showQR").mouseleave(function(){
        $(".qr").hide();
    })

});