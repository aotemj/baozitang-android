$(function(){
	//获取个人信息
	getPersonInfo(
		{
			'studentId':2
		},
		function(res){
			console.log(res);
			//渲染页面：
			//用户头像：
			$('.photo .content img').attr('src','http://www.qqzhi.com/uploadpic/2015-02-02/211841154.jpg');
			//用户名：
			$('.nickname .item-content').val(res.data.nickName);
			//手机号：
			$('.tel .item-content').val(res.data.phone);


		//保存修改过的个人信息：
		$('.save').on('click',function(){
			var nickname = $('.nickname .item-content').val();
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
