$(function(){
	// // 轮播图初始化
	// var mySwiper = new Swiper ('.swiper-container', {
	//   pagination: '.swiper-pagination',
 //    nextButton: '.swiper-button-next',
 //    prevButton: '.swiper-button-prev',
 //    paginationClickable: true,
 //    centeredSlides: true,
 //    autoplay: 6500,
 //    autoplayDisableOnInteraction: false
	//  })


	// 播放列表子导航切换
	// $('.sub-nav ul li ').on('click',function(){
	// 	$(this).siblings().removeClass('active').find('i').removeClass('active');
	// 	$(this).addClass('active').find('i').addClass('active');
	// });

	//点击返回上一层目录
	$('.back').on('click',function(){
		window.history.back();
	});

	//获取播放列表
		getCourseDirectory(function(res){
			for(var i=0;i<res.length;i++){
				$('.content-list ul').append(
					'<li class="clearfix">'
					+'	<div class="status fl">'
					+'		<button></button>'
					+'	</div>'
					+'	<div class="detail fl">'
					+'		<h4>'+res[i].title+'</h4>'
					+'		<p><span class="unload-date">今天</span><span class="length">时长<span>'+res[i].timeLength+'</span></span></p>'
					+'	</div>'
					+'	<div class="todos fr clearfix">'
					+'		<div class="ask-ques fl">'
					+'			<a href="#"></a>'
					+'		</div>'
					+'		<div class="do-homework fr">'
					+'			<a href="http://192.168.10.13:3000/homework-list.html"></a>'
					+'		</div>'
					+'	</div>'
					+'</li>'
				);
			}
		});


		//切换（学习目标、评价）
	$('.sub-nav ul li').eq(0).on('click',function(){
		$(this).siblings().removeClass('active').find('i').removeClass('active');
		$(this).addClass('active');
		$(this).find('i').addClass('active');
		$('.inner-cont .content').css({'display':'block'});
		$('.inner-cont .evaluation').css({'display':'none'});
	});

	$('.sub-nav ul li').eq(1).on('click',function(){
		$(this).siblings().removeClass('active').find('i').removeClass('active');
				$(this).addClass('active');
				$(this).find('i').addClass('active');
				$('.inner-cont .content').css({'display':'none'});
				$('.inner-cont .evaluation').css({'display':'block'});
	});

	//点击切换播放文件：
	$('.content-list ul li .status button').on('click',function(){
		$(this).toggleClass('active');
		$(this).parent().parent().siblings().find('button').removeClass('active');
	});

})

/*
'<li class="clearfix">'
+'	<div class="status fl">'
+'		<button></button>'
+'	</div>'
+'	<div class="detail fl">'
+'		<h4>第一张第二节：如何管理上司第一张第二节：如何管理上司</h4>'
+'		<p><span class="unload-date">今天</span><span class="length">时长<span>11:08</span></span></p>'
+'	</div>'
+'	<div class="todos fr clearfix">'
+'		<div class="ask-ques fl">'
+'			<a href="#"></a>'
+'		</div>'
+'		<div class="do-homework fr">'
+'			<a href="#"></a>'
+'		</div>'
+'	</div>'
+'</li>'
 */
