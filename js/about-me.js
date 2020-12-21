
function onGet(r){
  var html, i;
  //돔 생성
  for(i in r){
    html = '<div class="thumb" data-id="'+i+'">';// i는 0부터 시작 (0,1,2,3,4,5,6) , 얘는 클릭의 주인
    html += '<img src="'+r[i].src+'" alt="'+r[i].title+'">';
    html += '</div>';
    $(html).appendTo(".thumb-wrapper").click(onThumbClick); // html을 .thumb-wrapper에 붙여라 ( 생성과 동시에 이벤트를 줄려고. 원래 - $(".thumb-wrapper").append(html); )
  }
  $(".thumb").eq(0).trigger('click');
//어차피 r에 접근할거니깐 안에 넣어준다. onThumbClick이 밑에 onThumbClick에 들어갈꺼니깐.
function onThumbClick(){
      var idx = $(this).data('id'); //여기 인덱스값이 들어온다. 
      $(".img-wrap img").attr("src", r[idx].src);
      $(".info-wrap .title").text(r[idx].title);
      $(".info-wrap .summary").text(r[idx].summary);
      $(".info-wrap .bt-search").attr('href', '//google.com/search?q=' +r[idx].title).text(r[idx].title + ' 검색'); //bt-search의 attr중 href속성에다가 //구글닷컴 서치의 쿼리는 ' 
}
};

$.get('../json/aboutme.json', onGet); //ajax 통신을 이용한 데이터 받아오기