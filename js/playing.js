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
	$('.sub-nav ul li ').on('click',function(){
		$(this).siblings().removeClass('active').find('i').removeClass('active');
		$(this).addClass('active').find('i').addClass('active');
	});
})
