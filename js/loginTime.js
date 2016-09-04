function setLogin(key,value){
	var curTime = new Date().getTime();
	window.localStorage.setItem(key,JSON.stringify({data:value,time:curTime}));
}

function getLogin(key,exp){
	var data = window.localStorage.getItem(key);
	var dataObj = JSON.parse(data);
	if(new Date().getTime()-dataObj.time>exp){
		return 0;
	}else{
		return dataObj.data;
	}
}
