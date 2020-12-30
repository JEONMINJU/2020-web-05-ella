/********* 전역선언 **********/
var scTop, topHeight, logoHeight, winWidth, navi = [];
// 언제나 가져다 사용할 수 있게 전역변수로 선언해놓음.


/********* 사용자함수 **********/
function renderPrd() {
	$('.prd').each(function(i){
		var discount = $(this).data('discount');
		var icon = $(this).data('icon');
		$(this).find('.icon-wrap').empty();
		if(discount) {
			$(this).find('.icon-wrap').append('<div class="discount">'+discount+'</div>');
		}
		if(icon && icon.length > 0) {
			for(var i=0, html=''; i<icon.length; i++) {
				html += '<div class="icon" style="background-color: '+icon[i].bg+';">'+icon[i].title+'</div>';
			}
			$(this).find('.icon-wrap').append(html);
		}
	});
}

function chgImg(el, src) {
	$(el).parents('.prd').find('.img-front').attr('src', src);
	$(el).parent().addClass('active').siblings().removeClass('active');
}

function renderStar() {
	$(".star").each(function(i){ //나의 페이지에 있는 모든 .star 각각에 적용하고 싶을땐 .each (모든 스타 각각에게 이 함수를 실행해줄게요가 이치)
		var score = Number($(this).data('score')); //여기서 스코어를 받아서
		if(score > 0) $(this).find("i").addClass("active");  // score가 0보다 크면,현재 선택된 스타 안에 있는 i 태그에 액티브를 주고,
		$(this).find(".mask").css("left", score * 20 + "%"); //현재 선택된 mask	의 값을 찾아서 스코어 곱하기 20을 해달라
	});
}

function mainBanner() {
	var swiper = new Swiper('.main-wrapper.swiper-container', {
		loop: true,
		effect: 'fade',
		pagination: {
			el: '.main-wrapper .pager-wrap',
			clickable: true,
		},
		navigation: {
			nextEl: '.main-wrapper .bt-next',
			prevEl: '.main-wrapper .bt-prev',
		},
	});
} /* mainBanner 스와이퍼  가져온거*/

function createNavi(r) {
	var html  = '<a href="'+r.link+'" class="hover-line">';
	if(r.icon) html += '<i class="'+r.icon+'"></i> ';
	html += r.name;
	html += '</a>';
	return html;
}

function createSub(r) {
	var html = '<div class="sub-navi-wrap">';
	for(var i=0; i<r.depth2.length; i++) {
		if(r.depth2[i].depth3 && i > 0) html += '</div><div class="sub-navi-wrap">';
		html += '<a href="'+r.depth2[i].link+'" class="sub-navi bold">'+r.depth2[i].name+'</a>';
		if(r.depth2[i].depth3) {
			for(var j=0; j<r.depth2[i].depth3.length; j++) {
				html += '<a href="'+r.depth2[i].depth3[j].link+'" class="sub-navi hover-line">'+r.depth2[i].depth3[j].name+'</a>';
			}
		}
	}
	html += '</div>';
	return html;
}

function createSub2(r) {
	for(var i=0, html=''; i<r.depth2.length; i++) {
		html += '<li class="depth depth2">';
		html += '	<a href="'+r.depth2[i].link+'">'+r.depth2[i].name+'</a>';
		if(r.depth2[i].depth3 && r.depth2[i].depth3.length > 0) {
			html += '<ul>';
			for(var j=0; j<r.depth2[i].depth3.length; j++) {
				html += '<li class="depth depth3">';
				html += '	<a href="'+r.depth2[i].depth3[j].link+'">'+r.depth2[i].depth3[j].name+'</a>';
				html += '</li>';
			}
			html += '</ul>';
		}// depth3가 있니? depth3가 0보다 크면 만들어 줄게의 이프문 
		html += '</li>';
	}
	return html;
}

