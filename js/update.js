var server = "http://www.dsjyw.net/assets/mobile/update.json"; //获取升级描述文件服务器地址

function update() {
	mui.ajax('http://www.dsjyw.net/assets/mobile/update.php',{
		data:{},
		dataType:'json',//服务器返回json格式数据
		type:'get',//HTTP请求类型
		timeout:10000,//超时时间设置为10秒；
		headers:{'Content-Type':'application/json'},	              
		success:function(data){
			var version=window.localStorage.getItem('version');
			var main_ver = version.substring(0,1);
			var main_update = data.Android.version.substring(0,1);
			if(main_ver<main_update){
				setTimeout(function(){
					plus.nativeUI.confirm(data.Android.note, function(event) {
						if (0 == event.index) {
							plus.runtime.openURL(data.Android.url);
						}
					}, data.title, ["立即更新", "取　　消"]);
				},5000)
				
			}
		},
		error:function(xhr,type,errorThrown){
			//异常处理；
			console.log(type);
		}
	});
	
}

mui.os.plus && !mui.os.stream && mui.plusReady(update);