/********* 전역선언 **********/


/********* 사용자함수 **********/
$(".header-wrapper .navi-wrap .more-bar").mouseenter(onMore); 
$(".header-wrapper .navi-wrap .more-bar").mouseleave(onMoreLeave);
/********* 이벤트선언 **********/
function onMore(){
   $(".header-wrapper .navi-wrap .more-bar ul.sub").show();
   $(this).css("backgroundColor" , "#ccc;");
}
function onMoreLeave() {
   $(".header-wrapper .navi-wrap .more-bar ul.sub").hide();
}



var swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  }
});
