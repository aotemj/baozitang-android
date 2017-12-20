$(function(){
	//动态设置历史作业高度
	// var liLength = $('.history-home li').length;
	// var liHeight = $('.history-home li').height();
	// console.log(liLength);
	// console.log(liHeight);
	// var ulHeight = liLength*liHeight+500;
	// console.log(ulHeight);
	// $('.history-home').height(ulHeight/75+'rem');

	//点击添加问题弹出输入问题框
	$('button.answer').on('click',function(){
		$('.edit').css({"display":"block"}).find('.content').focus();
	});
	$('.edit .content').on("blur",function(){
		$('.edit').css({'display':'none'});
	});
	$(window).on('scroll',function(){
		$('.edit').css({'display':'none'});
	});
});
