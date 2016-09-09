mui.init();

mui.ajax('http://www.dsjyw.net/mobile/index/index',{
	data:{
		// username:'username',
		// password:'password'
	},
	dataType:'json',//服务器返回json格式数据
	type:'post',//HTTP请求类型
	timeout:10000,//超时时间设置为10秒；
	headers:{'Content-Type':'application/json'},	              
	success:function(data){

		// console.log(JSON.stringify(data));
		var banner = document.getElementById('banner');
		var indicator = document.getElementById('indicator');
		var list = document.getElementById('list');

		var img_div;
		var indicator_div;
		var announce_div;

		var imgfrag = document.createDocumentFragment();
		var indicatorfrag = document.createDocumentFragment();
		var announcefrag = document.createDocumentFragment();

		var image = data.image;
		var announce = data.announce;

		var imageSize = data.imageSize;     
	    var first;
	    var last;

		mui.each(image,function(index,v){
			if (index==0) {
			    first = v;
			}
			if (index==imageSize-1) {
			    last = v;
			}
		});

		img_div = document.createElement('div');
		img_div.className = 'mui-slider-item mui-slider-item-duplicate';
		img_div.innerHTML = '<a href='+last.url+'><img src='+last.path+' onload="loadready()"></a>';
		imgfrag.appendChild(img_div); 

		mui.each(image,function(index,item){
			img_div = document.createElement('div');
			img_div.className = 'mui-slider-item';
			img_div.innerHTML = '<a open-type="common" href='+item.url+'><img src='+item.path+'></a>';
	        
	        indicator_div = document.createElement('div');
			if (index==0) {
				indicator_div.className = 'mui-indicator mui-active';
			}else{
				indicator_div.className = 'mui-indicator';
			}

			imgfrag.appendChild(img_div);
			indicatorfrag.appendChild(indicator_div);
		});

		img_div = document.createElement('div');
		img_div.className = 'mui-slider-item mui-slider-item-duplicate';
		img_div.innerHTML = '<a href='+first.url+'><img src='+first.path+'></a>';
		imgfrag.appendChild(img_div);

		mui.each(announce,function(index,item){
	        announce_div = document.createElement('li');
	        announce_div.className = 'mui-table-view-cell list_cell';
	        announce_div.innerHTML = '<a class="index_list" href="detail.html" open-type="contain" rel='+item.id+'>'+item.title+'</a><span class="mui-pull-right update time ">'+item.time+'</span>'

	        announcefrag.appendChild(announce_div);
		});


		banner.appendChild(imgfrag);
		indicator.appendChild(indicatorfrag);
		list.appendChild(announcefrag);

		var gallery = mui('.mui-slider');
		gallery.slider({
		  interval:3000//自动轮播周期，若为0则不自动播放，默认为0；
		});

	},
	error:function(xhr,type,errorThrown){
		//异常处理；
		console.log(type);
	}

});
mui.init();

function loadready(){
	mui.plusReady(function(){
		plus.navigator.closeSplashscreen();
	})
}

mui.plusReady(function(){
	// 设置轮播图高度
	var sliderHeight = plus.screen.resolutionWidth*0.28;
    var slider = document.getElementById('slider');
    slider.style.height = sliderHeight+'px';
    
    
})


var aniShow = "pop-in";
function preload () {
	mui.preload({
		url:"latest_info.html",
		styles:{
			popGesture:'hide'
		}
	});
}
var templates = {};
var getTemplate = function(name, header, content) {
	var template = templates[name];
	if (!template) {
		//预加载共用父模板；
		var headerWebview = mui.preload({
			url: header,
			id: name + "-main",
			styles: {
				popGesture: "hide",
			},
			extras: {
				mType: 'main'
			}
		});
		//预加载共用子webview
		var subWebview = mui.preload({
			url: !content ? "" : content,
			id: content,
			styles: {
				top: '45px',
				bottom: '0px',
			},
			extras: {
				mType: 'sub'
			}
		});
		subWebview.addEventListener('titleUpdate', function() {
			setTimeout(function() {
				subWebview.show();
			}, 50);
		});
		subWebview.hide();
		headerWebview.append(subWebview);
		//iOS平台支持侧滑关闭，父窗体侧滑隐藏后，同时需要隐藏子窗体；
		if (mui.os.ios) { //5+父窗体隐藏，子窗体还可以看到？不符合逻辑吧？
			headerWebview.addEventListener('hide', function() {
				subWebview.hide("none");
			});
		}
		templates[name] = template = {
			name: name,
			header: headerWebview,
			content: subWebview,
		};
	}
	return template;
};
var initTemplates = function() {
	getTemplate('default', 'template.html');
};

mui.plusReady(function(){
	initTemplates();
});

mui('#list').on('tap','a',function(){
	var aid = this.rel;
	var href = this.href;
	//获得共用模板组
	var template = getTemplate('default');
	//获得共用父模板
	var headerWebview = template.header;
	//获得共用子webview
	var contentWebview = template.content;
	//通知模板修改标题，并显示隐藏右上角图标；
	mui.fire(headerWebview, 'updateHeader', {
		title: '详情',
		target:href,
		aniShow: aniShow
	});
	

    window.localStorage.setItem('announce_id',aid);
	
	if(mui.os.ios||(mui.os.android&&parseFloat(mui.os.version)<4.4)){
		var reload = true;
		if (!template.loaded) {
			if (contentWebview.getURL() != this.href) {
				contentWebview.loadURL(this.href);
			} else {
				reload = false;
			}
		} else {
			reload = false;
		}
		(!reload) && contentWebview.show();
		
		headerWebview.show(aniShow, 150);
	}
});

mui('#slider').on('tap','a',function(){
	var href = this.href;
	//获得共用模板组
	var template = getTemplate('default');
	//获得共用父模板
	var headerWebview = template.header;
	//获得共用子webview
	var contentWebview = template.content;
	//通知模板修改标题，并显示隐藏右上角图标；
	mui.fire(headerWebview, 'updateHeader', {
		title: '',
		target:href,
		aniShow: aniShow
	});
	
	
	if(mui.os.ios||(mui.os.android&&parseFloat(mui.os.version)<4.4)){
		var reload = true;
		if (!template.loaded) {
			if (contentWebview.getURL() != this.href) {
				contentWebview.loadURL(this.href);
			} else {
				reload = false;
			}
		} else {
			reload = false;
		}
		(!reload) && contentWebview.show();
		
		headerWebview.show(aniShow, 150);
	}
})


mui('.mui-table-view-cell').on('tap', 'a', function() {
	var id = this.getAttribute('href');
	var href = this.href;
	var type = this.getAttribute('open-type');
	if (type == "common") {
		var webview_style = {
			popGesture: "close"
		};

		mui.openWindow({
			id: id,
			url: this.href,
			styles: webview_style,
			show: {
				aniShow: aniShow,
				duration:300
			},
			waiting: {
				autoShow: false
			}
		});
	}
});
