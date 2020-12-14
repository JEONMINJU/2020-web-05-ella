/********* 전역선언 **********/
var product =  [ 
	{
		title: "MARK",
		summary: "Dinterdum Pretium De Condimentus",
		star: 5.0,
		originalPrice:199.00,
		salePrice:"",
		origin: "from",
		src: "../img/pic1.jpg"
	},
	{
		title: "G-STAR",
		summary: "Dinterdum Pretium De Condimentus",
		star: 0,
		originalPrice:189.00,
		salePrice:"",
		origin: "",
		src: "../img/pic1.jpg"
	},
]

/********* 사용자함수 **********/


/********* 이벤트선언 **********/
$('.top-wrapper .icon-down').click(onLangChg); // 언어선택
$('.top-wrapper .bt-down').click(onLangSel); // 언어선택


/********* 이벤트콜백 **********/
function onLangChg() {
	$(".trans-wrapper").stop().slideToggle(200);
	$(".trans-wrapper .lang-sel").stop().slideUp(200);
}
function onLangSel() {
	$(".trans-wrapper .lang-sel").stop().slideUp(200);
	if($(this).next().css("display") === 'none') $(this).next().stop().slideDown(200);
}