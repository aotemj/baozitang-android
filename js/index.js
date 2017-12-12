$(function(){

	//底部导航：
	$('.footer ul li').on('click',function(){
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
	});
})
