$(function(){

	/*底部导航选中切换*/
	$('.footer a').on('click',function(){
		$(this).siblings().removeClass('active');
		$(this).addClass('active');;
	});
});
