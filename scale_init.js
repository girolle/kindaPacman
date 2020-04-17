windowHeight = document.documentElement.clientHeight;
windowWidth = document.documentElement.clientWidth;
let scale
if (windowHeight > 1.16 * windowWidth) {
	boxSize = windowWidth;
	scale = boxSize / 19;

}
else {
	boxSize = windowHeight;
	scale = boxSize / 22;
}
document.getElementById("logo").style.height = (4 * scale) + "px";

document.getElementById("box").style.height = (boxSize - 2 * scale) + "px";
document.getElementById("box").style.width = (boxSize - 2 * scale) + "px";
document.getElementById("box").style.top = (2 * scale) + "px";
document.getElementById("game").style.height = 19 * scale + "px";
document.getElementById("game").style.width = 17 * scale + "px";
document.getElementById("score").style.fontSize = scale / 1.55 + "px"; 
document.getElementById("score-box").style.top = scale + "px"; 
document.getElementById("score-box").style.left = scale + "px"; 
document.getElementById("score-box").style.height = scale + "px"; 
document.getElementById("score-box").style.width = 3 * scale + "px"; 
document.getElementById("stub").style.width = 10 * scale + "px";
document.getElementById("stub").style.height = 10 * scale + "px";
document.getElementById("stub").style.padding = scale + "px";
document.getElementById("stub-text").style.fontSize = scale / 1.7 + "px"; 
document.getElementById("button").style.width = 3 * scale + "px";
document.getElementById("button").style.height = scale + "px";
document.getElementById("button").style.fontSize = scale / 1.6 + "px";


const mapSize = [18, 16];