function createSubNavi(el, r) {
	$(el).prepend(createNavi(r))
	$(el).find('.sub-wrapper2').append(createSub2(r));
	$(el).mouseenter(onSub2Enter);
	$(el).mouseleave(onSub2Leave);
	$(el).find('.depth2').mouseenter(onDepth2Enter);// 내 안에 있는 .depth2라는 놈을 찾아서  그 뎁스2를 마우스엔터하면 밑에 작성해놓은 onDepth2Enter 작동
	$(el).find('.depth2').mouseleave(onDepth2Leave);
}

// 스크롤 시 네비상황
function naviShowHide() {
	if(winWidth >= 1199) {// 1199보다 크면 PC 버전
		if(scTop >= topHeight + logoHeight){//topHeight + logoHeight 두개 크기를 벗어나는 순간
			$(".navi-wrapper").css({"position": "fixed"});
			$(".navi-wrapper > .wrapper").css("max-width", "100%");//원래 1200px으로 되있는걸 100%
			$(".navi-wrapper .navi-logo").css("display", "block"); // 안에 있는 애들이기때문에 > 사용 안한다.
			$(".navi-wrapper .bt-login").css("display", "block");
		}
		else {
			$(".navi-wrapper").css("position", "relative");
			$(".navi-wrapper > .wrapper").css("max-width", "1200px");
			$(".navi-wrapper .navi-logo").css("display", "none");
			$(".navi-wrapper .bt-login").css("display", "none");
		}
		$(".logo-wrapper").css({"position": "relative"});
	}// 위가 어떻든 로고레퍼는 기준을 가져야한다.
	else { // Mobile
		if(scTop >= topHeight) //탑의 높이보다 커지면(얘를 스크롤로 지나가면)
			$(".logo-wrapper").css({"position": "fixed"});
		else
			$(".logo-wrapper").css("position", "relative");
		$(".navi-wrapper").css({"position": "relative"}); // 얘도 언제나 기준
	}
}

function createMoNavi() {
	console.log(navi);
	var html = '';
	html += '<div class="top-wrap">';
	html += '	<div class="close-wrap3 bt-close" onclick="onModalHide()">'; // bt-close를 클릭하면 onModalHide()가 될것이다
	html += '		<i class="fa fa-times"></i>';
	html += '	</div>';
	html += '	<div class="tel-wrap">Available 24/7 at <strong>(018) 900-6690</strong></div>';
	html += '</div>';
	html += '<ul>';
	for(var i=0; i<navi.length; i++) {
		html += '<li onclick="createDepth2('+i+');">';
		html += '<a href="#">'+navi[i].name+'</a>';
		html += '<i class="fa fa-angle-right"></i>';
		html += '</li>';
	}
	html += '</ul>';
	$(".modal-navi").find('.depth1').html(html)
	$(".modal-navi").find('.depth1').append($(".trans-wrapper").clone().attr("style", "")).find('.trans-bg').remove();
	$(".modal-navi").find('.depth1').find('.trans-wrapper .bt-down').click(onLangSel);


	$(".modal-navi .depth2, .modal-navi .depth3").removeClass('active');  //초기화를 시켜주고 시작한다. 바스 클릭시 모달 나올때마다 뎁스1이 먼저 보이게?
}

function createDepth2(idx) {
	html  = '<div class="top-wrap">';
	html += '	<div class="close-wrap3 bt-prev" onclick="closeDepth(2)">';
	html += '		<i class="fa fa-angle-left"></i>';
	html += '	</div>';
	html += '	<h4 class="title">'+navi[idx].name+'</h4>';
	html += '</div>';
	html += '<ul>';
	for(var i=0; i<navi[idx].depth2.length; i++) {
		if(navi[idx].depth2[i].depth3 && navi[idx].depth2[i].depth3.length > 0) {
			html += '<li onclick="createDepth3('+idx+', '+i+');">';
			html += '<a href="#">'+navi[idx].depth2[i].name+'</a>';
			html += '<i class="fa fa-angle-right"></i>';
			html += '</li>';
		}
		else {
			html += '<li>';
			html += '<a href="#">'+navi[idx].depth2[i].name+'</a>';
			html += '</li>';
		}
	}
	html += '</ul>';
	$(".modal-navi .depth2").html(html);
	$(".modal-navi .depth2").addClass("active")
}

