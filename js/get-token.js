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

	//封装获取token函数
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
// });
