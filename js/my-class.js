$(function(){
	/*点击显示隐藏班级里列表*/
	$('.class-title').on('click',function(){
		$(this).next('div').slideToggle();
		$(this).find('i').toggleClass('active');
});
	//获取学员所在班级列表
	getClassList(
		{
			studentId:3
		},
		function(res){
			console.log(res);
			for(var i = 0 ;i < res.data.length;i++){
				var data = res.data[i];
				$('.class-list ul').append(

				'<li>'
				+'	<div class="class-title">'
				+'		<span>'+data.className+'</span>'
				+'		<i></i>'
				+'	</div>'
				+'	<!-- 班级列表 -->'
				+'	<div class="class-list">'
				+'		<ul>'
				+'			<li>'
				+'				<a class="clearfix" href="#">'
				+'					<!-- 编号 -->'
				+'					<i class="fl"><span>01</span></i>'
				+'					<!-- 头像 -->'
				+'					<div class="photo fl"></div>'
				+'					<!-- 昵称 -->'
				+'					<span class="nickname">夏添</span>'
				+'					<!-- 行业 -->'
				+'					<span class="job">新能源开发与时长推广</span>'
				+'				</a>'
				+'			</li>'
				+'		</ul>'
				+'	</div>'
				+'</li>'


				);
			}
		}
	);
})