function createDepth3(idx, idx2) {
	html  = '<div class="top-wrap">';
	html += '	<div class="close-wrap3 bt-prev" onclick="closeDepth(3)">';
	html += '		<i class="fa fa-angle-left"></i>';
	html += '	</div>';
	html += '	<h4 class="title">'+navi[idx].depth2[idx2].name+'</h4>';
	html += '</div>';
	html += '<ul>';
	for(var i=0; i<navi[idx].depth2[idx2].depth3.length; i++) {
		html += '<li>';
		html += '<a href="#">'+navi[idx].depth2[idx2].depth3[i].name+'</a>';
		html += '</li>';
	}
	html += '</ul>';
	$(".modal-navi .depth3").html(html);
	$(".modal-navi .depth3").addClass("active");
}

// n 은 넘버를 받은거
function closeDepth(n) {
	$(".modal-navi .depth"+n).removeClass("active");
} // 2를 보내면 2번이 리무브, 3을 보내면 3번 리무브 (뎁스 닫을때)

// r  과  el 을  받는다. 
function createPrd(r, el) {
	for(var i=0, html=''; i<r.length; i++) {
		html  = '<li class="prd swiper-slide" '; 
		html += 'data-discount="'+(r[i].discount || '')+'" ';
		html += 'data-icon=\'[';
		if(r[i].icon && r[i].icon.length > 0) {
			for(var j=0; j<r[i].icon.length; j++) {
				html += '{"title": "'+r[i].icon[j].title+'", "bg": "'+r[i].icon[j].bg+'"},';
			}
			html = html.slice(0, -1);
		}
		html += ']\'>';
		html += '<div class="icon-wrap"></div>';
		html += '<div class="quick-wrap">';
		html += '<i class="fa fa-eye"></i>';
		html += '<span>Quick View</span>';
		html += '</div>';
		html += '<div class="img-wrap">';
		html += '<img src="'+r[i].imgFront[0].big+'" alt="사진" class="w-100 img-front">';
		html += '<img src="'+r[i].imgBack+'" alt="사진" class="w-100">';
		html += '<a href="#" class="bt-white">ADD CART</a>';
		html += '</div>';
		html += '<div class="title-wrap">';
		html += '<div class="title">'+r[i].title+'</div>';
		html += '<i class="bt-like far fa-heart" onclick="$(this).addClass(\'fa\').removeClass(\'far\');"></i>';
		html += '</div>';
		html += '<ul class="choice-wrap">';
		for(var j=0; j<r[i].imgFront.length; j++) {
			html += '<li class="choice '+(j==0 ? 'active': '')+'">';
			html += '<img src="'+r[i].imgFront[j].thumb+'" alt="thumb" class="w-100" onclick="chgImg(this, \''+r[i].imgFront[j].big+'\');">';
			html += '</li>';
		}
		html += '</ul>';
		html += '<div class="content-wrap">';
		html += '<span class="content hover-line">'+r[i].content+'</span>';
		html += '<span> - </span>';
		html += '<span class="color hover-line">'+r[i].color+'</span>';
		html += '</div>';
		html += '<div class="price-wrap">'+r[i].price+'</div>';
		html += '<div class="star-wrap">';
		html += '<div class="star" data-score="'+r[i].star+'">';
		for(var j=0; j<5; j++) html += '<i class="fa fa-star"></i>';
		html += '<div class="mask"></div>';
		html += '</div>';
		html += '<a href="'+r[i].link+'" class="bt-more">MORE SIZES ABAILABLE</a>';
		html += '</div>';
		html += '</li>';
		$(el).append(html);
	}
	renderStar();	// star
	renderPrd();	// discount
}


/********* 이벤트선언 **********/
mainBanner();	// 배너세팅

$(window).scroll(onScroll); // scroll spy, window 에 3개의 이벤트를 붙였다.
$(window).resize(onResize).trigger("resize"); // el 높이, 폭, 위치

