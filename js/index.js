	//点击返回上一层目录
	$('.back').on('click',function(){
		//安卓返回上层方法
	  window.baozitang.close();
	});
	//封装安卓跳转方法：
	function jump(selector,target){
		var baseUrl = 'http://192.168.11.101:3000/';
		$(selector).on('click',function(){
			window.baozitang.open(baseUrl+target);
		});
	}
