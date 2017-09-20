document.write("<script src='../js/cordova.js'></script>");

$(document).ready(function(){
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
       document.addEventListener("backbutton", function(e){
           swal({   title: "경기 중입니다.",   text: "뒤로가기 버튼을 사용할 수 없습니다.",   timer: 700,   showConfirmButton: false });
        }, false);
       }
});
