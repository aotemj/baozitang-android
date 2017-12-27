$(function(){

	//获取学员所在班级列表
	getClassList(
		{
			studentId:3
		},
		function(res){
			console.log(res);
			for(var i = 0 ; i < res.data.length;i++){
				var data = res.data[i];
				$('.content>ul').append(
					'<li>'
					+'	<div class="class-title">'
					+'		<span>'+data.className+'</span>'
					+'		<i></i>'
					+'	</div>'
					+'	<div class="class-list">'
					+'		<ul>'
					+'		</ul>'
					+'	</div>'
					+'</li>'
				);
			}
			//填充每个班级的成员
			var classList = $('.content>ul li');
			console.log(classList);
			for(var i = 0;i<classList.length;i++){
				for(var j = 0 ;j< res.data[i].studentList.length;j++){
					var data = res.data[i].studentList[j];
					$('.content>ul li').eq(i).find('.class-list>ul').append(
						'<li>'
					+'	<a class="clearfix" href="#">'
					+'		<!-- 编号 -->'
					+'		<i class="fl"><span>'+data.studentId+'</span></i>'
					+'		<!-- 头像 -->'
					+'		<div class="photo fl"></div>'
					+'		<!-- 昵称 -->'
					+'		<span class="nickname">'+data.nickname+'</span>'
					+'	</a>'
					+'</li>'
					);
				}
			}

			/*点击显示隐藏班级里列表*/
			$('.class-title').on('click',function(){
				console.log('111');
				$(this).next('div').slideToggle();
				$(this).find('i').toggleClass('active');
			});
		}
	);
})
