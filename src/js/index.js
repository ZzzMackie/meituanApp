require('../less/index.less');
require('../less/reset.css');
require('../less/test2.css');
require('../plug/css/swiper.min.css');
require('../webfont/iconfont.css');
require("expose-loader?$!jquery");
// swiper插件不支持require
import Swiper from 'swiper';
$(function () {
    //初始化插件实例
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        loop: 'true',
        effect: 'cube',
        cube: {
            shadow: false,
            slideShadows: false,
        }
    });
});
$(window).on('scroll',function(event){
		 event.stopPropagation();
		 event.preventDefault();
	var scrollTop = $(window).scrollTop();
	if(scrollTop >= 500){
		$('#gotop').slideDown();
	}else if(scrollTop < 500) {
		$('#gotop').slideUp();
	}
	
	
});

function getData(){
	var url = "api/list.json"
	$.ajax({
		url:url,
		type:'GET',
		dataTypes:'json',
		success:rendom,
		erro:function(){
			alert('not found :404')
		}
	})
};
getData();
function rendom(data){
	// console.log(data)
	var str = '';
	// var img = new Image();
	data.list.forEach( function(ele, index) {
		// statements
		str += '<li class="foodspic">\
							<a href="http://localhost:8787/main.html?id='+ele.id+'" class="clearfix">\
								<img src="'+ ele.info.imgurl +'" alt="">\
								<dl>\
									<dt>'+ ele.info.name +'</dt>\
									<dd>\
										<p class="foodtitle">'+ ele.info.des +'</p>\
										<p class="price">\
											<span><strong>'+ele.info.price+'</strong><i>元</i></span>\
											<span>'+ ele.info.newUser +'</span>\
											<span>'+ ele.info.sale+'</span>\
										</p>\
									</dd>\
								</dl>\
							</a>\
						</li>'
		
		// img.src = ele.info.imgurl;
	});
	$('.guess-foodlist .list').html(str)
};
$('.btn-login').on('click',function () {
	$('.vide').show();
})
$('.btn-singUp').on('click',function () {
	$('.vide').hide();
})
// function sleep(t){
// 	return new Promise((resolve,reject)=>{
// 		setTimeout(function(){
// 			resolve();
// 		} ,t);
// 	});
// }


// (async()=>{
// 	for(let i = 0;i<10;i++){
// 		await sleep(1000);

// 		console.log(i);
// 	}
// })();