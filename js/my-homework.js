$(function(){
	//动态设置历史作业高度
	var liLength = $('.history-home li').length;
	var liHeight = $('.history-home li').height();
	console.log(liLength);
	console.log(liHeight);
	var ulHeight = liLength*liHeight+500;
	console.log(ulHeight);
	$('.history-home').height(ulHeight/75+'rem');




});
