$(function(){
  // 轮播图初始化
  var mySwiper = new Swiper ('.swiper-container', {
    pagination: '.swiper-pagination',
  nextButton: '.swiper-button-next',
  prevButton: '.swiper-button-prev',
  paginationClickable: true,
  centeredSlides: true,
  // autoplay: 6500,
  autoplayDisableOnInteraction: false,
    onSlideChangeEnd : function(swiperHere) {
      //swiperHere.activeIndex 为当前页面所在索引
      $('.choose-topic .page-number .current').text(swiperHere.activeIndex+1);
     }
   })

  //开始写作业，隐藏icon
  $(".swiper-wrapper .swiper-slide .inner-content").find('textarea').on({
    focus:function(){
      $(this).siblings().addClass('active');
    },blur:function(){
      if($(this).val().trim()===''){
        $(this).siblings().removeClass('active');
      }
    }
  });

  //作业索引：
  let total = $('.swiper-wrapper li').length;
  $('.choose-topic .page-number .total').text(total);

})
