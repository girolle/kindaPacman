var scale;
scaleInit();

let pacman = {};
pacman.change = document.getElementById("pacman");
pacman.change.style.width = scale + "px";
pacman.change.style.height = scale + "px";
pacman.change.src = "images/man.gif";
pacman.pos = [13, 8];
pacman.change.style.top = pacman.pos[0] * scale + "px";
pacman.change.style.left = pacman.pos[1] * scale + "px";
pacman.axis = 2;
pacman.direction = 2;
pacman.inProgress = 0;
pacman.remember = [2, 2];
pacman.dt = 0;

let bad = [{}, {}, {}];
for (let i = 0; i < 3; i += 1) {
	bad[i].change = document.getElementById("b" + i);
	bad[i].change.src = "images/bad.png"
	bad[i].pos = [9, 7 + i];
	bad[i].change.style.width = scale + "px";
	bad[i].change.style.height = scale + "px";
	bad[i].axis = 0;
	bad[i].direction = -1;
	bad[i].change.style.top = bad[i].pos[0] * scale + "px";
	bad[i].change.style.left = bad[i].pos[1] * scale + "px";
	bad[i].inProgress = 0;
	bad[i].dt = 0;
}

let stub = {}
stub.change = document.getElementById("stub");
stub.text = document.getElementById("stub-text");
stub.text.innerText = "Зарабатывайте деньги и не попадитесь налоговой службе. Пользуйтесь стрелками для управления";

let game = {};
game.score = {};
game.score.change = document.getElementById('score');
game.score.change.textContent = "Счёт: 0";
game.score.number = 0;
game.score.bonus = 0;
game.started = 0;
game.stop = 0;
game.reverse = 0;
game.entered = 0;

let start_button = document.getElementById("button")

map =  [[0, 0, 0, 0, 0, 1, 1,  1,  1,  1, 1, 1, 1, 1, 1, 1, 1],
		[0, 1, 1, 1, 0, 1, 1,  1,  1,  1, 1, 1, 1, 1, 1, 1, 1],
		[0, 0, 0, 0, 0, 0, 0,  0,  0,  0, 0, 0, 0, 0, 0, 0, 0],
		[0, 2, 2, 2, 2, 2, 0,  2,  2,  2, 0, 2, 2, 2, 2, 2, 0],
		[0, 2, 0, 0, 0, 2, 0,  2,  0,  2, 0, 2, 0, 0, 0, 2, 0],
		[0, 3, 0, 1, 0, 2, 2,  2,  0,  2, 2, 2, 0, 1, 0, 3, 0],
		[0, 2, 0, 0, 0, 2, 0,  0,  0,  0, 0, 2, 0, 0, 0, 2, 0],
		[0, 2, 2, 2, 2, 2, 2,  2,  2,  2, 2, 2, 2, 2, 2, 2, 0],
		[0, 0, 0, 2, 0, 2, 0,  0, -1,  0, 0, 2, 0, 2, 0, 0, 0],
		[1, 1, 0, 2, 0, 2, 0, -1, -1, -1, 0, 2, 0, 2, 0, 1, 1],
		[0, 0, 0, 2, 0, 2, 0,  0,  0,  0, 0, 2, 0, 2, 0, 0, 0],
		[0, 2, 2, 2, 2, 2, 2,  2,  2,  2, 2, 2, 2, 2, 2, 2, 0],
		[0, 2, 0, 0, 0, 2, 0,  0,  0,  0, 0, 2, 0, 0, 0, 2, 0],
		[0, 2, 0, 2, 2, 2, 2,  2,  1,  2, 2, 2, 2, 2, 0, 2, 0],
		[0, 3, 0, 2, 0, 0, 0,  2,  0,  2, 0, 0, 0, 2, 0, 3, 0],
		[0, 2, 2, 2, 2, 2, 2,  2,  0,  2, 2, 2, 2, 2, 2, 2, 0],
		[0, 2, 0, 0, 0, 0, 2,  0,  0,  0, 2, 0, 0, 0, 0, 2, 0],
		[0, 2, 2, 2, 2, 2, 2,  2,  2,  2, 2, 2, 2, 2, 2, 2, 0],
		[0, 0, 0, 0, 0, 0, 0,  0,  0,  0, 0, 0, 0, 0, 0, 0, 0]];

start_button.onclick = function() {
	stub.change.style.opacity = 0;
	game.entered = 1;
	start_button.remove();
}

function bads_start(){
	if (game.started == 0) {
		game.started = 1;
		setTimeout(() => {cheetMovment(bad[1], 0, -1);}, 2050);
		setTimeout(() => {cheetMovment(bad[0], 1, 1);}, 3050);
		setTimeout(() => {cheetMovment(bad[0], 0, -1);}, 3300);
		setTimeout(() => {cheetMovment(bad[2], 1, -1);}, 4300);
		setTimeout(() => {cheetMovment(bad[2], 0, -1);}, 4550);
		startHunter();
	}
}

let plz = 0

function tryToTurn (axis, direction) {

	if (plz) {
		setTimeout(() => {
			if (game.started && !move(axis, direction)) {
				pacman.remember = [axis, direction];
			}
			else {pacman.remember = [2, 2];}
		}, 10);
	}
	plz = 1;
	setTimeout(() => { plz = 0;}, 10);
	if (game.started && !move(axis, direction)) {
		pacman.remember = [axis, direction];
	}
	else {pacman.remember = [2, 2];}
}

document.addEventListener('keydown', function (event) {
	if (game.entered && !game.stop) {
		if ((event.code == 'ArrowLeft') || (event.code == 'ArrowRight')) {
			bads_start();
		}

		if (event.code == 'ArrowLeft')
			tryToTurn(1, -1);

		if (event.code == 'ArrowRight')
			tryToTurn(1, 1);

		if (event.code == 'ArrowUp')
			tryToTurn(0, -1);

		if (event.code == 'ArrowDown')
			tryToTurn(0, 1);
	}
})

function wallType(i, j) {
	let ret = "";
	if (i == 0) { ret += 0; }
	else if (!map[i - 1][j]) { ret += 1; }
	else ret += 0;

	if (j == mapSize[1]) { ret += 0; }
	else if (!map[i][j + 1]) { ret += 1; }
	else ret += 0;

	if (i == mapSize[0]) { ret += 0; }
	else if (!map[i + 1][j]) { ret += 1; }
	else ret += 0;

	if (j == 0) { ret += 0; }
	else if (!map[i][j - 1]) { ret += 1; }
	else ret += 0;

	return(ret);
}


for (let i = 0; i <= mapSize[0]; i += 1) {

	for (let j = 0; j <= mapSize[1]; j += 1) {
		if (!(map[i][j])) {
			let img = document.createElement('img');
			img.className = 'border'
			img.src = "images/walls2/" + wallType(i, j) + ".png";
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