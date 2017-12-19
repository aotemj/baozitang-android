// $(function(){
	//使用用户注册的账号密码获取token（token是用户进行下一步操作的秘钥）

	//获取token所需参数
	// 登录类型(POSSWORD、CODE)
	var  loginType = 'PASSWORD';
	//用户名
	var  username = '13639753981';
	//密码（loginType为POSSWORD时可为空）
	var  password = '123456';
	//验证码（loginType为CODE时可为空）
	var  code = '';
	//字段类型（默认值）
	var  contentType = 'application/json';
	//charset
	var  charset = 'utf-8';
	//url
	var url = 'http://192.168.10.254:9000/auth/sppLogin';

	//封装获取token方法
	function getToken(callback){
		 $.ajax({
			type:'post',
			url:url,
			data:{
				loginType:loginType,
				username:username,
				password:password,
				code:code,
				"Content-type":contentType,
				charset:charset
			},
			dataType:'json',
			success:function(res){
				// console.log(res);
				//获取失败
				if(res.code!==200){
					alert(res.msg);
					return;
				}
				//实行
				callback(res);
	    }
		});
	}

	//封装获取课程列表方法
	function getCourseList(callback){
		  getToken(function(res){
				// console.log(res);
				//获取到的token
				var token = 'Bearer '+res.data.token;
				//获取到的学生id
				var studentId = res.data.userId;
				//课程开始页数
				var page = 0;
				//每页显示的数据数
				var size =10;

				var data = {
					studentId:studentId,
					page:page,
					size:size
				}

				var url = 'http://192.168.10.254:9000/api/app/listCourse';

				$.ajax({
					type:'post',
					url:url,
					data:data,
					//添加请求头
					beforeSend: function(request) {
		        request.setRequestHeader("Authorization",token);
		     	},
					success:function(res){
						// 错误处理：
						if(res.code!==200){
							alert(res.msg);
							return;
						}
						//callback
						callback(res);
					}
				});
		  });
	};
// });
