if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {

	var arrows = {};
	arrows.box = document.getElementById("arrows-box");
	arrows.box.style.height = (windowHeight - boxSize - 2 * scale) + "px";
	arrows.box.style.width = windowWidth + "px";
	arrows.box.style.top = boxSize + 2 * scale + "px";

	arrows.up = document.createElement('button');
	arrows.up.className = "arrow";
	arrows.up.style.width = "40%";
	arrows.up.style.height = "45%";
	arrows.up.style.top = "27.5%";
	arrows.up.style.left = "50%";
	arrows.up.style.backgroundImage = "url(images/arrow-up.png)";
	arrows.up.style.backgroundSize = "contain";
	arrows.up.style.backgroundPosition = "50%"
	arrows.box.append(arrows.up);


	arrows.left = document.createElement('button');
	arrows.left.className = "arrow";
	arrows.left.style.width = "25%";
	arrows.left.style.height = "90%";
	arrows.left.style.top = "50%";
	arrows.left.style.left = "17.5%";
	arrows.left.style.backgroundImage = "url(images/arrow-left.png)";
	arrows.box.append(arrows.left);

	arrows.down = document.createElement('button');
	arrows.down.className = "arrow";
	arrows.down.style.width = "40%";
	arrows.down.style.height = "45%";
	arrows.down.style.top = "72.5%";
	arrows.down.style.left = "50%";
	arrows.down.style.backgroundImage = "url(images/arrow-down.png)";
	arrows.box.append(arrows.down);


	arrows.right = document.createElement('button');
	arrows.right.className = "arrow";
	arrows.right.style.width = "25%";
	arrows.right.style.height = "90%";
	arrows.right.style.top = "50%";
	arrows.right.style.left = "82.5%";
	arrows.right.style.backgroundImage = "url(images/arrow-right.png)";
	arrows.box.append(arrows.right);

	arrows.up.onclick = function() {
		vibrate(50);
		if (game.entered && !game.stop){
			tryToTurn(0, -1);
	
		}
	}
	
	arrows.left.onclick = function() {
		vibrate(50);
		if (game.entered && !game.stop){
			bads_start();
			tryToTurn(1, -1);
		}
	}
	
	arrows.down.onclick = function() {
		vibrate(50);
		if (game.entered && !game.stop) {
			tryToTurn(0, 1);
		}
	}
	
	arrows.right.onclick = function() {
		vibrate(50);
		if (game.entered && !game.stop) {
			bads_start();
			tryToTurn(1, 1); 
		}
	}
} 

function vibrate(val){
	if("vibrate" in navigator)  return navigator.vibrate(val);
	if("oVibrate" in navigator)  return navigator.oVibrate(val);
	if("mozVibrate" in navigator)  return navigator.mozVibrate(val);
	if("webkitVibrate" in navigator)  return navigator.webkitVibrate(val);
}
(function () {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
			|| window[vendors[x] + 'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = function (callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function () { callback(currTime + timeToCall); },
				timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};

	if (!window.cancelAnimationFrame)
		window.cancelAnimationFrame = function (id) {
			clearTimeout(id);
		};
}());