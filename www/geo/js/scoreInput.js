$(document).ready(function(){
  var holeNum = localStorage["holeNum"];
  var h = sessionStorage["hour"];
  var m = sessionStorage["minute"];
  var s = sessionStorage["second"];

  $('.toStartPage').click(function(){ //저장버튼을 클릭시
    //스코어에서 입력한 점수를 DB에 저장
    location.href = "start.html";
    var gname1 = sessionStorage["gname1"];
    var gname2 = sessionStorage["gname2"];
    var gname3 = sessionStorage["gname3"];
    var gname4 = sessionStorage["gname4"];
    var score1 = $('#score1').text();
    var score2 = $('#score2').text();
    var score3 = $('#score3').text();
    var score4 = $('#score4').text();
    var scoreTime = h + "." + m + "." + s;
    $.ajax({
      url: 'https://gtcsphp.herokuapp.com/php/scoreInput.php',
      data:{
        gname1: gname1,
        gname2: gname2,
        gname3: gname3,
        gname4: gname4,
        score1: score1,
        score2: score2,
        score3: score3,
        score4: score4,
        holeNum: holeNum,
        time: scoreTime
      },
      dataType: 'jsonp',
      success: function(data){
        console.log(data);
        if(data.result == "success"){
          window.alert('스코어 저장완료.');
        }
        else{
          window.alert('쿼리오류가 발생하였습니다.');
        }

      },
      error:function(){

      }
    });
  });

  //score페이지에 각홀의 par수를 찍음
  $.ajax({
    url: 'https://gtcsphp.herokuapp.com/php/startInfo.php',
    data:{ holeNum : holeNum },
    dataType: 'jsonp',
    success: function(data){
      console.log(data);
      if(data.result == "success"){

        var parNum = data.data[0].parNum; // 해당홀의 par

        $('.par').html(parNum);
      }
      else{
        window.alert('쿼리오류가 발생하였습니다.');
      }

    },
    error:function(){

    }
  });

  //각홀의 경기 시간을 표시
  var time = function(){
  var time = $('<div></div>').addClass('Time')
  var timeText = $('<div></div>').addClass('timeText').appendTo(time);
  $('<h3></h3>').text('경기 경과시간 : ' + h + ":" + m + ":" + s).appendTo(timeText);
  time.appendTo($('#time'));
};
  time();
// $('.subOne').click(function(){
//   $('.score').html("-1");
// });
// $('.zero').click(function(){
//   $('.score').html("0");
// });
// $('.one').click(function(){
//   $('.score').html("1");
// });
// $('.two').click(function(){
//   $('.score').html("2");
// });
// $('.three').click(function(){
//   $('.score').html("3");
// });
// $('.four').click(function(){
//   $('.score').html("4");
// });
// $('.add').click(function(){
//   $('.score').html("+1");
// });
// $('.sub').click(function(){
//   $('.score').html("-1");
// });
var score;
var td;
var parent;
document.body.onclick = function(event) {

    //클릭시 어디가 클릭 되었는지 알기위함
    if(event.target.tagName == 'TD'){
      //td = document.getElementById(score);
      //클릭된 td의 부모를 얻음
      parent = event.target.parentNode.parentNode;
      //td의 값을 변경하기위해 td엘리먼트를 얻음
      td = parent.getElementsByClassName("score");
      console.log();
    }
    //각 버튼이 클릭시 td의 값을 변경
    switch(event.target.className){
      case "subOne":
        $(td).html("-1");
        break;
      case "zero":
        $(td).html("0");
        break;
      case "one":
        $(td).html("1");
        break;
      case "two":
        $(td).html("2");
        break;
      case "three":
        $(td).html("3");
        break;
      case "four":
        $(td).html("4");
        break;
        //add버튼 과 sub버튼 클릭시 td의 점수에 플러스하거나 마이너스
      case "add":
        var num = 0;
        num = parseInt($(td).text());
        num++;
        $(td).html(num);
        break;
      case "sub":
        var num = 0;
        num = parseInt($(td).text());
        num--;
        $(td).html(num);
        break;
    }
}

$("#gname1").html(sessionStorage["gname1"]);
$("#gname2").html(sessionStorage["gname2"]);
$("#gname3").html(sessionStorage["gname3"]);
$("#gname4").html(sessionStorage["gname4"]);
});
