if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {

	var arrows = {};
	arrows.box = document.getElementById("arrows-box");
	arrows.box.style.height = (windowHeight - boxSize - 2 * scale) + "px";
	arrows.box.style.width = windowWidth + "px";
	arrows.box.style.top = boxSize + 2 * scale + "px";

	arrows.up = document.createElement('button');
	arrows.up.className = "arrow";
	arrows.up.style.width = "40%";
	arrows.up.style.height = "50%";
	arrows.up.style.top = "25%";
	arrows.up.style.left = "50%";
	arrows.up.style.backgroundImage = "url(images/arrow-up.png)";
	arrows.up.style.backgroundSize = "100%";
	arrows.up.style.backgroundRepeat = "no-repeat"
	arrows.up.style.backgroundPosition = "50%"
	arrows.box.append(arrows.up);


	arrows.left = document.createElement('button');
	arrows.left.className = "arrow";
	arrows.left.style.width = "30%";
	arrows.left.style.height = "100%";
	arrows.left.style.top = "50%";
	arrows.left.style.left = "15%";
	arrows.left.style.backgroundImage = "url(images/arrow-left.png)";
	arrows.left.style.backgroundSize = "100%";
	arrows.left.style.backgroundRepeat = "no-repeat"
	arrows.left.style.backgroundPosition = "50%"
	arrows.box.append(arrows.left);

	arrows.down = document.createElement('button');
	arrows.down.className = "arrow";
	arrows.down.style.width = "40%";
	arrows.down.style.height = "50%";
	arrows.down.style.top = "75%";
	arrows.down.style.left = "50%";
	arrows.down.style.backgroundImage = "url(images/arrow-down.png)";
	arrows.down.style.backgroundSize = "100%";
	arrows.down.style.backgroundRepeat = "no-repeat"
	arrows.down.style.backgroundPosition = "50%"
	arrows.box.append(arrows.down);


	arrows.right = document.createElement('button');
	arrows.right.className = "arrow";
	arrows.right.style.width = "30%";
	arrows.right.style.height = "100%";
	arrows.right.style.top = "50%";
	arrows.right.style.left = "85%";
	arrows.right.style.backgroundImage = "url(images/arrow-right.png)";
	arrows.right.style.backgroundSize = "100%";
	arrows.right.style.backgroundRepeat = "no-repeat"
	arrows.right.style.backgroundPosition = "50%"
	arrows.box.append(arrows.right);

	arrows.up.onclick = function() {
		vibrate(50);
		if (game.entered && !game.stop){
			bads_start();
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
			bads_start();
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

for (let i = 0; i <= mapSize[0]; i += 1) {

	for (let j = 0; j <= mapSize[1]; j += 1) {
		if (!(map[i][j])) {
			let img = document.createElement('img');
			img.className = 'border'
			img.src = "images/" + wallType(i, j) + ".png";
			img.style.height = scale + "px";
			img.style.width = scale + "px";
			img.style.top = i * scale + "px";
			img.style.left = j * scale + "px";
			pacman.change.parentNode.insertBefore(img, pacman.change);
		}
		if (map[i][j] == 2) {
			let img = document.createElement('img');
			img.className = 'coin'
			img.style
			img.id = i + '_' + j;
			img.src = "images/coin.png";
			img.style.height = scale + "px";
			img.style.width = scale + "px";
			img.style.top = (i * scale) + "px";
			img.style.left = (j * scale) + "px";
			pacman.change.parentNode.insertBefore(img, pacman.change);
		}
		if (map[i][j] == 3) {
			let img = document.createElement('img');
			img.className = 'border';
			img.id = i + '_' + j;
			img.src = "images/powerup.png";
			img.style.height = scale + "px";
			img.style.width = scale + "px";
			img.style.top = i * scale + "px";
			img.style.left = j * scale + "px";
			pacman.change.parentNode.insertBefore(img, pacman.change);
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