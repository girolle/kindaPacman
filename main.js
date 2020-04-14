const scale = 50;
const mapSize = [14, 14];

let pacman = {};
pacman.change = document.getElementById("pacman");
pacman.change.src = "man.png";
pacman.pos = [10, 7];
pacman.change.style.top = pacman.pos[0] * scale + "px";
pacman.change.style.left = pacman.pos[1] * scale + "px";
pacman.axis = 2;
pacman.direction = 2;
pacman.inProgress = 0;
pacman.dt = 0;


let bad = [{}, {}, {}];
for (let i = 0; i < 3; i += 1) {
	bad[i].change = document.getElementById("b" + i);
	bad[i].change.src = "bad.png"
	bad[i].pos = [6, 6 + i];

	bad[i].axis = 0;
	bad[i].direction = -1;
	bad[i].change.style.top = bad[i].pos[0] * scale + "px";
	bad[i].change.style.left = bad[i].pos[1] * scale + "px";
	bad[i].inProgress = 0;
	bad[i].dt = 0;
}

let ann = {}
ann.change = document.getElementById("ann");
ann.text = document.getElementById("ann-text");
ann.text.innerText = "PRESS N TO START";
//ann.change.style.opacity = 0;

let game = {};
game.score = {};
game.score.change = document.getElementById('score');
game.score.change.textContent = "Score: 0";
game.score.number = 0;
game.started = 0;
game.stop = 0;
game.reverse = 0;
game.entered = 0;

map =  [[2, 2, 2, 2, 2, 0,  2,  2,  2, 0, 2, 2, 2, 2, 2],
		[2, 0, 0, 0, 2, 0,  2,  0,  2, 0, 2, 0, 0, 0, 2],
		[3, 0, 1, 0, 2, 2,  2,  0,  2, 2, 2, 0, 1, 0, 3],
		[2, 0, 0, 0, 2, 0,  0,  0,  0, 0, 2, 0, 0, 0, 2],
		[2, 2, 2, 2, 2, 2,  2,  2,  2, 2, 2, 2, 2, 2, 2],
		[0, 0, 2, 0, 2, 0,  0, -1,  0, 0, 2, 0, 2, 0, 0],
		[1, 0, 2, 0, 2, 0, -1, -1, -1, 0, 2, 0, 2, 0, 1],
		[0, 0, 2, 0, 2, 0,  0,  0,  0, 0, 2, 0, 2, 0, 0],
		[2, 2, 2, 2, 2, 2,  2,  2,  2, 2, 2, 2, 2, 2, 2],
		[2, 0, 0, 0, 2, 0,  0,  0,  0, 0, 2, 0, 0, 0, 2],
		[2, 0, 2, 2, 2, 2,  2,  1,  2, 2, 2, 2, 2, 0, 2],
		[3, 0, 2, 0, 0, 0,  2,  0,  2, 0, 0, 0, 2, 0, 3],
		[2, 2, 2, 2, 2, 2,  2,  0,  2, 2, 2, 2, 2, 2, 2],
		[2, 0, 0, 0, 0, 2,  0,  0,  0, 2, 0, 0, 0, 0, 2],
		[2, 2, 2, 2, 2, 2,  2,  2,  2, 2, 2, 2, 2, 2, 2]];

document.addEventListener('keydown', function (event) {
	if (!game.entered) {
		if (event.code == 'KeyN') { 
			ann.change.style.opacity = 0;
			game.entered = 1;
		}
	}
	else if (!game.stop) {
		if ((event.code == 'ArrowLeft') || (event.code == 'ArrowRight') || +
		(event.code == 'ArrowUp') || (event.code == 'ArrowDown')) {
			if (game.started == 0) {
				game.started = 1;
				setTimeout(() => {cheetMovement(bad[1], 0, -1);}, 1500);
				setTimeout(() => {cheetMovement(bad[0], 1, 1);}, 3250);
				setTimeout(() => {cheetMovement(bad[0], 0, -1);}, 3500);
				setTimeout(() => {cheetMovement(bad[2], 1, -1);}, 5250);
				setTimeout(() => {cheetMovement(bad[2], 0, -1);}, 5500);
				startHunter();
			}
		}

		if (event.code == 'ArrowLeft')
			move(pacman, 1, -1);

		if (event.code == 'ArrowRight')
			move(pacman, 1, 1);

		if (event.code == 'ArrowUp')
			move(pacman, 0, -1);

		if (event.code == 'ArrowDown')
			move(pacman, 0, 1);
	}
})

for (let i = 0; i <= mapSize[0]; i += 1) {
	for (let j = 0; j <= mapSize[1]; j += 1) {
		if (!(map[i][j])) {
			let img = document.createElement('img');
			img.className = 'border'
			img.src = "block.png";
			img.style.top = i * scale + "px";
			img.style.left = j * scale + "px";
			pacman.change.parentNode.insertBefore(img, pacman.change);
		}
		if (map[i][j] == 2) {
			let img = document.createElement('img');
			img.className = 'coin'
			img.id = i + '_' + j;
			img.src = "coin.png";
			img.style.top = (i * scale + 17) + "px";
			img.style.left = (j * scale + 17) + "px";
			pacman.change.parentNode.insertBefore(img, pacman.change);
		}
		if (map[i][j] == 3) {
			let img = document.createElement('img');
			img.className = 'border';
			img.id = i + '_' + j;
			img.src = "powerup.png";
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