$(function () {
    // 轮播图初始化
    var mySwiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        paginationClickable: true,
        centeredSlides: true,
        // autoplay: 6500,
        autoplayDisableOnInteraction: false
    })

    var page = 1;
    //获取课程列表：getCourseList(studentId,callback);
    randerCourseList();

    $('.content').on('touchmove', function () {
        page++;
        // setTimeout(function(){
        randerCourseList();
        // },250);
    });

    function randerCourseList() {
        getCourseList({
            studentId: 3,
            page: page,
        }, function (res) {
            if (res.length == 0) {
                return;
            }
            console.log(res);
            //渲染页面
            for (var i = 0; i < res.length; i++) {
                var course = res[i];
                var li = $(
                    '<li data-course-id="' + course.courseId + '" data-class-id="' + course.classId + '" data-progress ="' + course.progress + '" data-course-name="' + course.name + '" data-img-url="' + course.image + '" >'
                    + '<a href="javascript:;">'
                    + '  <div class="img">'
                    + '    <img src="http://img1.imgtn.bdimg.com/it/u=3056542012,1156986207&fm=27&gp=0.jpg" alt="">'
                    + '    <i class="play"></i>'
                    + '    <i class="listen"></i>'
                    + '  </div>'
                    + '  <div class="desc">'
                    + '    <p class="title">' + course.name + '</p>'
                    + '    <span class="author">' + course.auther + '</span>'
                    + '    <span class="learn-count"><span class="learn-percent">' + course.progress + '</span>已学</span>'
                    + '  </div>'
                    + '</a>'
                    + '</li>');
                $('.choose-box .content ul').append(li);
            }
            $('.content ul li').each(function (k, v) {
                $(this).on('click', function (event) {
                    var courseId = String($(v).attr('data-course-id')),
                        classId = String($(v).attr('data-class-id')),
                        progress = String($(v).attr('data-progress')),
                        courseName = String($(v).attr('data-course-name')),
                        imgUrl = String($(v).attr('data-img-url'));
                    console.log(imgUrl);
                    //调用安卓的打开视频的方法
                    window.baozitang.openVideo(courseId, classId, progress, courseName, imgUrl);
                    event.stopPropagation();
                });
            });
        })
    }
})
