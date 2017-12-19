$(function(){
	// 轮播图初始化
	var mySwiper = new Swiper ('.swiper-container', {
	  pagination: '.swiper-pagination',
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    paginationClickable: true,
    centeredSlides: true,
    autoplay: 6500,
    autoplayDisableOnInteraction: false
	 })

	//选课按钮切换：
	// $('.choose-btn ul li ').on('click',function(){
	// 	$(this).siblings().removeClass('active');
	// 	$(this).addClass('active');
	// });

	//请求课程列表：
	//填充模板：
	// '<li>'
	// +'	<div class="img">'
	// +'		<!-- 图片 -->'
	// +'		<img src="" alt="">'
	// +'		<i class="play"></i>'
	// +'		<i class="listen"></i>'
	// +'	</div>'
	// +'	<div class="desc">'
	// +'		<p class="title">第15周 班级课程：卓有成效的卓有成效的卓有成效的</p>'
	// +'		<span class="author">包政</span>'
	// +'		<span class="learn-count"><span class="learn-percent">78%</span>已学</span>'
	// +'	</div>'
	// +'</li>'

	//获取课程列表：
	//获取token：
  getToken(function(res){
		// console.log(res);
		//获取到的token
		var token = 'Bearer '+res.data.token;
		//获取到的学生id
		var studentId = res.data.userId;
		//课程开始页数
		var page = 0;
		//每页显示的数据数
		var size =10;

		var data = {
			studentId:studentId,
			page:page,
			size:size
		}

		var url = 'http://192.168.10.254:9000/api/app/listCourse';

		$.ajax({
			type:'post',
			url:url,
			data:data,
			//添加请求头
			beforeSend: function(request) {
        request.setRequestHeader("Authorization",token);
     	},
			success:function(res){
				// 错误处理：
				if(res.code!==200){
					alert(res.msg);
					return;
				}
				console.log(res);
				//渲染页面：
				for(var i =0;i<res.data.length;i++){
					var course = res.data[i];
					$('.choose-box .content ul').append(
						'<li>'
						+'<a href="#">'
						+'	<div class="img">'
						+'		<img src="" alt="">'
						+'		<i class="play"></i>'
						+'		<i class="listen"></i>'
						+'	</div>'
						+'	<div class="desc">'
						+'		<p class="title">'+course.name+'</p>'
						+'		<span class="author">'+course.auther+'</span>'
						+'		<span class="learn-count"><span class="learn-percent">'+course.progress+'</span>已学</span>'
						+'	</div>'
						+'</a>'
						+'</li>'
						);
				}
			}
		});
  });


	/*底部导航选中切换*/
	$('.footer a').on('click',function(){
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
	});
})
