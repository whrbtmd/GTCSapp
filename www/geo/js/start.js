$(document).ready(function(){
//    지울것
$(document.body).on('click','.testbtn',function(){
    location.href="end.html"
})
//    여기
  var holeNum = localStorage["holeNum"];
  $('.toMapPage').click(function(){
    //시작버튼 클릭시
    //현재 시작하려는 홀이 1홀인 경우
    if(holeNum == 1){
      //전체 게임 시작 시간을 구함
      function getTimeStamp(){
      var d = new Date();

        var s=
        leadingZeros(d.getFullYear(),4)+
        leadingZeros(d.getMonth()+1,2)+
        leadingZeros(d.getDate(),2)+

        leadingZeros(d.getHours(),2)+
        leadingZeros(d.getMinutes(),2)+
        leadingZeros(d.getSeconds(),2);

        //시작 시간을 세션스토리지에 저장
      sessionStorage.setItem("startTime",s);
    };
    getTimeStamp();
  };
    //시간을 구할때 사용하는 함수
    function leadingZeros(n,digits){
      var zero='';
      n=n.toString();

      if(n.length < digits){
        for(i=0;i<digits - n.length; i++)
        zero += '0';
      }
      return zero+n;
    }
    //localStorage.setItem("startTime",holeNum);
    //map.html로 이동
      if(sessionStorage.mpsn == "caddie"){
    location.href = "map.html";
      }
      else if(sessionStorage.mpsn == "golfer"){
    location.href = "golfer_map.html";    
      }
  });


  var loadInfo = function(){
    //$('.Items').empty();
    //데이터를 AJAX로 불러옵니다.
    //이 함수가 실행 될때마다 홀번호를 추가
    holeNum++;
    localStorage.setItem("holeNum",holeNum);
    //10홀인경우 마지막페이지로 이동후 홀번호를 0으로 변경
    if(holeNum == 10){
      localStorage.setItem("holeNum",0);
      location.href = "end.html";
    }
    //각홀에 대한 정보를 불러옴
    $.ajax({
      url: 'https://gtcsphp.herokuapp.com/php/startInfo.php',
      data:{ holeNum : holeNum },
      dataType: 'jsonp',
      success: function(data){

        if(data.result == "success"){

            //캐디이름과 골퍼들 이름은 세션스토리지에서 받아옴

            var parNum = data.data[0].parNum; // 현재 몇홀인지
            var holeDis = data.data[0].holeDis; //현재 홀에 대한 핀까지 총 거리
            var holeNoteInfo = data.data[0].holeNoteInfo; //홀의 참고해야될 사항
            var pinPos = data.data[0].pinPos; // 핀위치
            var direc = data.data[0].direc; // 지도상 홀의 방향
            sessionStorage.setItem('direction',direc);
            var item = $('<div></div>').addClass('Item');
            var itemText = $('<div></div>').addClass('ItemText').appendTo(item);
            $('<h2></h2>').text(holeNum + '번홀').appendTo(itemText);
            $('<p></p>').text("Par : " + parNum ).appendTo(itemText);
            $('<p></p>').text("거리 : " + holeDis).appendTo(itemText);
            $('<p></p>').text("특이사항 : " + holeNoteInfo).appendTo(itemText);
            $('<p></p>').text("핀위치 : " + pinPos).appendTo(itemText);
            item.appendTo($('.Items'));
            
        }
        else{
          window.alert('php안의 코드오류.');

        }
      },
      error: function(){


      }
    });
  } //loadInfo 함수 끝
  loadInfo();

});//document 로딩 함수 끝
