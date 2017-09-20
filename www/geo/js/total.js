$(document).ready(function(){

  var userId = sessionStorage["id"];
  var caddieId = sessionStorage["cname"];
  var sum =0;
var resertotal=0;
  $('#total').click(function(){ //구매현황 버튼을 누를시

    $.ajax({
      url: 'https://shielded-fortress-32957.herokuapp.com/php/totalReserFee.php',
      data:{ gname : userId
       },
      dataType: 'jsonp',
      success: function(data){
        console.log(data);
        if(data.result == "success"){
          //  totalBodyReservation
          var green = data.data[0].green;
          var cart = data.data[0].cart;
          var caddie = data.data[0].caddie;
           resertotal = data.data[0].resertotal;

          $('.totalBodyReservation').html('<table><tbody><tr><th>그린 피 : </th><td>'+green+'</td></tr>'
                                            +'<tr><th>카트비 : </th><td>'+cart+'</td></tr>'
                                            +'<tr><th>캐디비 : </th><td>'+caddie+'</td></tr>'
                                            +'<tr><th>합계 : </th><td>'+resertotal+'</td></tr>'
                                            +'</tbody></table>');
          window.alert('예약리스트 불러옴');

        }
        else{
          window.alert('예약리스트 쿼리 오류가 발생하였습니다.');
        }

      },
      error:function(){
          window.alert('예약리스트 연결 오류');
      }
    });


    $.ajax({
      url: 'https://shielded-fortress-32957.herokuapp.com/php/totalMenuList.php',
      data:{
        gname: userId

      },
      dataType: 'jsonp',
      success: function(data){
        console.log(data);
        if(data.result == "success"){
        var foodSum =0;
        //totalBodyFood
        for(var i =0; i < data.data.length ; i++){

          var food_name = data.data[i].food_name;
          var price = data.data[i].price;
          var pqtt = data.data[i].pqtt;
          foodSum += parseInt(price);
          $('<tr><th>'+food_name+' : </th><td>'+price+'</td><td>'+pqtt+'</td></tr>'
            +'<tr><th>합계 : </th><td>'+foodSum+'</td></tr>').appendTo($('.totalBodyFoodTbody'));
        }
            alert(resertotal);
            alert(foodSum);
        sum= parseInt(resertotal)+foodSum;
        $('<tr><th>총 합계 : </th><td>'+sum+'</td></tr>').appendTo($('.totalBodyFoodTbody'));

          window.alert('메뉴리스트 불러옴');
        }
        else{
          window.alert('메뉴리스트 쿼리 오류');
        }

      },
      error:function(){
          window.alert('메뉴리스트 연결 오류');
      }
    });




}); //click function end

// document.body.onclick = function(event) {
//
//     //클릭시 어디가 클릭 되었는지 알기위함
//     if(event.target.tagName == 'TD'){
//       //td = document.getElementById(score);
//       //클릭된 td의 부모를 얻음
//       parent = event.target.parentNode.parentNode;
//       //td의 값을 변경하기위해 td엘리먼트를 얻음
//       td = parent.getElementsByClassName("score");
//       console.log();
//     }
//     //각 버튼이 클릭시 td의 값을 변경
//
// }

});