$(function(){
  //获取作业列表：
  getHomeworkList(1,function(res){
    console.log(res);
    for(var i = 0;i<res.exerciseList.length;i++){
      $('.swiper-wrapper').append(
        '<li class="swiper-slide">'
        +'  <div class="content">'
        +'    <div class="title">'
        +'      <p>'+res.exerciseList[i].workTitle+'</p>'
        +'    </div>'
        +'    <div class="inner-content">'
        +'      <i class=""></i>'
        +'      <textarea placeholder="请在此书写答案~"></textarea>'
        +'    </div>'
        +'  </div>'
        +'</li>'
        );
    }
  });

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

  //点击保存
  $('.save').on('click',function(){
    console.log('111');
    saveHomework(function(res){
      console.log(res);
    });
  });
})
/*
'<li class="swiper-slide">'
+'  <div class="content">'
+'    <div class="title">'
+'      <p>1.请结合上节课所将知识，解释供求关系一体化</p>'
+'    </div>'
+'    <div class="inner-content">'
+'      <i class=""></i>'
+'      <textarea placeholder="请在此书写答案~"></textarea>'
+'    </div>'
+'  </div>'
+'</li>'
 */
