
function openNeibsNum(b) {
	let i = 0;
	i += emptyNeib(b, 0, 1)
	i += emptyNeib(b, 0, -1)
	i += emptyNeib(b, 1, 1)
	i += emptyNeib(b, 1, -1)
	return (i);
}

function emptyBadNeib(b) {
	for (let i = 0; i < 3; i += 1) {
		if ((b.pos[b.axis] + b.direction) == bad[i].pos[b.axis] && +
		(b.pos[1 - b.axis] == bad[i].pos[1 - b.axis]) && +
		!(b.axis == bad[i].axis && b.direction != bad[i].direction)) {
			return (0);
		}
	}
	return (1);
}

function tryToMove(b, axis, direction) {
	if (emptyNeib(b, axis, direction) && emptyBadNeib(b) && +
	!(b.axis == axis && b.direction != direction)) {
		b.axis = axis;
		b.direction = direction;
		movment(b, 250);
		return (1);
	}
	return (0);
}

function whereToGo(b) {
	let dY = pacman.pos[0] - b.pos[0];
	let dX = pacman.pos[1] - b.pos[1];
	let tg = dX / dY;

	if (game.reverse) {
		dY = -dY;
		dX = -dX;
	}

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

function cheetMovment(target, axis, direction)
{
	let p = target.pos[axis];
	target.pos[axis] += direction;
	let i = 0;

	let requestMovmentID = window.requestAnimationFrame(function mv() {
		i += 1;
		let shift = ((p + i * direction / 10) * scale ) + "px";
		if (i <= 10) {
			if (axis) { target.change.style.left = shift; }
			else { target.change.style.top = shift; }
			requestMovmentID = window.requestAnimationFrame(mv);
		}
		else {	window.cancelAnimationFrame(requestMovmentID);	}
	});
}

function isPacmanCaught(b) {
	if ((pacman.pos[0] == b.pos[0] && pacman.pos[1] == b.pos[1]) || +
	((Math.abs(pacman.pos[0] - b.pos[0]) < 2) && + 
	(Math.abs(pacman.pos[1] - b.pos[1]) < 2)) && +
	(pacman.axis == b.axis && pacman.direction != b.direction)) {
		if (game.reverse) {
			b.pos = [9, 8];
			game.score.bonus += 20;
			game.score.change.textContent = "Счёт: " + (game.score.number + game.score.bonus);
			b.axis = 0;
			b.direction = 1;
			b.change.style.top = b.pos[0] * scale + "px";
			b.change.style.left = b.pos[1] * scale + "px";
			setTimeout(() => {cheetMovment(b, 1, -1);}, 250);
			setTimeout(() => {cheetMovment(b, 1, 1);}, 500);
			setTimeout(() => {cheetMovment(b, 1, 1);}, 750);
			setTimeout(() => {cheetMovment(b, 1, -1);}, 1000);
			setTimeout(() => {cheetMovment(b, 1, -1);}, 1250);
			setTimeout(() => {cheetMovment(b, 1, 1);}, 1500);
			setTimeout(() => {cheetMovment(b, 1, 1);}, 1750);
			setTimeout(() => {cheetMovment(b, 1, -1);}, 2000);
			setTimeout(() => {cheetMovment(b, 0, -1);}, 2250);
			setTimeout(() => {	b.direction = -1;	}, 2500);
		}
		else { 
			pacmanCaught();
			stub.text.innerText = "ВЫ ПРОИГРАЛИ";
			stub.change.style.opacity = 1;
			game.stop = 1; 
		}
		return (1);
	}
	return (0);
}

function isPacmanWin() {
	if (game.score.number == 124) { 
		game.stop = 1;
		stub.text.innerText = "ВЫ ВЫИГРАЛИ";
		stub.change.style.opacity = 1;
		return (1); 
	}
	return(0);
}

function startHunter() {

	function badMoves (b){
		let requestHunterID = setTimeout(function hunt() {
			isPacmanCaught(b);
			isPacmanWin();

			if (game.stop) { 
				clearTimeout(requestHunterID); 
				return;
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
			requestID = setTimeout(hunt, 250); 
		}, 250);
	};
	setTimeout(() => {badMoves(bad[1]);}, 1500);
	setTimeout(() => {badMoves(bad[0]);}, 3500);
	setTimeout(() => {badMoves(bad[2]);}, 5500);

}