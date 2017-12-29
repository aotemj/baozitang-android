$(function(){
	//返回跳转
	jump('.back','mine.html');
	//获取个人信息
	getPersonInfo(
		{
			'studentId':2
		},
		function(res){
			console.log(res);
			//渲染页面：
			//用户头像：
			$('.inner-photo').css({
				'animation':'none'
			}).append('<img src="https://api.qingkequn.com/student.png">');
			//用户名：
			$('.nickname .item-content').val(res.data.nickName);
			//手机号：
			$('.tel .item-content').val(res.data.phone);


		//保存修改过的个人信息：
		$('.save').on('click',function(){
			var nickname = $('.nickname .item-content').val();
			if($.trim(nickname)==''){
				mui.toast('请输入内容后提交！');
				return;
			}
			savePersonInfo(
				{
					'studentId':res.data.studentId,
					'nickName':nickname
				},
				function(res){
					console.log(res);
					//错误处理：
					if(res.code!= 200){
						mui.toast(res.msg);
						return;
					}
					mui.toast(res.msg);
				});
		});
	});
});
