/**
 * Created by dy on 2017/4/7.
 */
$.fn.sx = function(can) {
  can = $.extend({
    nuv: ".deleteCategory", //筛选结果
    zi: "category_child", //所有筛选范围内的子类
    qingchu: '.qcqb', //清除全部
    over: 'category_active' //选中状态样式名称
  },
    can || {});
  /*删选过程*/
  $(this).find('a').click(function() {
    var url = window.location.href;
    var id = $(this).attr('rel');
    var id2 = $(this).attr('name');
    var index = $(this).index();
    var num = $(this).parent().find('a').length;
    var num2 = $(this).parents(can).length;
    if ($(this).attr('class').replace(can.zi, '').replace(/ /g, '') == "category_active") {

      var url = window.location.href;
      var pddq = $(this).attr('name') + "=" + $(this).attr('rel');
      if (url.split('&').length < 2) {
        url = url.replace('?' + pddq, '');
      //alert(url);
      } else {
        if (url.split(pddq)[0].split('&').length < 2) {
          url = url.replace(pddq + '&', '')
        } else {
          url = url.replace('&' + pddq, '')
        }
      }

    } else {
      if (url.split('?').length < 2) {
        url = url + "?" + id2 + "=" + id
      } else {
        if (url.split('&').length < 2) {
          if (url.split('?')／‘’[1].split('=')[0] == id2) {
            url = url.replace(url.split('?')[1], id2 + "=" + id)
          } else {
            url = url + "&" + id2 + "=" + id
          }
        } else {
          if (url.split(id2).length > 1) {
            if (url.split(id2)[0].split('&').length < 2) {
              url = url.replace(url.split(id2)[1].split('&')[0], "=" + id)
            } else {
              if (url.split(id2)[1].split('&').length < 2) {
                url = url.replace(id2 + url.split(id2)[1], id2 + "=" + id)
              } else {
                url = url.replace(id2 + url.split(id2)[1].split('&')[0], id2 + "=" + id)
              }
            }
          } else {
            url = url + "&" + id2 + "=" + id
          }
        }
      }
    }
    window.location.href = url
  });

  window.onload = function() {
    /*选中*/
    $("." + can.zi).each(function() {
      var url = window.location.href;
      var pddq = $(this).attr('name') + "=" + $(this).attr('rel');
      console.log(pddq);
      if (url.split(pddq).length > 1) {
        $(this).parent().children().removeClass("category_active").addClass("category_usual");
        $(this).removeClass("category_usual").addClass('category_active');
        $(can.nuv).find(can.qingchu).before("<a rel=" + $(this).attr('rel') + " name=" + $(this).attr('name') + " href='javascript:;' class='p_content category_active'>" + $(this).siblings('p').text() + $(this).text() + "</a> ")
      } else {

        $(this).removeClass('category_active').addClass("category_usual");
      }
    });
    /*清除全部按钮是否显示*/
    var url = window.location.href;
    if (url.split('?').length > 1) {
      $(can.qingchu).show();
    } else {
      $(can.qingchu).hide();
    }
    /*点击清除*/
    $(can.nuv).find('a').click(function() {
      var url = window.location.href;
      var pddq = $(this).attr('name') + "=" + $(this).attr('rel');
      if (url.split('&').length < 2) {
        url = url.replace('?' + pddq, '')
      } else {
        if (url.split(pddq)[0].split('&').length < 2) {
          url = url.replace(pddq + '&', '')
        } else {
          url = url.replace('&' + pddq, '')
        }
      }
      window.location.href = url;
    })
    /*清除全部*/
    $(can.qingchu).click(function() {
      var url = window.location.href;
      url = url.split('?')[0];
      window.location.href = url;
    })
  }
}
