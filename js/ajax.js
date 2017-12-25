// $(function(){
	//使用用户注册的账号密码获取token（token是用户进行下一步操作的秘钥）

	//获取token所需参数
	// 登录类型(POSSWORD、CODE)
	// var  loginType = 'PASSWORD';
	//用户名
	// var  username = '13639753981';
	//密码（loginType为POSSWORD时可为空）
	// var  password = '123456';
	//验证码（loginType为CODE时可为空）
	// var  code = '';
	//字段类型（默认值）
	// var  contentType = 'application/json';
	//charset
	// var  charset = 'utf-8';
	//url
	var baseUrl = 'https://api.qingkequn.com/';

	// var url = baseUrl + '/auth/sppLogin';

	// var data = {
	// 	loginType : 'PASSWORD',
	// 	username : '13639753981',
	// 	password : '123456',
	// 	code : '',
	// }

	//封装获取token方法
	function getToken(data,callback){
		//判断本地是否存有tokenObj;
		var tokenObj = JSON.parse(window.localStorage.getItem('tokenObj'));
		if(tokenObj){
			callback(tokenObj);
			return;
		}
		//本地无tokenObj;
		 $.ajax({
			type:'post',
			url:url,
			data:{
				loginType:data.loginType,
				username:data.username,
				password:data.password,
				code:data.code,
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

				//token
				var tokenObj = {
					token:res.data.token,//token
					username:res.data.username,//用户名
					userId:res.data.userId,//用户id
					expirationDate:res.data.expirationDate,//token过期时间
					isBindUsername:res.data.isBindUsername,//是否绑定用户名
					isLogin:res.data.isLogin,//是否登录
				}
				//判断token是否过期
				var nowTime = new Date().getTime();
				var difTime = nowTime-tokenObj.expirationDate;

				//token过期，刷新
				if(difTime>0){
					var refreshUrl = baseUrl + '/auth/refresh';
					var refreshToken = 'Bearer '+ tokenObj.token;//旧token
					$.ajax({
						url:refreshUrl,
						type:'get',
						dataType:'json',
						data:{
							"Accept": "application/json",
						  "charset": "utf-8"
						},
						//添加请求头
						beforeSend: function(request) {
			        request.setRequestHeader("Authorization",refreshToken);
			     	},
			     	success:function(res){
			     		//token
			     		var tokenObj = {
			     			token:res.data.token,//token
			     			username:res.data.username,//用户名
			     			userId:res.data.userId,//用户id
			     			expirationDate:res.data.expirationDate,//token过期时间
			     			isBindUsername:res.data.isBindUsername,//是否绑定用户名
			     			isLogin:res.data.isLogin,//是否登录
			     		}
			     		//本地存储：
			     		window.localStorage.setItem('tokenObj',JSON.stringify(tokenObj));
			     		//执行回调
			     		callback(tokenObj);
			     	}
					});
				}
				//本地存储：
				window.localStorage.setItem('tokenObj',JSON.stringify(tokenObj));
				//执行回调
				callback(tokenObj);
	    }
		});
	}

	// token 和 userId 由android 提供
	 var token ='Bearer '+'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxODYyNTUxMjk4MiIsImNyZWF0ZWQiOjE1MTQxNzcwOTc3OTEsImNsaWVudCI6InpoYW94aW5sZWkiLCJleHAiOjE1MTQ3ODE4OTd9.xmIkRXt9cBt0yzfnEdtkbughGtCkXWF_2hPX-v8zmMOMvwzdbjSCWWJxTp4U6tdownmdDziULA_41XvrR5gByQ';
	 // var studentId = 3;

	//封装获取课程列表方法
	function getCourseList(studentId,callback){
		//课程开始页数
		var page = 0;
		//每页显示的数据数
		var size =10;

		var data = {
			studentId:studentId,
			page:page,
			size:size
		}

		var url = baseUrl + '/api/app/listCourse';

		$.ajax({
			type:'post',
			url:url,
			data:data,
			//添加请求头
			beforeSend: function(request) {
	      request.setRequestHeader("Authorization",token);
	   	},
			success:function(res){
				// console.log(res);
				// 错误处理：
				if(res.code!==200){
					alert(res.msg);
					return;
				}
				var courseList=[];
				for(var i = 0; i<res.data.length;i++){
					var courseObj = {
						auther :res.data[i].auther,
						category :res.data[i].category,
						courseId :res.data[i].courseId,
						image :res.data[i].image,
						name :res.data[i].name,
						price :res.data[i].price,
						progress :res.data[i].progress,
						quantity :res.data[i].quantity,
						studentId :res.data[i].studentId
					}
					courseList.push(courseObj);
				}
				//执行回调
				callback(courseList);
			}
		});
	};

	//封装获取课程目录方法 ：
	function getCourseDirectory(callback){
		//本地有课程目录
		var courseDir = JSON.parse(window.localStorage.getItem('courseDir'));
		if(courseDir){
			callback(courseDir);
			return;
		}
		//本地无课程目录
		//通过课程列表获取courseId
		getCourseList(function(res){
			//本地存储课程列表
			var courseObj = res[0];
			//获取课程id（courseId）
			var courseId = courseObj.courseId;
			console.log(courseObj);
			//获取学员id（studentId）
			var studentId = courseObj.studentId;

			var tokenObj = JSON.parse(window.localStorage.getItem('tokenObj'));
			var dirToken = 'Bearer '+ tokenObj.token;

			var couDirUrl = baseUrl + '/api/app/listCourseMenuQry';
			var data = {
				studentId:studentId,
				courseId:courseId
			}
			//请求数据：
			$.ajax({
				url:couDirUrl,
				data:data,
				type:'post',
				//添加请求头
				beforeSend: function(request) {
	        request.setRequestHeader("Authorization",dirToken);
	     	},
	     	success:function(res){
	     		//失败处理：
	     		if(res.code!==200){
	     			alert(res.msg);
	     			return;
	     		}
	     		var courseDir = res.data;
	     		callback(courseDir);
	     	}
			});
		});
	}

	//封装 获取课程章节作业习题及回答查询 方法
	function getHomeworkList(sectionId,callback){
		var homeworkList = JSON.parse(window.localStorage.getItem('homeworkList'));
		//本地存有作业习题及答案
		if(homeworkList){
			callback(homeworkList);
			return;
		}
		// getToken(data,function(res){

			var data1 = {
				"sectionId" : sectionId,
				"studentId" : studentId
			}
			var url = baseUrl + '/api/app/listworkPerSection';
			// var token ='Bearer ' + res.token;
			//没有存储作业习题及答案
			$.ajax({
				type:'post',
				data:data1,
				dataType:'json',
				url:url,
				//添加请求头
				beforeSend: function(request) {
	        request.setRequestHeader("Authorization",token);
	     	},
	     	success:function(res){
	     		//错误处理：
	     		if(res.code!==200){
	     			alert(res.msg);
	     			return;
	     		}

	     		var homeworkList = {
	     			content:res.data.content,
	     			exerciseList:res.data.exerciseList,
	     			sectionId:sectionId,
	     			submitTime:res.data.submitTime,
	     			workId:res.data.workId
	     		}
	     		//本地存储
	     		window.localStorage.setItem('homeworkList',JSON.stringify(homeworkList));
	     		callback(homeworkList);
	     	}
			});
		// })
	}

	//封装 获取问题列表方法：
	function getAnswerList(data,callback){
			var url = baseUrl+'/api/app/listQuestion';
			$.ajax({
				type:'post',
				data:data,
				dataType:'json',
				url:url,
				beforeSend:function(res){
					res.setRequestHeader('Authorization',token);
				},
				success:function(res){
					//错误处理：
					if(res.code!==200){
						alert(res.msg);
						return;
					}
					callback(res);
				}
			});
	}

	//封装 提交问题方法：
	function askQues(data,callback){
		var url = baseUrl + 'api/app/askQuestion';
		$.ajax({
			data:data,
			dataType:'json',
			type:'post',
			url:url,
			beforeSend:function(res){
				res.setRequestHeader('Authorization',token);
			},
			success:function(res){
				callback(res);
			}
		});
	}

	//封装保存作业接口
	function saveHomework(callback){
		getToken(function(res){
			var url  = 'http://192.168.10.15:8081/api/app/saveWorkAnswer';
			var data = {

			}
			$.ajax({
				type:'post',
				data:data,
				url:url,
				beforeSend:function(res){
					request.setRequestHeader("Authorization",token);
				},
				success:function(res){
					callback(res);
				}
			});
		})
	}

	//封装 查询已完成次节课程作业的学员
	// function getCompetedStu(){

	// }
// });
