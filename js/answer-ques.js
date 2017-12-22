$(function(){
	//点击返回上一层目录
	$('.back').on('click',function(){
	  window.history.back();
	});

	//动态获取问题盒子高度
	// var height = $(document.body).height();
	// $('.ques-list').height(height);

	// //动态显示问题输入框
	$('.ask-btn').on('click',function(){
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

	getAnswerList(1,function(res){
		console.log(res);
	});
});
