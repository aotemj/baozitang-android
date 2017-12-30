$(function(){



	//点击返回上一层目录
	$('.back').on('click',function(){
		window.baozitang.close();
	});

	// //动态显示问题输入框
	$('.ask-btn').on('click',function(){
		$('.ask-window').slideToggle().find('input').focus();
	})

	//发送问题
	// $('.send').on('click',function(){
	// 	if($.trim($('.ask-window input').val())===""){
	// 		mui.toast('请输入内容后提交！');
	// 		return;
	// 	}
	// 	//获取问题标题和描述
	// 	var title = $.trim($('.ask-window input').val());
	// 	var desc = $.trim($('.ask-window textarea').val());

	// 	askQues(
	// 		{
	// 			studentId:3,
	// 			sectionId:1,
	// 			classId:1,
	// 			title:title,
	// 			description:desc,
	// 			category:'section',
	// 		},
	// 		function(res){
	// 			if(res.code!=200){
	// 				mui.toast(res.msg);
	// 				return;
	// 			}
	// 			// $('.ques-list').removeClass('active');
	// 			// console.log(res);
	// 			mui.toast(res.msg+'1');
	// 			//重新加载页面
	// 			$('.ques-list ul').html('');
	// 			loadAnswerList();
	// 			mui.toast(res.msg+'2');
	// 		});
	// 	// 清空输入框
	// 	$('.ask-window input').val("");
	// 	$('.ask-window textarea').val("");
	// });
		$('.send').click(function(){
		if($.trim($('.ask-window input').val())===""){
			mui.toast('请输入内容后提交！');
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
				if(res.code!=200){
					mui.toast(res.msg);
					return;
				}
				// $('.ques-list').removeClass('active');
				// console.log(res);
				mui.toast(res.msg+'1');
				//重新加载页面
				$('.ques-list ul').html('');
				loadAnswerList();
				mui.toast(res.msg+'2');
			});
		// 清空输入框
		$('.ask-window input').val("");
		$('.ask-window textarea').val("");
	});

	$('.close,.send').on('click',function(){
		$('.ask-window').slideUp();
	})

	//滚动时隐藏问题输入框
	$(window).on('scroll',function(){
		$('.ask-window').slideUp();
	});

	//页面初始化
	loadAnswerList();
	// 封装渲染页面方法
	function loadAnswerList(){
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
				console.log(res);
				//没有问题处理
				if(res.data.length == 0){
					$('.ques-list').addClass('active');
					$('.ques-list>.no-con-prompt').addClass('active');
					$('.answer').addClass('active').find('button').text('去提问');
					return;
				}
				for(var i = 0;i<res.data.length;i++){
					var data = res.data[i];
					//无描述处理
					if(data.description == undefined){
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
	}
});


