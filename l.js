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


let score = {};
score.change = document.getElementById('score');
score.change.textContent = "Score: 0";
score.number = 0;

let gameStarted = 0;

map =  [[2, 2, 2, 2, 2, 0,  2,  2,  2, 0, 2, 2, 2, 2, 2],
		[2, 0, 0, 0, 2, 0,  2,  0,  2, 0, 2, 0, 0, 0, 2],
		[2, 0, 1, 0, 2, 2,  2,  0,  2, 2, 2, 0, 1, 0, 2],
		[2, 0, 0, 0, 2, 0,  0,  0,  0, 0, 2, 0, 0, 0, 2],
		[2, 2, 2, 2, 2, 2,  2,  2,  2, 2, 2, 2, 2, 2, 2],
		[0, 0, 2, 0, 2, 0,  0, -1,  0, 0, 2, 0, 2, 0, 0],
		[1, 0, 2, 0, 2, 0,  1,  1,  1, 0, 2, 0, 2, 0, 1],
		[0, 0, 2, 0, 2, 0,  0,  0,  0, 0, 2, 0, 2, 0, 0],
		[2, 2, 2, 2, 2, 2,  2,  2,  2, 2, 2, 2, 2, 2, 2],
		[2, 0, 0, 0, 2, 0,  0,  0,  0, 0, 2, 0, 0, 0, 2],
		[2, 0, 2, 2, 2, 2,  2,  1,  2, 2, 2, 2, 2, 0, 2],
		[2, 0, 2, 0, 0, 0,  2,  0,  2, 0, 0, 0, 2, 0, 2],
		[2, 2, 2, 2, 2, 2,  2,  0,  2, 2, 2, 2, 2, 2, 2],
		[2, 0, 0, 0, 0, 2,  0,  0,  0, 2, 0, 0, 0, 0, 2],
		[2, 2, 2, 2, 2, 2,  2,  2,  2, 2, 2, 2, 2, 2, 2]];



function openNeibsNum(b) {
	let i = 0;
	i += emptyNeib(b, 0, 1)
	i += emptyNeib(b, 0, -1)
	i += emptyNeib(b, 1, 1)
	i += emptyNeib(b, 1, -1)
	return (i);
}

function tryToMove(b, axis, direction) {
	if (emptyNeib(b, axis, direction)  && +
	!(b.axis == axis && b.direction != direction)) {
		b.axis = axis;
		b.direction = direction;
		movment(b);
		return (1);
	}
	return (0);
}

function whereToGo(b) {
	let dY = pacman.pos[0] - b.pos[0];
	let dX = pacman.pos[1] - b.pos[1];
	let tg = dX / dY;

	sY = (dY < 0) ? -1 : 1;
	sX = (dX < 0) ? -1 : 1;

	if (tg < 0) { tg = -tg;}

	if (tg > 1) {
		if (!tryToMove(b, 1, sX)) {
			if(!tryToMove(b, 0, sY)) {
				if(!tryToMove(b, 0, -sY)) {
					tryToMove(b, 1, -sX);
				}
			}
		}
	}
	else {
		if (!tryToMove(b, 0, sY)) {
			if(!tryToMove(b, 1, sX)) {
				if(!tryToMove(b, 1, -sX)) {
					tryToMove(b, 0, -sY);
				}
			}
		}
	}	
}

function cheetMovement(target, axis, direction)
{
	let p = target.pos[axis];
	target.pos[axis] += direction;
	let i = 0;

	let requestMovementID = window.requestAnimationFrame(function mv() {
		i += 5;
		let shift = (p * scale + i * direction) + "px";
		if (i <= 50) {
			if (axis) { target.change.style.left = shift; }
			else { target.change.style.top = shift; }
			requestMovementID = window.requestAnimationFrame(mv);
		}
		else {	window.cancelAnimationFrame(requestMovementID);	}
	});
}

function startHunter() {
	function badMoves (b){
		let requestHunterID = setTimeout(function hunt() {
			if ((pacman.pos[0] == b.pos[0]) && (pacman.pos[1] == b.pos[1]) || +
			(score.number == 128))	 { 
				clearTimeout(requestHunterID); 
			}
			else if (openNeibsNum(b) > 2) {
					whereToGo(b);
				}
			else {
				if (!tryToMove(b, b.axis, b.direction)) {
					if (!tryToMove(b, 1 - b.axis, 1))
						tryToMove(b, 1 - b.axis, -1);
				}
			}
			requestID = setTimeout(hunt, 200); 
		}, 200);
	};
	console.log(bad[1].pos);
	setTimeout(() => {badMoves(bad[1]);}, 1600);
	setTimeout(() => {badMoves(bad[0]);}, 3600);
	setTimeout(() => {badMoves(bad[2]);}, 5600);

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
			if (map[target.pos[0]][target.pos[1] + direction] > 0) {
				return (1);
			}
		}
		else {
			if (map[target.pos[0] + direction][target.pos[1]] > 0) {
				return (1);
			}
		}
	}
	return (0);
}

function move(target, axis, direction) {

	if (target.axis == axis && target.direction == direction) 
	{ return; }

	if (target.axis != axis) {
		if (!(emptyNeib(target, axis, direction))) 
		{ return; }
	}
	target.axis = axis;
	target.direction = direction;
	let requestMoveID = setTimeout(function m() {
		if (emptyNeib (target, axis, direction) && +
			(target.axis == axis && target.direction == direction)) {
			movment(target);
			setTimeout(() => {	pickCoin(target); }, 200);
			requestMoveID = setTimeout(m, 200)
		}
		else { clearTimeout(requestMoveID); }
		}, (200 - target.dt));

}

function movment(target) {
	if (target.inProgress == 1) {
		return (0);
	}

	target.inProgress = 1;
	let axis = target.axis;
	let direction = target.direction;
	if (emptyNeib(target, axis, direction)) {
		let p = target.pos[axis];
		target.pos[axis] += direction;
		let i = 0;
		let time = new Date().getTime();
		let now;
		let requestMovementID = window.requestAnimationFrame(function mv() {
			i += 5;
			let shift = (p * scale + i * direction) + "px";
			if (i <= 50) {
				if (axis) { target.change.style.left = shift; }
				else { target.change.style.top = shift; }
				requestMovementID = window.requestAnimationFrame(mv);
				now = new Date().getTime();
			}
			else {	window.cancelAnimationFrame(requestMovementID);	}
			target.dt = now - time;
		});

		setTimeout(() => {
			target.inProgress = 0;
			return (1);
		}, 200);
	}
}

function caudgt() {
	for (let i = 0; i < 3; i += 1) {
		for (let j = 0; j < 2; j += 1) {
			if (pacman.pos[j] == bad[i].pos[j])
				return (1);
		}
	}
	return (0);
}

document.addEventListener('keydown', function (event) {

	if (gameStarted == 0) {
		gameStarted = 1;
		setTimeout(() => {cheetMovement(bad[1], 0, -1);}, 1600);
		setTimeout(() => {cheetMovement(bad[0], 1, 1);}, 3400);
		setTimeout(() => {cheetMovement(bad[0], 0, -1);}, 3600);
		setTimeout(() => {cheetMovement(bad[2], 1, -1);}, 5400);
		setTimeout(() => {cheetMovement(bad[2], 0, -1);}, 5600);
		startHunter();
	}

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