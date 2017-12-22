$(function(){

	//点击切换标签
	$('.sub-nav ul li').on('click',function(){
		$(this).siblings().removeClass('active')
		$(this).addClass('active');
	});
});
