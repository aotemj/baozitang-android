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
		$('.ask-window').slideToggle().find('input').focus();
	})

	//发送问题
	$('.send').on('click',function(){

		// $('.ask-window input').on('change',function(){
		// 	console.log('123');
		// 	console.log($(this).val());
		// })
		if($.trim($('.ask-window input').val())===""){
			alert("请输入内容后提交！");
			return;
		}
		//获取问题标题和描述
		var title = $.trim($('.ask-window input').val());
		var desc = $.trim($('.ask-window textarea').val());

		askQues(
			{
				studentId:3,
				sectionId:1,
				classId:1,
				title:title,
				description:desc,
				category:'section',
			},
			function(res){
				console.log(res);
				alert(res.msg);
				window.location.reload();
			});
	});

	$('.close,.send').on('click',function(){
		$('.ask-window').slideUp();
	})

	//滚动时隐藏问题输入框
	$(window).on('scroll',function(){
		$('.ask-window').slideUp();
	});

	//获取问题列表
	getAnswerList(
		//data
		{
			"studentId":"3",
			"sectionId":"1",
			"classId":"1"
		},
		//callback
		function(res){
			for(var i =0;i<res.data.length;i++){
				var data = res.data[i];
				//无描述处理
				if(data.description==undefined){
					data.description='';
				}
				//问题创建时间处理
				var date = timeFilter(data.createDate);

				$('.ques-list ul').append(
					'<li>'
					+'	<a href="#">'
					+'		<h4>'+data.title+'</h4>'
					+'		<p>'+data.description+'</p>'
					+'	</a>'
					+'	<div class="comments">'
					+'		<span class="time">'+date+'</span>'
					+'	</div>'
					+'</li>'
				);
			}
		});
});


