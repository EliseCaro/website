$(document).ready(function () {

	//banner
    $('#banner').easyFader();
	
	//nav
	var oH2 = document.getElementById("mnavh"); 
	var oUl = document.getElementById("starlist");  
	oH2.onclick = function ()
	{
		var style = oUl.style;
		style.display = style.display == "block" ? "none" : "block";
		oH2.className = style.display == "block" ? "open" : ""
	}
		
    var obj=null;
    var As=document.getElementById('starlist').getElementsByTagName('a');
     obj = As[0];
     for(i=1;i<As.length;i++){if(window.location.href.indexOf(As[i].href)>=0)
     obj=As[i];}
     obj.id='selected';

 //nav menu   
   $(".menu").click(function(event) {
   $(this).children('.sub').slideToggle();
   event.stopPropagation(); 
   });
   $(".sub li").click(function(event) {
   event.stopPropagation(); 
   });
  /*
  
  search
  */
    $('.search_ico').click(function () {
        $('.search_bar').toggleClass('search_open');
        if ($('#keyboard').val().length > 2) {
            $('#keyboard').val('');
            $('#searchform').submit();
        } else {
            return false;
        }
    });
	//scroll to top
    var offset = 300,
        offset_opacity = 1200,
        scroll_top_duration = 700,
        $back_to_top = $('.cd-top');

    $(window).scroll(function () {
        ($(this).scrollTop() > offset) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
        if ($(this).scrollTop() > offset_opacity) {
            $back_to_top.addClass('cd-fade-out');
        }
    });
    $back_to_top.on('click', function (event) {
        event.preventDefault();
        $('body,html').animate({
                scrollTop: 0,
            }, scroll_top_duration
        );
    });
//scroll
    if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))) {
        window.scrollReveal = new scrollReveal({reset: true});
    };
	});