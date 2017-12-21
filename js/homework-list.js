$(function(){
	//点击返回上一层目录
	$('.back').on('click',function(){
	  window.history.back();
	});

	/*点击显示隐藏班级里列表*/
	$('.class-title').on('click',function(){
		$(this).next('div').slideToggle();
		$(this).find('i').toggleClass('active');
});
	//请求作业页表
	getHomeworkList(1,function(res){
		console.log(res);
		//渲染页面：
		$('.topic h4').text(res.content);
		for(var i = 0;i<res.exerciseList.length;i++){
			var content = res.exerciseList[i];
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
