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

})
