mui.init({
	gestureConfig:{
		doubletap:true
	},
	subpages:[{
      url:'latest_info_list.html',//下拉刷新内容页面地址
      id:'latest_info_list',//内容页面标志
      styles:{
        top:'0px',//内容页面顶部位置
      }
    }]
});
mui.plusReady(function(){
	if(plus.webview.getWebviewById('latest_info_list')){
//      plus.webview.currentWebview().reload(true);
         plus.webview.getWebviewById('latest_info_list').show();
        console.log(1111111111123);
         
	}
});

var contentWebview = null;
document.querySelector('header').addEventListener('doubletap',function () {
	if(contentWebview==null){
		contentWebview = plus.webview.currentWebview().children()[0];
	}
	contentWebview.evalJS("mui('#pullrefresh').pullRefresh().scrollTo(0,0,100)");
});
