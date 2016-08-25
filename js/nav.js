mui.init();
mui.plusReady(function() {
	var navIndex = document.getElementById('J_index');
	var navInfo = document.getElementById('J_info');
	var navUnit = document.getElementById('J_unit');
	var navMe = document.getElementById('J_me');
	
	navIndex.addEventListener('tap',function() {
		mui.openWindow({
			url: 'index.html',
			id: 'index.html'
		})
	});
	navInfo.addEventListener('tap',function() {
		mui.openWindow({
			url: 'job_info.html',
			id: 'job_info.html'
		})
	});
	navUnit.addEventListener('tap',function() {
		mui.openWindow({
			url: 'units.html',
			id: 'units.html'
		})
	});
	navMe.addEventListener('tap',function() {
		mui.openWindow({
			url: 'me.html',
			id: 'me.html'
		})
	});
});