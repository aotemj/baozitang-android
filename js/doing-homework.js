$(function(){
  var mySwiper = null;
  //当前激活的index
  var index;
  //记录滑动方向
  var dire;
  //获取作业列表：
  getHomeworkList({
    'sectionId' : 7,
    'studentId' : 3,
    'classId':1,
  },
  function(res){
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
      loop:false,
      // autoplay: 6500,
      autoplayDisableOnInteraction: false,
      onSlideChangeEnd : function(swiperHere) {
        //自动保存
        dire = swiperHere.swipeDirection;
        //下一道题
        if(dire =="next"){
          index = swiperHere.activeIndex-1;
          //上一道题
        }else{
          index = swiperHere.activeIndex+1;
        }
        save(index);
        //swiperHere.activeIndex 为当前页面所在索引
        $('.choose-topic .page-number .current').text(swiperHere.activeIndex+1);
      }
    })
    //设置点击切换
    mySwiper.nextButton.on('click',function(){
      mySwiper.swipeDirection = 'next';
    })
    mySwiper.prevButton.on('click',function(){
      mySwiper.swipeDirection = 'prev';
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
      },
      input:function(){
        activeSubmit();
      }
    });

    //点击保存
    $('.save').on('click',function(){
      index = mySwiper.activeIndex;
      save(index);
    });

    //点击提交
    $('.submit').on('click',function(){
      //获取每一条作业的内容：
      var answerContent = getContent();
      // console.log(answerContent);
      var chapterId = res.data.chapterId,
          studentId = res.data.studentId,
          courseId = res.data.courseId,
          classId = res.data.classId,
          sectionId = res.data.sectionId;
      var data = {
        chapterId:chapterId,
        studentId:studentId,
        courseId:courseId,
        classId:classId,
        sectionId:sectionId
      }
      for(var i=0;i<answerContent.length;i++){
        data['answers['+i+'].exerciseId'] = answerContent[i].exerciseId;
        data['answers['+i+'].answerContent'] = answerContent[i].answerContent;
      }
      console.log(data);
      submitHomework(data,function(res){
        //错误处理
        if(res.code!=200){
          mui.toast(res.msg);
          return;
        }
        $('.mask').css({
          'display':'block'
        });
      });
    });

    function save(index){
      // console.log(index);
      // 打印当前获得焦点的作业
      //获取当前页面的exerciseid：
      var exerciseId = res.data.exerciseList[index].exerciseId;
      //获取courseId
      var courseId = res.data.courseId;
      //获取classId
      var classId = res.data.classId;
      //studentId
      var studentId = res.data.studentId;
      //获取内容
      var answerContent = $('.swiper-wrapper .swiper-slide').eq(index).find('.inner-content textarea').val();
      if($.trim(answerContent)==""){
        mui.toast('请输入作业答案！');
        return;
      }
      // console.log(answerContent);
      saveHomework(
        {
          studentId:studentId,
          exerciseId:exerciseId,
          classId:classId,
          answerContent:answerContent,
        },
        function(res){
          // console.log(res);
          mui.toast(res.msg);
        });
    }

    function activeSubmit(){
      var listLength = $('.swiper-wrapper li').length;
      var completedCount = 0;
      for(var i = 0;i<listLength;i++){
        var textarea = $('.swiper-wrapper li').eq(i).find('textarea');
        if($.trim(textarea.val())!=""){
          completedCount++;
        }
      }
      if(listLength === completedCount){
        $('.submit').prop('disabled',false);
      }else{
        $('.submit').prop('disabled',true)
      }
    }
    //获取作业答案
    function getContent(){
      var listLength = $('.swiper-wrapper li').length;
      var answerContent = [];
      for(var i = 0 ; i<listLength;i++){
        var obj = {};
        obj.exerciseId = res.data.exerciseList[i].exerciseId;
        obj.answerContent = $('.swiper-wrapper .swiper-slide').eq(i).find('.inner-content textarea').val();
        answerContent.push(obj);
      }
      // console.log(answerContent);
      return answerContent;
    }
  });
  //提示框页面点击跳转
  jump('.mask','homework-list.html');
  //预览作业
  jump('.preview','homework-preview.html');
})

