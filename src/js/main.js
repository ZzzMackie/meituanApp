require('../less/main.less');
require('../less/reset.css');
require('../webfont/iconfont.css');
// require('../less/meituanDetail.less');
require('expose-loader?$!jquery')
$(window).on('scroll',function(event){
		 event.stopPropagation();
		 event.preventDefault();
	var scrollTop = $(window).scrollTop();
	if(scrollTop >= 300){
		$('#gotop').slideDown();
	}else if(scrollTop < 300) {
		$('#gotop').slideUp();
	}
	
	
});
function getId(){
	var list = window.location.search.slice('1').split(';'),
	idNum;
	list.forEach( function(ele, index) {
		// statements
		if(ele.indexOf('id') !== -1){
			idNum = ele.slice(3);
		}
	});
	return idNum;
}

function getData(){
	$.ajax({
		type:'GET',
		url:'api/list.json',
		dataType:'json',
		timeout:8000,
		success:getGoodsInfo,
		error:(function(data) {
			/* Act on the event */
			alert('商品详情数据获取失败');
		})
	})


}

getData();

function getGoodsInfo(data){

	var dataList = data.list,
	idNum = getId(),
	len = dataList.length,
	str = '';
	
	for (var i = 0; i < len; i++) {
		console.log(dataList[i])
       	 if (dataList[i].id == idNum) {
            
            console.log(dataList[i])
           	 addDom(dataList[i]);
            	return;
       	 }
    	}


}


function addDom(data){
	var str = '';
	var info = data.info;
	console.log(info);
	$('.bigimg .pjc').attr('src',info.imgurl);
	$('.bigimg').find('.name').text(info.name);
    $('.bigimg').find('.des').text(info.des);
    $('.price-box .price').find('strong').text(info.price);
    $('.seller .address').find('h4').text(info.receive);
    $('.seller .address').find('p').text(info.adderess);
    var comment = info.comment;
    comment.forEach(function (ele, index) {
        str += '<li class="item-evaluate"><div class="foot-user clearfix">\
            <img src="'+ ele.pic + '" alt=""><div class="user-strart">\
                <h5>'+ ele.user + '</h5></div>\
            <p class="evaluate-date">'+ ele.date + '</p></div>\
        <div class="evaluate-content"><p>'+ ele.content + '</p>\
            <p><span><img src="'+ ele.img + '" alt=""></span></p>\
        </div><div class="locale"><a href="###">'+ info.receive + '</a></div></li>';
    })
    $('.food').find('ul').html(str);
}