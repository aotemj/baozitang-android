$(function(){
	//点击返回上一层目录
	$('.back').on('click',function(){
	  window.history.back();
	});
	//动态设置历史作业高度
	// var liLength = $('.history-home li').length;
	// var liHeight = $('.history-home li').height();
	// console.log(liLength);
	// console.log(liHeight);
	// var ulHeight = liLength*liHeight+500;
	// console.log(ulHeight);
	// $('.history-home').height(ulHeight/75+'rem');

		//动态获取问题盒子高度
		var height = $(document.body).height();
		$('.ques-list').height(height);
});
