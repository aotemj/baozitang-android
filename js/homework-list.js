// $(function () {
//点击返回上一层目录
$('.back').on('click', function () {
    window.baozitang.close();
});

var passData = {
    sectionId: 7,
    studentId: 3,
    classId: 1
}

//请求已完成此节课程作业的学员接口
getCompetedStu(
    {
        'sectionId': passData.sectionId
    },
    function (res) {
        // console.log(res);
        for (var i = 0; i < res.data.length; i++) {
            // 头像
            $('.completed>ul').append(
                '<li><img src="' + res.data[i].ImgUrl + '" alt=""></li>'
            );
        }
        ;
        //总人数：
        $('.completedCount').text(res.data.length);
    });

//请求作业列表
getHomeworkList(
    passData,
    function (res) {
        console.log(res);
        // 错误处理：
        if (res.code != 200) {
            mui.toast(res.msg);
        }
        // console.log(res);
        //渲染页面：
        $('.topic h4').text(res.data.content);
        for (var i = 0; i < res.data.exerciseList.length; i++) {
            var data = res.data.exerciseList[i];
            $('.content ul').append(
                '<li data-index = "' + i + '">'
                + '<div class="ques-title">'
                + '<span>问题 ' + data.exerciseId + '</span>'
                + '<button></button>'
                + '</div>'
                + '<!-- 问题内容 -->'
                + '<div class="ques-content">'
                + '<p class="">' + data.workTitle + '</p>'
                + '</div>'
                + '</li>'
            )
            var button = $('.content ul>li').eq(i).find('.ques-title>button');
            //作业已完成
            if (res.data.sectionStatus == 'COMPLETED') {
                button.css({
                    'backgroundImage': 'url("../images/end_bj.png")'
                }).on('click', function () {
                    window.baozitang.open(jumpBaseUrl + 'homework-preview.html', JSON.stringify(passData));
                });
            } else {
                //作业未完成
                button.on('click', function () {
                    passData.index = $(this).parent().parent().attr('data-index');
                    // window.baozitang.toast(passData.exerciseId);
                    window.baozitang.open(jumpBaseUrl + 'doing-homework.html', JSON.stringify(passData));
                });
            }
        }
    });
// })
