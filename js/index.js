//点击返回上一层目录
$('.back').on('click', function () {
    //安卓返回上层方法
    window.baozitang.close();
});
var jumpBaseUrl = "http://192.168.10.155:3000/";
// var jumpBaseUrl = "https://api.qingkequn.com/";
//封装安卓跳转方法：jump(选择器,目标网址,所需携带参数)
function jump(selector, target, data) {
    $(selector).on('click', function (event) {
        window.baozitang.open(jumpBaseUrl + target, data);
        //阻止事件冒泡
        event.stopPropagation();
    });

}


