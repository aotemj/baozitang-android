$(function(){
	//动态设置历史作业高度
	var liLength = $('.history-home li').length;
	var liHeight = $('.history-home li').height();
	console.log(liLength);
	console.log(liHeight);
	var ulHeight = liLength*liHeight+500;
	console.log(ulHeight);
	$('.history-home').height(ulHeight/75+'rem');

	//查询截止到当天，某个学员应该写的作业以及状态
	queryAllWorkFromToday({studentId:3},function(res){
		console.log(res);
		//今天要做的作业
		var todayHomework = res.data[0];
		//题目
		$('.current-homework h4').text(todayHomework.content);
		//作者
		$('.current-homework .author').text(todayHomework.author);
		//时间
		$('.current-homework .upload-time').text(timeDayFilter(todayHomework.planTime));

		//今天之前的作业：
		// var boforeTodayHomework = res.data[1];



	});
	//点击写作业
	jump('.jump','homework-list.html');

});
