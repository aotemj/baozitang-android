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
	$('.swiper-pagination span').eq(0).html("班级");
	$('.swiper-pagination span').eq(1).html("精华");
	$('.swiper-pagination span').eq(2).html("作业");
	$('.swiper-pagination span').eq(3).html("问题");



	// $('.swiper-pagination span').css({
	// 	"backgroundColor":"#fff"
	// })
	$(window).on('scroll',function(){
		$('.swiper-pagination span').eq(0).html("班级");
		$('.swiper-pagination span').eq(1).html("精华");
		$('.swiper-pagination span').eq(2).html("作业");
		$('.swiper-pagination span').eq(3).html("问题");
	});

})());

