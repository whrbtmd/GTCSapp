$(document).ready(function(){

  $('.toStartPage').click(function(){

    location.href = "start.html";

  });
  var sid = sessionStorage["id"];

  //전체 경기에 대한 정보를 호출
  var loadInfo = function(id){
    //$('.Items').empty();
    //데이터를 AJAX로 불러옵니다.
    $.ajax({
      url: 'https://gtcsphp.herokuapp.com/php/loadInfo.php',
      data:{ id : id },
      dataType: 'jsonp',
      success: function(data){

        if(data.result == "success"){

            //캐디이름과 골퍼들 이름은 세션스토리지에서 받아옴
            var caddieName = sessionStorage["cname"];
            var golferName1 = sessionStorage["gname1"];
            var golferName2 = sessionStorage["gname2"];
            var golferName3 = sessionStorage["gname3"];
            var golferName4 = sessionStorage["gname4"];

            var holeCount = data.data[0].holeCount; // 게임당 총 홀수
            var startHole = data.data[0].startHole; //시작해야 될 코스
            var endHole = data.data[0].endHole; // 종료홀
            var startTime = data.data[0].startTime; //시작해야 될 시간
            var noteInfo = data.data[0].noteInfo; //그날 참고해야될 사항
            var precid = data.data[0].precid; // 순서상 이전 팀의 캐디아이디
            sessionStorage.setItem('precid',precid);
            var item = $('<div></div>').addClass('Item');
            var itemText = $('<div></div>').addClass('ItemText').appendTo(item);
            $('<h2></h2>').text('참가자').appendTo(itemText);
            $('<h4></h4>').text('캐디 성명 : ' + caddieName).appendTo(itemText);
            $('<h4></h4>').text('골퍼1 성명 : ' + golferName1).appendTo(itemText);
            $('<h4></h4>').text('골퍼2 성명 : ' + golferName2).appendTo(itemText);
            $('<h4></h4>').text('골퍼3 성명 : ' + golferName3).appendTo(itemText);
            $('<h4></h4>').text('골퍼4 성명 : ' + golferName4).appendTo(itemText);
            $('<div></div>').attr('class','empty').appendTo(itemText);
            $('<h2></h2>').text('코스정보').appendTo(itemText);
            $('<p></p>').text("총 홀수 : " + holeCount).appendTo(itemText);
            $('<p></p>').text("시작 홀 : " + startHole).appendTo(itemText);
            $('<p></p>').text("종료 홀 : " + endHole).appendTo(itemText);
            $('<p></p>').text("경기 시작시간 : " + startTime).appendTo(itemText);
            $('<p></p>').text("특이사항 : " + noteInfo).appendTo(itemText);

            item.appendTo($('.Items'));

        }
        else{
          window.alert('php안의 코드오류.');

        }
      },
      error: function(){
        window.alert('ajaxFailed 오류.');

      }
    });
  } //loadInfo 함수 끝
loadInfo(sid);

});//document 로딩 함수 끝
