
let requestPowerupID1 = [];
let requestPowerupID2 = [];


function pickCoin(target) {
	let curr_id = target.pos[0] + '_' + target.pos[1];
	if (map[target.pos[0]][target.pos[1]] == 2) {
		map[target.pos[0]][target.pos[1]] = 1;
		game.score.number += 1;
		game.score.change.textContent = "Счёт: " + (game.score.number + game.score.bonus);
		let coin = document.getElementById(curr_id);
		coin.remove();
	}
	if (map[target.pos[0]][target.pos[1]] == 3) {
		map[target.pos[0]][target.pos[1]] = 1;
		game.reverse = 1;
		let coin = document.getElementById(curr_id);
		coin.remove();
		for (let i = 0; i < 3; i += 1) {
			clearTimeout(requestPowerupID1[i]);
			bad[i].change.src = "images/bad_scared.png";
			requestPowerupID1[i] = setTimeout (() => { bad[i].change.src = "images/bad.png";}, 5000);
		}
		clearTimeout(requestPowerupID2);
		requestPowerupID2 = setTimeout (() => { game.reverse = 0;}, 5000);
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
			movment(target, 250);
			setTimeout(() => {	pickCoin(target); }, 200);
			requestMoveID = setTimeout(m, 250)
		}
		else { clearTimeout(requestMoveID); }
		}, (250 - target.dt));

}

function movment(target, dtime) {
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
		let requestMovmentID = window.requestAnimationFrame(function mv() {
			i += 1;
			let shift = ((p + i * direction / 10) * scale ) + "px";
			if (i <= 10) {
				if (axis) { target.change.style.left = shift; }
				else { target.change.style.top = shift; }
				requestMovmentID = window.requestAnimationFrame(mv);
				now = new Date().getTime();
			}
			else {	window.cancelAnimationFrame(requestMovmentID);	}
			target.dt = now - time;
		});

		setTimeout(() => {
			target.inProgress = 0;
			return (1);
		}, dtime);
	}
}

function pacmanCaught() {
	pacman.axis = 2;
	pacman.direction = 2;
}
 