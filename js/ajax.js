//请求公共头
var baseUrl = 'https://api.qingkequn.com/';
// var baseUrl = 'http://192.168.10.15:8081/';

//获取token:
// var token = window.baozitang.getAuth();
// mui.toast(getToken);

// token 和 userId 由android 提供
// var token = window.baozitang.getAuth();
var token = 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMzYzOTc1Mzk4MSIsImNyZWF0ZWQiOjE1MTQ3OTEwODMwMTcsImNsaWVudCI6IjExMTExMSIsImV4cCI6MTUxNTM5NTg4M30.OkzfdNFVLZH8h5vHOqt9pgSCn4lw6Dq4X79Uw5ms3WR2gWFESr4TE5H3YbeG_yagq1TZCm3mS-XvPh3fOabqXw';
// var studentId = 3;

//封装获取课程列表方法
function getCourseList(data, callback) {
    //课程开始页数
    // var page = 1;
    //每页显示的数据数
    data.size = 4;
    var url = baseUrl + '/api/app/listCourse';

    $.ajax({
        type: 'post',
        url: url,
        data: data,
        //添加请求头
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", token);
        },
        success: function (res) {
            // console.log(res);
            // 错误处理：
            if (res.code !== 200) {
                mui.toast(res.msg);
                return;
            }
            var courseList = [];
            for (var i = 0; i < res.data.length; i++) {
                var courseObj = {
                    auther: res.data[i].auther,
                    classId: res.data[i].classId,
                    classTypeId: res.data[i].classTypeId,
                    classTypeTitle: res.data[i].classTypeTitle,
                    courseId: res.data[i].courseId,
                    image: res.data[i].image,
                    name: res.data[i].name,
                    progress: res.data[i].progress,
                    studentId: res.data[i].studentId
                }
                courseList.push(courseObj);
            }
            //执行回调
            callback(courseList);
        }
    });
};


//封装 获取课程章节作业习题及回答查询 方法
function getHomeworkList(data, callback) {
    var url = baseUrl + 'api/app/listworkPerSection';
    $.ajax({
        type: 'post',
        data: data,
        dataType: 'json',
        url: url,
        //添加请求头
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", token);
        },
        success: function (res) {
            //错误处理：
            if (res.code !== 200) {
                mui.toast(res.msg);
                return;
            }
            callback(res);
        }
    });
}

//封装 查询截止到当天，某个学员应该写的作业以及状态
function queryAllWorkFromToday(data, callback) {
    var url = baseUrl + 'api/app/queryAllWorkFromToday';
    $.ajax({
        type: 'post',
        data: data,
        dataType: 'json',
        url: url,
        beforeSend: function (res) {
            res.setRequestHeader('Authorization', token);
        },
        success: function (res) {
            //错误处理
            if (res.code != 200) {
                mui.toast(res.msg);
            }
            callback(res);
        }
    });
}

//封装 获取问题列表方法：
function getAnswerList(data, callback) {
    var url = baseUrl + 'api/app/listQuestion';
    console.log(url);
    $.ajax({
        type: 'post',
        data: data,
        dataType: 'json',
        url: url,
        beforeSend: function (res) {
            res.setRequestHeader('Authorization', token);
        },
        success: function (res) {
            //错误处理：
            if (res.code !== 200) {
                mui.toast(res.msg);
                return;
            }
            callback(res);
        }
    });
}

//封装 提交问题方法：
function askQues(data, callback) {
    var url = baseUrl + 'api/app/askQuestion';
    $.ajax({
        data: data,
        dataType: 'json',
        type: 'post',
        url: url,
        beforeSend: function (res) {
            res.setRequestHeader('Authorization', token);
        },
        success: function (res) {
            callback(res);
        }
    });
}

//封装保存作业接口
function saveHomework(data, callback) {
    var url = baseUrl + 'api/app/saveWorkAnswer';
    $.ajax({
        type: 'post',
        data: data,
        url: url,
        beforeSend: function (res) {
            res.setRequestHeader("Authorization", token);
        },
        success: function (res) {
            callback(res);
        }
    });
}

//封装提交作业接口
function submitHomework(data, callback) {
    var url = baseUrl + 'api/app/submitWorks';
    $.ajax({
        type: 'post',
        data: data,
        dataType: 'json',
        url: url,
        beforeSend: function (res) {
            res.setRequestHeader("Authorization", token);
        },
        success: function (res) {
            callback(res);
        }
    });
}

//封装 查询已完成此节课程作业的学员
function getCompetedStu(data, callback) {
    var url = baseUrl + 'api/app/listStudentCompletedWork';
    $.ajax({
        type: 'post',
        data: data,
        dataType: 'json',
        url: url,
        beforeSend: function (res) {
            res.setRequestHeader('Authorization', token);
        },
        success: function (res) {
            //错误处理
            if (res.code != 200) {
                mui.toast(res.msg);
            }
            callback(res);
        }
    });
}

//封装获取个人信息方法：
function getPersonInfo(data, callback) {
    var url = baseUrl + 'api/app/findByStudentId';
    $.ajax({
        type: 'post',
        data: data,
        dataType: 'json',
        url: url,
        beforeSend: function (res) {
            res.setRequestHeader('Authorization', token);
        },
        success: function (res) {
            callback(res);
        }
    });
}

//封装保存修改过的个人信息方法：
function savePersonInfo(data, callback) {
    var url = baseUrl + 'api/app/modifyStudentInfo';
    $.ajax({
        type: 'post',
        data: data,
        dataType: 'json',
        url: url,
        beforeSend: function (res) {
            res.setRequestHeader('Authorization', token);
        },
        success: function (res) {
            callback(res);
        }
    });
}

//封装查询学员参加班级方法：
function getClassList(data, callback) {
    var url = baseUrl + 'api/app/classQryForStudent';
    $.ajax({
        type: 'post',
        data: data,
        dataType: 'json',
        url: url,
        beforeSend: function (res) {
            res.setRequestHeader('Authorization', token);
        },
        success: function (res) {
            if (res.code != 200) {
                mui.toast(res.msg);
                return;
            }
            callback(res);
        }
    });
}

//封装 获取学员学习记录方法：
function getLearnRecord(data, callback) {
    var url = baseUrl + '/api/app/qryMyStudyRecords';
    $.ajax({
        type: 'post',
        data: data,
        dataType: 'json',
        url: url,
        beforeSend: function (res) {
            res.setRequestHeader('Authorization', token);
        },
        success: function (res) {
            callback(res);
        }
    });
}

//封装 获取文稿方法：
function getMarkdown(data, callback) {
    var url = 'https://api.qingkequn.com/api/aliyun/oss/md/20171228/' + data.ID + '.md';
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: url,
        beforeSend: function (res) {
            res.setRequestHeader('Authorization', token)
        },
        success: function (res) {
            callback(res);
        }
    });

}

//封装分享作业方法：
function shareHomework(data, callback) {
    var url = baseUrl + 'api/app/shareMyWork';
    $.ajax({
        data: data,
        type: 'post',
        dataType: 'json',
        url: url,
        beforeSend: function (res) {
            res.setRequestHeader('Authorization', token);
        },
        success: function (res) {
            callback(res);
        }
    });
}