$('.top-wrapper .icon-down').click(onLangChg); // 언어선택
$('.trans-wrapper .bt-down').click(onLangSel); // 언어선택
$('.trans-wrapper .trans-bg').click(onTransBg); // trans창 닫기
$('.trans-wrapper .lang').click(onLangClick); // trans창 닫기

$.get('../json/navi-new.json', onNaviNew);	// new release 생성
$.get('../json/navi-best.json', onNaviBest);	// best sellers 생성
$.get('../json/navi-sales.json', onNaviSales); // sales 생성
$.get('../json/navi-men.json', onNaviMen); // Men 상품 가져오기
$.get('../json/navi-women.json', onNaviWomen); // Women 상품 가져오기
$.get('../json/navi-kids.json', onNaviKids); // Kids 상품 가져오기

$.get('../json/new-products.json', onNewProducts); // new releases 상품 가져오기
$.get('../json/looking.json', onLooking);	// Looking  생성 looking.json을 찾아서 onLooking을 실행할 것이다.

$.get('../json/prd.json', onPrd);	// prd banner 생성
$.get('../json/collection.json', onCollection);	// collection banner 생성

$(".navi-wrapper .navi").mouseenter(onNaviEnter);	// 메인네비
$(".navi-wrapper .navi").mouseleave(onNaviLeave);	// 메인네비

$(".modal-trigger").click(onModalShow);
$(".modal-container").click(onModalHide);
$('.modal-wrapper').click(onModalWrapperClick);
$('.modal-wrapper').find(".bt-close").click(onModalHide);

$('.footer-wrapper .bt-show').click(onFooterClick);
 
/********* 이벤트콜백 **********/
function onFooterClick() {
	$(this).toggleClass('active');
	$(this).parent().next().stop().slideToggle(500); 
} // 내 부모의 밑에 있는 애를 토글

function onCollection(r) {
	createPrd(r, '.collection-wrap .swiper-wrapper');
	var swiper = new Swiper('.collection-wrap.swiper-container', {
		slidesPerView: 1,
		loop: true,
		navigation: {
			nextEl: '.collection-wrap .bt-next',
			prevEl: '.collection-wrap .bt-prev',
		},
		breakpoints: {
			576: {
				slidesPerView: 2
			},
			768: {
				slidesPerView: 3
			}
		}
	});
}

function onPrd(r) {
	createPrd(r, '.prd-wrap');
	var swiper = new Swiper('.prd-wrapper.swiper-container', {
		slidesPerView: 1,
		loop: true,
		navigation: {
			nextEl: '.prd-wrapper .bt-next',
			prevEl: '.prd-wrapper .bt-prev',
		},
		breakpoints: {
			576: {
				slidesPerView: 2
			},
			768: {
				slidesPerView: 3
			},
			992: {
				slidesPerView: 4
			},
		}
	});
}

function onLooking(r) {
	for(var i=0, html=''; i<r.length; i++) {
		html += '<li class="spot">';
		html += '<a href="'+r[i].link+'">';
		html += '<img src="'+r[i].src+'" alt="spot-img" class="w-100 animate__animated">';
		html += '<h3 class="title hover-line">'+r[i].title+'</h3>';
		html += '</a>';
		html += '</li>';
	}
	$(".looking-wrapper .spot-wrapper").html(html);
}

function onTransBg(e) {
	e.stopPropagation();
	onLangChg();
}

function onModalWrapperClick(e) { //여기서 e  는 event 인자를 써먹은 것
	e.stopPropagation();
}

