	//点击返回上一层目录
	$('.back').on('click',function(){
		//安卓返回上层方法
	  window.baozitang.close();
	});
	var jumpBaseUrl = 'http://192.168.11.104:3000/';
	//封装安卓跳转方法：
	function jump(selector,target){

		$(selector).on('click',function(){
			window.baozitang.open(jumpBaseUrl+target);
		});
	}
