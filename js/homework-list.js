$(function(){
	//点击返回上一层目录
	$('.back').on('click',function(){
	  window.baozitang.close();
	});

	//请求已完成此节课程作业的学员接口
	getCompetedStu(
		{
			'sectionId':3
		},
		function(res){
			console.log(res);
			for(var i =0;i<res.data.length;i++){
				// 头像
				$('.completed>ul').append(
					'<li><img src="'+res.data[i].ImgUrl+'" alt=""></li>'
				);
			};
			//总人数：
			$('.completedCount').text(res.data.length);
	});

	//请求作业列表
	getHomeworkList(
		{
			'sectionId' : 3,
			'studentId' : 3,
			'classId': 1,
		},
		function(res){
			// 错误处理：
			if(res.code!=200){
				mui.toast(res.msg);
			}
		// console.log(res);
		//渲染页面：
		$('.topic h4').text(res.data.content);
		for(var i = 0;i<res.data.exerciseList.length;i++){
			var content = res.data.exerciseList[i];
			$('.content ul').append(
				'<li>'
				+'<a href="#">'
					+'<div class="ques-title">'
						+'<span>问题 '+content.exerciseId+'</span>'
						+'<i></i>'
					+'</div>'
					+'<!-- 问题内容 -->'
					+'<div class="ques-content">'
						+'<p class="">'+content.workTitle+'</p>'
					+'</div>'
				+'</a>'
			+'</li>'
			)
		}
	});
})
