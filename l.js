const scale = 50;
const mapSize = [12, 14];

let pacman = {};
pacman.change = document.getElementById("pacman");
pacman.change.src = "man.png";
pacman.pos = [6, 7];
pacman.change.style.top = pacman.pos[0] * scale + "px";
pacman.change.style.left = pacman.pos[1] * scale + "px";
pacman.axis = 2;
pacman.direction = 2;


let bad = [{}, {}, {}];
for (let i = 0; i < 3; i += 1) {
	bad[i].change = document.getElementById("b" + i);
	bad[i].change.src = "bad.png"
	bad[i].pos = [4, 6 + i];
	bad[i].change.style.top = bad[i].pos[0] * scale + "px";
	bad[i].change.style.left = bad[i].pos[1] * scale + "px";
}

let score = {};
score.change = document.getElementById('score');
score.change.textContent = "Score: 0";
score.number = 0;

let inProgress = 0;

map = [[2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2],
[2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2],
[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
[2, 0, 0, 0, 2, 0, 0, 1, 0, 0, 2, 0, 0, 0, 2],
[2, 0, 1, 0, 2, 0, 1, 1, 1, 0, 2, 0, 1, 0, 2],
[2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2],
[2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2],
[2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2],
[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
[2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2],
[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
[2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2],
[2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2]];


// Здесь будет логика плохих ребят

function tgPacman(b) {
	let dY = pacman.pos[0] - b.pos[0];
	let dX = pacman.pos[1] - b.pos[1];
}

function whereToGo(b) {
	
}

function pickCoin(target) {
	if (map[target.pos[0]][target.pos[1]] == 2) {
		map[target.pos[0]][target.pos[1]] = 1;
		let curr_id = target.pos[0] + '_' + target.pos[1];
		score.number += 1;
		score.change.textContent = "Score: " + score.number;
		let coin = document.getElementById(curr_id);
		coin.remove();
	}
}

function emptyNeib(target, axis, direction) {
	if (target.pos[axis] > 0 && direction < 0 || +
		target.pos[axis] < mapSize[axis] && direction > 0) {
		if (axis) {
			if (map[target.pos[0]][target.pos[1] + direction]) {
				return (1);
			}
		}
		else {
			if (map[target.pos[0] + direction][target.pos[1]]) {
				return (1);
			}
		}
		return (0);
	}
}

function move(target, axis, direction) {
	if (target.axis == axis && target.direction == direction) { return; }
	if (target.axis != axis) {
		if (!(emptyNeib(target, axis, direction))) {
			return;
		}
	}
	target.axis = axis;
	target.direction = direction;
	let requestID = setTimeout(function m() {
		if (emptyNeib (target, axis, direction) && (target.axis == axis && target.direction == direction)){
			movment(target);
			requestID = setTimeout(m, 250);
		}
		else { cancelAnimationFrame(requestID); }
		}, (250 - dt));

}

let time, 
	dt,
	now;

function movment(target) {
	if (inProgress == 1) {
		return (0);
	}
	inProgress = 1;
	dt = 2;
	axis = target.axis;
	direction = target.direction;
	if (emptyNeib(target, axis, direction)) {
		let p = pacman.pos[axis];
		pacman.pos[axis] += direction;
		let i = 0,
			time = new Date().getTime();
		window.requestAnimationFrame(function mv() {
			i += 5;
			let shift = (p * scale + i * direction) + "px";
			if (i <= 50) {
				if (axis) { pacman.change.style.left = shift; }
				else { pacman.change.style.top = shift; }
				window.requestAnimationFrame(mv);
				now = new Date().getTime();
			}
			dt = now - time;
		});
		setTimeout(() => {
			//console.log(dt);
			pickCoin(target);
		}, 250);
		setTimeout(() => {
			inProgress = 0;
			return (1);
		}, 250);
	}
}

document.addEventListener('keydown', function (event) {
	if (event.code == 'ArrowLeft')
		move(pacman, 1, -1);

	if (event.code == 'ArrowRight')
		move(pacman, 1, 1);

	if (event.code == 'ArrowUp')
		move(pacman, 0, -1);

	if (event.code == 'ArrowDown')
		move(pacman, 0, 1);
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