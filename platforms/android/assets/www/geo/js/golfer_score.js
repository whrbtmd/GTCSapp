$(document).ready(function(){
var startTime = sessionStorage['startTime'];
var gname1 = sessionStorage["gname1"];
var gname2 = sessionStorage["gname2"];
var gname3 = sessionStorage["gname3"];
var gname4 = sessionStorage["gname4"];

  //총 스코어 테이블을 생성
     $(document).on("click",'#ajaxScore', function(){
$('.scoreTable').empty();
  var loadScore = function(){
    //$('.Items').empty();
    //데이터를 AJAX로 불러옵니다.
    $.ajax({
      url: 'https://gtcsphp.herokuapp.com/php/loadScore.php',
      data:{
              gname1 : gname1,
              gname2 : gname2,
              gname3 : gname3,
              gname4: gname4
              },
      dataType: 'jsonp',
      success: function(data){

        if(data.result == "success"){
          var num =0;
          $('<tr><th>이름</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>합계</th><th>평균</th></tr>').appendTo($('.scoreTable'));
          for(var j=0; j < 4 ; j++){
            //j는 테이블의 행 번호
           var tr = $('<tr></tr>').appendTo($('.scoreTable'));
           var sum =0;
           if(j == 0)
           $('<td></td>').text(gname1).appendTo(tr);
           if(j == 1)
            $('<td></td>').text(gname2).appendTo(tr);
           if(j == 2)
            $('<td></td>').text(gname3).appendTo(tr);
           if(j == 3)
            $('<td></td>').text(gname4).appendTo(tr);

            for(var i=0; i < 9 ; i++){
              //i는 한개 행의 인덱스 번호
              if(j == 0 ){
                var gname0Data = data.data[num].gname0;
                sum += parseInt(data.data[num].gname0);
                $('<td></td>').text(gname0Data).appendTo(tr);
              }
              if(j == 1){
                var gname1Data = data.data[num].gname1;
                sum += parseInt(data.data[num].gname1);
                $('<td></td>').text(gname1Data).appendTo(tr);
              }
               if(j == 2){
                var gname2Data = data.data[num].gname2;
                sum += parseInt(data.data[num].gname2);
                $('<td></td>').text(gname2Data).appendTo(tr);
              }
              if(j == 3){
                var gname3Data = data.data[num].gname3;
                sum += parseInt(data.data[num].gname3);
                $('<td></td>').text(gname3Data).appendTo(tr);
              }
              num++;
                }
                //총 합의 평균을 구함
                var avg = sum/9;
                $('<td></td>').text(sum).appendTo(tr);
                $('<td></td>').text(avg.toFixed(2)).appendTo(tr);
            }// 바깥for문 종료
          // var gname0Data = data.data[0].gname1;
          // window.alert(gname0Data);

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
loadScore();
     });

});
