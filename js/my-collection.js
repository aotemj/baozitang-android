$((function(){
	// 轮播图初始化
	var mySwiper = new Swiper ('.swiper-container', {
	  pagination: '.swiper-pagination',
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    paginationClickable: true,
    centeredSlides: true,
    // autoplay: 6500,
    autoplayDisableOnInteraction: false,
    //当前页面
    onSlideChangeEnd : function(swiperHere) {
      //swiperHere.activeIndex 为当前页面所在索引
			let index = swiperHere.activeIndex;

			//切换导航激活状态
			$('.choose-btn ul li').removeClass('active');
			$('.choose-btn ul li').eq(index).addClass('active');

			let left = (index*167.5+105)/75;
			console.log(left);
			$('.active-border').css({"left":left+"rem"});
     }
	 })

	$('.swiper-pagination span').eq(0).text("班级课");
	$('.swiper-pagination span').eq(1).text("校园课");
	$('.swiper-pagination span').eq(2).text("作业");
	$('.swiper-pagination span').eq(3).text("问题");

	$('.swiper-pagination span').css({
		"backgroundColor":"#fff"
	})
})());