function onModalShow(e) {
	e.preventDefault();	// 기본이벤트 a니까 href의 기능(기본기능)을 막는다. preventDefault는 자바스크립트의 기본 옵션이다.
	$(".modal-container").css({"display": "block"}); // 디스플레이 논 되어 있던 것을 블럭으로 바꾸고( 꺼진 기능 켜주고)
	$(".modal-container").css("opacity");//오퍼시티가 0인 것을 인식시켜준 후
	$(".modal-container").addClass('active'); //액티브를 줘서 오퍼시티 1이 먹게.
	$("body").addClass("hide"); //그래야 body가 height=100vh를 갖고 오버플로우를 먹는다. 그러므로 스크롤을 죽이게 된다.
	$($(this).data('modal')).addClass("active");
	if($(this).data('modal') === '.modal-navi') createMoNavi();
}


function onModalHide(e) {
	$(".modal-container").removeClass('active');
	$('.modal-wrapper').removeClass("active");
	setTimeout(function(){
		$(".modal-container").css({"display": "none"});
		$("body").removeClass("hide");//리무브클래스 하이드가 되면서 스크롤은 다시 생긴다.
	}, 300); //0.3초 이후에 이 함수({}안의)를 실행해라
}

function onResize(e) {
	topHeight = $('.top-wrapper').outerHeight(); //topHeigh 는 .top-wrapper 의 outerHeight 값을 구한다.
	logoHeight = $('.logo-wrapper').outerHeight();
	winWidth = $(window).width(); //리사이즈 될때마다 winWidth 를 구한다. window의 width 값을 구한다.

	  if(winWidth > 767) {
			  $(".footer-wrap > div > ul").attr("style, ");
			  $(".footer-wrap .bt-show").removeClass("active");
		}
}

function onScroll(e) {
	scTop = $(this).scrollTop(); // 스크롤 탑을 구해서 naviShowHide() 함수 실행
	naviShowHide(); // navi-wrapper fixed, 리사이즈 될때마다 naviShowHide함수 실행하라.
}

function onSub2Enter() {
	$(this).find('.sub-wrapper2').stop().slideDown(300);
}// 내 안에 있는 .sub-wrapper2를 찾아서 다운시켜라

function onSub2Leave() {
	$(this).find('.sub-wrapper2').stop().slideUp(300);
}

function onDepth2Enter() {
	$(this).find('ul').stop().fadeIn(300);
}

function onDepth2Leave() {
	$(this).find('ul').stop().fadeOut(300);
}

function onNaviMen(r) {
	navi[2] = r;
	createSubNavi('.navi.navi-men', r);
}

function onNaviWomen(r) {
	navi[3] = r;
	createSubNavi('.navi.navi-women', r);
}

function onNaviKids(r) {
	navi[4] = r;
	createSubNavi('.navi.navi-kids', r);
}

function onNaviEnter() {
	$(this).find(".sub-wrapper").addClass("active");
}

function onNaviLeave() {
	$(this).find(".sub-wrapper").removeClass("active");
}

function onNaviNew(r) {
	navi[0] = r;
	$(".navi.navi-new").prepend(createNavi(r));
	var html = createSub(r);
	html += '<div class="sub-banner">';
	html += '	<img src="../img/mega-menu-4_460x.jpg" alt="배너" class="mw-100">';
	html += '</div>';
	$(".navi.navi-new").find('.sub-navi-wrapper').append(html);
}

function onNaviBest(r) {
	navi[1] = r;
	$(".navi.navi-best").prepend(createNavi(r));
	$(".navi.navi-best").find('.sub-navi-wrapper').append(createSub(r));
	for(var i=0; i<r.alphabet.length; i++) {
		if(r.alphabet[i].class == '')
			html = '<li><a>'+r.alphabet[i].name+'</a></li>';
		else 
			html = '<li><a href="#" class="active">'+r.alphabet[i].name+'</a></li>';
		$(".navi.navi-best").find('.alphabet-wrap').append(html);
	}
}

