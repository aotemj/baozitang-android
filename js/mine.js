var studentId = window.baozitang.getUserId();
// window.baozitang.toast(studentId);
// $(function () {

// console.log(studentId);
//获取个人信息方法
getPersonInfo(
    {
        studentId: studentId
    },
    function (res) {
        if (res.code != 200) {
            mui.toast(res.msg);
            return;
        }
        console.log(res);
        //保存获取到的res
        var passData = {
            email: res.data.email,
            headImgUrl: res.data.headimgurl,
            nickName: res.data.nickName,
            phone: res.data.phone,
            sex: res.data.sex,
            studentId: res.data.studentId,
            wxId: res.data.wxId
        }
        //设置昵称
        $('.nickname').text(passData.nickName);
        $('.photo').css({
            'animation': 'none'
        });
        $('.photo').append('<img src="" alt="">');
        $('.photo img').attr('src', passData.headImgUrl);


        //个人信息跳转
        jump('.msg', 'msg.html');

//设置页面跳转
        jump('.setting', 'setting.html', JSON.stringify(passData));

//编辑个人信息跳转
        jump('.edit', 'personal-info.html', JSON.stringify(passData));
// jump('.edit', 'personal-info.html',"");

//我的作业跳转：
        jump('.my-homework', 'my-homework.html',JSON.stringify(passData));

//我的班级跳转：
// jump('.my-class','my-class.html');
        jump('.my-class', 'my-class.html',JSON.stringify(passData));

//学习记录跳转
        jump('.learn-record', 'learn-record.html',JSON.stringify(passData));
    });


// });
