	//请求公共头
	var baseUrl = 'https://api.qingkequn.com/';

	//获取token:
	// var getToken = window.baozitang.getAuth();
	// mui.toast(getToken);

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
					mui.toast(res.msg);
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
	     			mui.toast(res.msg);
	     			return;
	     		}
	     		var courseDir = res.data;
	     		callback(courseDir);
	     	}
			});
		});
	}

	//封装 获取课程章节作业习题及回答查询 方法
	function getHomeworkList(data,callback){
		var url = baseUrl + 'api/app/listworkPerSection';
		$.ajax({
			type:'post',
			data:data,
			dataType:'json',
			url:url,
			//添加请求头
			beforeSend: function(request) {
	      request.setRequestHeader("Authorization",token);
	   	},
	   	success:function(res){
	   		//错误处理：
	   		if(res.code!==200){
	   			mui.toast(res.msg);
	   			return;
	   		}
	   		callback(res);
	   	}
		});
	}

	//封装 查询截止到当天，某个学员应该写的作业以及状态
	function queryAllWorkFromToday(data,callback){
		var url = baseUrl + 'api/app/queryAllWorkFromToday';
		$.ajax({
			type:'post',
			data:data,
			dataType:'json',
			url:url,
			beforeSend:function(res){
				res.setRequestHeader('Authorization',token);
			},
			success:function(res){
				//错误处理
				if(res.code!=200){
					mui.toast(res.msg);
				}
				callback(res);
			}
		});
	}

	//封装 获取问题列表方法：
	function getAnswerList(data,callback){
			var url = baseUrl+'api/app/listQuestion';
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
						mui.toast(res.msg);
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
	function saveHomework(data,callback){
		var url  = baseUrl + 'api/app/saveWorkAnswer';
		$.ajax({
			type:'post',
			data:data,
			url:url,
			beforeSend:function(res){
				res.setRequestHeader("Authorization",token);
			},
			success:function(res){
				callback(res);
			}
		});
	}

	//封装提交作业接口
	function submitHomework(data,callback){
		var url = baseUrl + 'api/app/submitWorks';
		$.ajax({
			type:'post',
			data:data,
			dataType:'json',
			url:url,
			beforeSend:function(res){
				res.setRequestHeader("Authorization",token);
			},
			success:function(res){
				callback(res);
			}
		});
	}

	//封装 查询已完成此节课程作业的学员
	function getCompetedStu(data,callback){
		var url = baseUrl + 'api/app/listStudentCompletedWork';
		$.ajax({
			type:'post',
			data:data,
			dataType:'json',
			url:url,
			beforeSend:function(res){
				res.setRequestHeader('Authorization',token);
			},
			success:function(res){
				//错误处理
				if(res.code!=200){
					mui.toast(res.msg);
				}
				callback(res);
			}
		});
	}

	//封装获取个人信息方法：
	function getPersonInfo(data,callback){
		var url = baseUrl + 'api/app/findByStudentId';
		$.ajax({
			type:'post',
			data:data,
			dataType:'json',
			url:url,
			beforeSend:function(res){
				res.setRequestHeader('Authorization',token);
			},
			success:function(res){
				callback(res);
			}
		});
	}

	//封装保存修改过的个人信息方法：
	function savePersonInfo(data,callback){
		var url = baseUrl+ 'api/app/modifyStudentInfo';
		$.ajax({
			type:'post',
			data:data,
			dataType:'json',
			url:url,
			beforeSend:function(res){
				res.setRequestHeader('Authorization',token);
			},
			success:function(res){
				callback(res);
			}
		});
	}

	//封装查询学员参加班级方法：
	function getClassList(data,callback){
		var url = baseUrl +'api/app/classQryForStudent';
		$.ajax({
			type:'post',
			data:data,
			dataType:'json',
			url:url,
			beforeSend:function(res){
				res.setRequestHeader('Authorization',token);
			},
			success:function(res){
				if(res.code!=200){
					mui.toast(res.msg);
					return;
				}
				callback(res);
			}
		});
	}

	//封装 获取学员学习记录方法：
	function getLearnRecord(data,callback){
		var url = baseUrl + '/api/app/qryMyStudyRecords';
		$.ajax({
			type:'post',
			data:data,
			dataType:'json',
			url:url,
			beforeSend:function(res){
				res.setRequestHeader('Authorization',token);
			},
			success:function(res){
				callback(res);
			}
		});
	}
