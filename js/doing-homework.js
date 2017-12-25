$(function(){
  var mySwiper = null;
  //当前激活的index
  var index;
  //获取作业列表：
  getHomeworkList({
    'sectionId' : 7,
    'studentId' : 3,
    'classId':1,
  },function(res){
    console.log(res);
    for(var i = 0;i<res.data.exerciseList.length;i++){
      $('.swiper-wrapper').append(
        '<li class="swiper-slide">'
        +'  <div class="content">'
        +'    <div class="title">'
        +'      <p>'+res.data.exerciseList[i].workTitle+'</p>'
        +'    </div>'
        +'    <div class="inner-content">'
        +'      <i class=""></i>'
        +'      <textarea placeholder="请在此书写答案~"></textarea>'
        +'    </div>'
        +'  </div>'
        +'</li>'
        );
    }
    // 初始化作业页码
    $('.page-number .current').text(1);

    //作业索引：

    let total = $('.swiper-wrapper li').length;
    $('.choose-topic .page-number .total').text(total);

    // 轮播图初始化
     mySwiper = new Swiper ('.swiper-container', {
      pagination: '.swiper-pagination',
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      paginationClickable: true,
      centeredSlides: true,
      // autoplay: 6500,
       autoplayDisableOnInteraction: false,
         onSlideChangeEnd : function(swiperHere) {
          var dire = swiperHere.swipeDirection;
          //下一道题
          if(dire =="next"){
            index = swiperHere.activeIndex-1;
            //上一道题
          }else{
            index = swiperHere.activeIndex+1;
          }
          //swiperHere.activeIndex 为当前页面所在索引
          $('.choose-topic .page-number .current').text(swiperHere.activeIndex+1);

          save(index);
         }
     })

    //开始写作业，隐藏icon
    $('.inner-content').find('textarea').on({
      focus:function(){
        $('.inner-content i').addClass('active');
      },
      blur:function(){
        if($('.inner-content textarea').val() == ''){
          $('.inner-content i').removeClass('active');
        }
      }
    });


    //点击保存
    $('.save').on('click',function(){
      index = mySwiper.activeIndex;
      save(index);
    });
    function save(index){
      console.log(index);
      // 打印当前获得焦点的作业
      //获取当前页面的exerciseid：
      var exerciseId = res.data.exerciseList[index].exerciseId;
      //获取courseId
      var courseId = res.data.courseId;
      //获取classId
      var classId = res.data.classId;
      //获取内容
      var answerContent = $('.swiper-wrapper .swiper-slide').eq(index).find('.inner-content textarea').val();
      if($.trim(answerContent)==""){
        mui.toast('请输入作业答案！');
        return;
      }
      // console.log(answerContent);
      saveHomework(
        {
          studentId:3,
          exerciseId:exerciseId,
          classId:classId,
          answerContent:answerContent,
        },
        function(res){
          console.log(res);
          mui.toast(res.msg);
        });
  }
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
