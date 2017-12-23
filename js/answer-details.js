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
	$('.answer').on('click',function(){
		console.log('111');
		$('.ask-window').slideToggle().find('input').focus();
	})
	$('.close,.send').on('click',function(){
		$('.ask-window').slideUp();
	})
	//滚动时隐藏问题输入框
	$(window).on('scroll',function(){
		$('.ask-window').slideUp();
	});
});
