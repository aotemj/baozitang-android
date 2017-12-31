$(function () {
    //点击返回上一层目录
    $('.back').on('click', function () {
        window.baozitang.close();
    });

    // //动态显示问题输入框
    $('.ask-btn').on('click', function () {
        $('.ask-window').slideToggle().find('input').focus();
    })

    $('.close,.send').on('click', function () {
        $('.ask-window').slideUp();
    })

    //滚动时隐藏问题输入框
    $(window).on('scroll', function () {
        $('.ask-window').slideUp();
    });
});


