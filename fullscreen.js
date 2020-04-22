function fullScreen(element) {
	if(element.requestFullscreen) {
	  element.requestFullscreen();
	} else if(element.webkitrequestFullscreen) {
	  element.webkitRequestFullscreen();
	} else if(element.mozRequestFullscreen) {
	  element.mozRequestFullScreen();
	}
  }

function goFullscreen() {
	mf = document.getElementById("head");
	mf.webkitRequestFullscreen();
	mf.style.display="";
	setTimeout(()=>{ mobile();}, 200);
}
function fullscreenChanged() {
	if (document.webkitFullscreenElement == null) {
		mf = document.getElementById("head");
		mf.style.display="none";
	}
}
document.onwebkitfullscreenchange = fullscreenChanged;
document.documentElement.onclick = goFullscreen;
document.onkeydown = goFullscreen;
