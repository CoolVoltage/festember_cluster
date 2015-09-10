(function (window, document) {

    var layout   = document.getElementById('layout'),
        menu     = document.getElementById('menu'),
        menuLink = document.getElementById('menuLink');

    function toggleClass(element, className) {
        var classes = element.className.split(/\s+/),
            length = classes.length,
            i = 0;

        for(; i < length; i++) {
          if (classes[i] === className) {
            classes.splice(i, 1);
            break;
          }
        }
        // The className is not found
        if (length === classes.length) {
            classes.push(className);
        }

        element.className = classes.join(' ');
    }

    menuLink.onclick = function (e) {
        var active = 'active';

        e.preventDefault();
        toggleClass(layout, active);
        toggleClass(menu, active);
        toggleClass(menuLink, active);

    };
	layoutSpecs();
	
	var arr1 = $("a.pure-menu-link");
	var arr2 = $("div.tabElement > a");
	if(arr2.length >0){
		$("div.tabElement").css("display","none");
		for(var i=0;i<arr1.length;i++){
			arr1[i].onclick = function(e){
				e.preventDefault();
				var j=0;
				for(j=0;j<arr1.length;j++){
					console.log(this,arr1[j]);
					if(this == arr1[j])
						break;
				}
				$(arr1).removeClass("menuLinkActive");
				$(arr1[j]).addClass("menuLinkActive");
				$(arr2[j]).trigger("click");
			}
		}
	}
	$(".clusterPic div").click(function(){
		window.location = $(this).find("a").attr("href");
		return false;
	});
	smoothScroll();
}(this, this.document));

window.onresize = function(){
	layoutSpecs();
}
function smoothScroll(){
	jQuery.extend(jQuery.easing, {
easeOutQuint: function(x, t, b, c, d) {
return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
}
});

var wheel = false,
    $docH = $('.content').height(),
    $scrollTop = $('.content').scrollTop();

$(".content").bind('scroll', function() {
		if (wheel === false) {
		$scrollTop = $(this).scrollTop();
		}
		});
$(".content").bind('DOMMouseScroll mousewheel', function(e, delta) {
		delta = delta || -e.originalEvent.detail / 3 || e.originalEvent.wheelDelta / 120;
		wheel = true;

		$scrollTop = Math.min($docH, Math.max(0, parseInt($scrollTop - delta * 30)));
		$('.content').stop().animate({
scrollTop: $scrollTop + 'px'
}, 1000, 'easeOutQuint', function() {
wheel = false;
});
		return false;
		});
}
function layoutSpecs(){

    var layoutHeight = $(window).innerHeight() - $(".header").outerHeight();
    layoutHeight = layoutHeight > 500?500:layoutHeight;
    $("#layout").outerHeight(layoutHeight);
    $(".content").outerHeight(layoutHeight - 50);
    var pos = $(".content").offset();
    if(pos.left - 150 >= 120){
	   $("#pillarPng").css("display","block");
	   $("#pillarPng").css("left",150+(pos.left-150-100)/2);

	   $("#topPillar").css("display","block");
	   $("#topPillar").css("left",150+(pos.left-150-100)/2-17);

	   $("#bottomPillar").css("display","block");
	   $("#bottomPillar").css("left",150+(pos.left-150-100)/2-19);

	   $("#menuShadow").css("display","block");
	   $("#menuShadow").css("width",150+(pos.left-150-100)/2+25);
   }else{
	   $("#pillarPng").css("display","none");
	   $("#topPillar").css("display","none");
	   $("#bottomPillar").css("display","none");
	   $("#menuShadow").css("display","none");
   }
   
}