function onNaviSales(r) {
	navi[5] = r;
	$(".navi.navi-sales").prepend(createNavi(r));
	for(var i=0; i<r.depth2.length; i++) {
		html  = '<div class="brand-wrap">';
		html += '<div class="img-wrap" style="background-image: url('+r.depth2[i].src+'); order: '+i%2+'">';
		html += '</div>';
		html += '<ul class="brand-link">';
		html += '<li class="sub-navi bold">'+r.depth2[i].name+'</li>';
		for(var j=0; j<r.depth2[i].depth3.length; j++) {
			html += '<li class="sub-navi hover-line">';
			html += '<a href="'+r.depth2[i].depth3[j].link+'">'+r.depth2[i].depth3[j].name+'</a>';
			html += '</li>';
		}
		html += '</ul>';
		html += '</div>';
		$(".navi.navi-sales").find('.sales-wrapper').append(html);
	}
}

function onNewProducts(r) {
	for(var i=0, html='', $slide; i<r.length; i++) {
		html  = '<div class="slide swiper-slide">';
		html += '<div class="img-wrap">';
		html += '<img src="'+r[i].src+'" alt="상품" class="w-100">';
		html += '</div>';
		html += '<div class="content-wrap">';
		html += '<h4 class="title">'+r[i].title+'</h4>';
		html += '<p class="summary">'+r[i].summary+'</p>';
		html += '<div class="star" data-score="'+r[i].star+'">';
		for(var j=0; j<5; j++) html += '<i class="fa fa-star"></i>';
		if(Number(r[i].star) > 0) html += '<div class="mask"></div>';
		html += '</div>';
		html += '<div class="content">';
		html += '<span class="price-original">$'+r[i].originalPrice+'</span>';
		html += '<span> | </span>';
		html += '<span class="origin">'+r[i].origin+'</span>';
		html += '</div>';
		html += '<div class="price-sale">$'+r[i].salePrice+'</div>';
		html += '</div>';
		html += '</div>';
		$slide = $(html).appendTo(".navi-new .swiper-wrapper");
		renderStar();
	}
	var swiper = new Swiper('#newSlide .swiper-container', {
		slidesPerView: 4,
		loop: true,
		autoplay: {
			delay: 5000,
		},
		navigation: {
			nextEl: '#newSlide .bt-next',
			prevEl: '#newSlide .bt-prev',
		},
	});
}
function onLangChg() {
	$(".trans-wrapper").stop().slideToggle(200);
	$(".trans-wrapper .lang-sel").stop().slideUp(200);
	//trans-wrapper 가 들어가든 나오든 밑에 .lang-sel 은 없어야 하니깐 업문장 넣어주기(안넣어주면 다시 trans-wrapper 를 클릭해서 내렸을때도 그대로 있다.)
} 
function onLangSel() {
	$(".trans-wrapper .lang-sel").stop().slideUp(200);
	console.log($(this).next());
	if($(this).next().css("display") === 'none') $(this).next().stop().slideDown(200); //먼저 나의 바로 옆에 있는 놈의 display속성을 읽어들이고,
}  //내 밑에 있는 놈이 보이는 상태니 ? 안보이는 상태니? , 즉 내 옆 애가 안보이면 내 옆에 있는 놈만 슬라이드 다운 시켜 보이게하라.
function onLangClick() {
	var $container = $(this).parent().parent().parent();
	var lang = $(this).text(); //변수에 랭귀지를 넣어 나의 텍스트를 읽어들이면,
	var bg = $(this).prev().css("background-image"); //나의 이전에(앞에) 있는 놈에 이미지를 불러온다.

		//여기서 나,this는 ul class .lang을 의미하며 그 앞에는 디브 class .flag에 백그라운드 이미지(국기이미지)들어가 있음
	$container.find('.lang').removeClass('active'); //컨데이너에 있는 랭을 찾아서 액티브를 리무브하고
	$(this).addClass('active'); //나만 액티브를 가질거야.(텍스트 밑에 라인 생기는거)
	$container.find('.flag-now').css("background-image", bg); //$container 안에서 .flag-now 를 찾아서 그놈의 css에 있는 background-image를 bg로 바꿔라
	$container.find('.lang-now').text(lang); //.lang-now'를 찾아서 텍스트를 lang으로 넣어라.
	$(this).parent().parent().stop().slideUp(200); //나( lang ) 의 부모( li )의 부모 ( ul ) 
}
