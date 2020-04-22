function mobile() {

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {

	let windowHeight = 0.99 * document.documentElement.clientHeight;
	let windowWidth = 0.99 * document.documentElement.clientWidth;
	let boxS;

	if (windowHeight > 1.16 * windowWidth) {
		boxS = windowWidth;
	}
	else {
		boxS = windowHeight;
	}
	var arrows = {};
	arrows.cont = document.getElementById("mobile");
	arrows.cont.style.height = (windowHeight - boxS - 2 * scale) + "px";
	arrows.cont.style.width = windowWidth + "px";
	arrows.cont.style.top = boxS + 2 * scale + "px";

	var boxSize = Math.min((windowHeight - boxS - 2 * scale), windowWidth);
	arrows.box = document.getElementById("arrows-box");
	arrows.box.style.height = boxSize + "px";
	arrows.box.style.width = arrows.box.style.height;

	arrows.up = document.createElement('button');
	arrows.up.className = "arrow";
	arrows.up.style.top = "-10%";
	arrows.up.style.left = "25%";
	arrows.box.append(arrows.up);


	arrows.left = document.createElement('button');
	arrows.left.className = "arrow";
	arrows.left.style.top = "25%";
	arrows.left.style.left = "-10%";
	arrows.box.append(arrows.left);

	arrows.down = document.createElement('button');
	arrows.down.className = "arrow";
	arrows.down.style.top = "60%";
	arrows.down.style.left = "25%";
	arrows.box.append(arrows.down);


	arrows.right = document.createElement('button');
	arrows.right.className = "arrow";
	arrows.right.style.top = "25%";
	arrows.right.style.left = "60%";
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
}