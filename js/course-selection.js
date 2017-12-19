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

		//获取课程列表：
  	getCourseList(function(res){
  		console.log(res);
  		//渲染页面
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
  	})


	/*底部导航选中切换*/
	$('.footer a').on('click',function(){
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
	});
})
