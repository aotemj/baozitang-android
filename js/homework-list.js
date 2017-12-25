$(function(){
	//点击返回上一层目录
	$('.back').on('click',function(){
	  window.history.back();
	});

	//请求作业页表
	getHomeworkList(
		{
			'sectionId' : 3,
			'studentId' : 3,
			'classId':1,
		},
		function(res){
			// 错误处理：
			if(res.code!=200){
				mui.toast(res.msg);
			}
		console.log(res);
		//渲染页面：
		$('.topic h4').text(res.data.content);
		for(var i = 0;i<res.data.exerciseList.length;i++){
			var content = res.data.exerciseList[i];
			$('.content ul').append(
				'<li>'
				+'<a href="http://192.168.10.13:3000/doing-homework.html">'
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
