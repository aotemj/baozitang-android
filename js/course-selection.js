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

    var page = 1;
		//获取课程列表：getCourseList(studentId,callback);
  	getCourseList({
      studentId:3,
      page:page,
      },function(res){
  		console.log(res);
  		//渲染页面
  		for(var i = 0;i<res.length;i++){
  			var course = res[i];
  			$('.choose-box .content ul').append(
  				 '<li>'
  				+'<a href="../playing.html">'
  				+'	<div class="img">'
  				+'		<img src="http://img1.imgtn.bdimg.com/it/u=3056542012,1156986207&fm=27&gp=0.jpg" alt="">'
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

    $('.content').on('touchend',function(){
      page++;
      setTimeout(function(){
        getCourseList({
          studentId:3,
          page:page,
          },function(res){
          console.log(res);
          //渲染页面
          for(var i = 0;i<res.length;i++){
            var course = res[i];
            $('.choose-box .content ul').append(
               '<li>'
              +'<a href="../playing.html">'
              +'  <div class="img">'
              +'    <img src="" alt="">'
              +'    <i class="play"></i>'
              +'    <i class="listen"></i>'
              +'  </div>'
              +'  <div class="desc">'
              +'    <p class="title">'+course.name+'</p>'
              +'    <span class="author">'+course.auther+'</span>'
              +'    <span class="learn-count"><span class="learn-percent">'+course.progress+'</span>已学</span>'
              +'  </div>'
              +'</a>'
              +'</li>'
              );
          }
        })
      },500)
    });

	/*底部导航选中切换*/
	// $('.footer a').on('click',function(){
	// 	$(this).siblings().removeClass('active');
	// 	$(this).addClass('active');
	// });
})
