$(function(){
	/*点击显示隐藏班级里列表*/
	$('.class-title').on('click',function(){
		$(this).next('div').slideToggle();
		$(this).find('i').toggleClass('active');
});
})
