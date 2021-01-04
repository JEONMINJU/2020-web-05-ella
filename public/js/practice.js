/************이벤트선언************/
$("input").keyup(onType);
$("input").keydown(onPush);
$("input").mouseenter(onEnter);
$("input").mouseleave(onLeave);
$(window).resize(onResize);
$(".mypage").click(onAlret);
/************이벤트콜백************/
function onType() {
	$("input").css("background-color", "pink");
}
function onPush() {;
	$("input").css("background-color", "yellow");
}
function onEnter() {
	$("input").css("background-color", "blue");
}
function onLeave() {
	$("input").css("background-color", "lightgray");
}

var i = 0; // 선언은 밖에다가.
function onResize(){
 $(".window-resize > span").text(i += 1);
}

function onAlret() {
  alert("plz don't give up");
}