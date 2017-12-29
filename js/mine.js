$(function(){


	//获取个人信息方法
	getPersonInfo(
		{
			studentId:2
		},
		function(res){
			console.log(res);
			//设置昵称
			$('.nickname').text(res.data.nickName);
			// $('.photo img').attr('src',res.data.headimgurl);
			$('.photo').css({
				'animation':'none'
			});
			$('.photo').append('<img src="" alt="">');
			$('.photo img').attr('src','http://www.qqzhi.com/uploadpic/2015-02-02/211841154.jpg');
		});
	//个人信息跳转
	jump('.msg','msg.html');

	//设置页面跳转
	jump('.setting','setting.html');

	//编辑个人信息跳转
	jump('.edit','personal-info.html');

	//我的作业跳转：
	jump('.my-homework','my-homework.html');

	//我的班级跳转：
	// jump('.my-class','my-class.html');
	jump('.my-class','getTokenTest.html');

	//学习记录跳转
	jump('.learn-record','learn-record.html');


});
