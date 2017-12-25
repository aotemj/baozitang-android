//时间格式化
function timeFilter(date){
	var newDate = new Date(date);
	var year = newDate.getFullYear();
	var month = newDate.getMonth()+1;
	var day = newDate.getDate();
	var hour = newDate.getHours();
	var minute = newDate.getMinutes();
	var second = newDate.getSeconds();
	second = second<10?second='0'+second:second;
	minute = minute<10?minute='0'+minute:minute;
	hour = hour<10?hour='0'+hour:hour;
	newDate = year +'-'+ month +'-'+day +'&nbsp;'+hour+':'+minute+':'+second;
	return newDate;
}
