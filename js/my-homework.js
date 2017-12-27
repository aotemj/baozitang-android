$(function(){
	//动态设置历史作业高度
	var height = $(window).height();
	console.log(height);
	$('.container').height(height+'/75rem');
	// var ulHeight = liLength*liHeight;
	// console.log(ulHeight);
	// $('.history-home').height(ulHeight/75+'rem');

	//查询截止到当天，某个学员应该写的作业以及状态
	queryAllWorkFromToday({studentId:1},function(res){
		console.log(res);
		//今天要做的作业
		var todayHomework = res.data.todayList;

		//今天要做的作业不为空：
		if(todayHomework.length){
			//题目
			$('.current-homework h4').text(todayHomework.content);
			//作者
			$('.current-homework .author').text(todayHomework.author);
			//时间
			$('.current-homework .upload-time').text(timeDayFilter(todayHomework.planTime));
		}else{
			$('.current-homework').css({
				'display':'none'
			});
		}

		//今天之前的作业：
		var beforeHomework = res.data.beforeList;
		for(var i = 0;i<beforeHomework.length;i++){
			var data = beforeHomework[i];
			$('.history-home').append(
				'<li>'
				+' <div class="content">'
				+' 	<div class="time">'
				+' 		<span>'+timeFilter(data.planTime)+'</span>'
				+' 	</div>'
				+' 	<div class="homework-desc">'
				+' 		<div>'
				+' 			<h4>'+data.content+'</h4>'
				+' 			<p>'+data.author+'</p>'
				+' 		</div>'
				+' 		<!-- 图标状态 -->'
				+' 		<button class="doing-homework"></button>'
				+' 	</div>'
				+' </div>'
				+'</li>'
			);
			var button = $('.history-home li').eq(i).find('.content .homework-desc>.doing-homework');
			//当天作业未完成
			if(data.workStatus=='INIT'){
				button.css({
					'backgroundImage':'url("../images/y-write_icon.png")'
				}).on('click',function(){
					window.baozitang.open(jumpBaseUrl+'homework-list.html');
				});
			}else{
				//当天作业以完成
				button.on('click',function(){
					window.baozitang.open(jumpBaseUrl+'homework-preview.html');
				});
			}
		}
	});
	//点击写作业
	jump('.jump','homework-list.html');

});
