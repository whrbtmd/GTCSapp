$(document).ready(function(){
  /* 로그인화면 */
  //로그인 화면을 표시
  $('.Login').show();


   $('.loginBtnJoin').click(function(){
     $('.Login').hide();
     $('.Join').show();

   });
   // //로그인버튼

   var currentUser = null; //로그인 한 사용자 정보 저장 변수
   var isLogin = false; // 로그인중인지 여부 파악하는 변수

    $('.loginBtnLogin').click(function(){
       if(isLogin) return false; //이미 로그인중이라면 수행하지않음
       var id = $('.loginTxtID').val();
       var pw = $('.loginTxtPw').val();
       if(!id){
         window.alert('아이디를 입력하세요!');
         return false;
       }else if(!pw){
         window.alert('비밀번호를 입력하세요!')
         return false;
       }
       isLogin = true; //로그인 시도

       $.ajax({
         url:'https://gtcsphp.herokuapp.com/php/login.php',
         data:{
           id:id,
           pw:pw
         },
         dataType: 'jsonp',
         success:function(data){
           //로그인 성공
           if(data.result == "success"){

             $('.Login').hide();
             $('.Main').show();
             $('.Map').show();

             currentUser = id;


              $.ajax({
                url:'https://gtcsphp.herokuapp.com/php/group.php',
                data:{ id : id },
                dataType: 'jsonp',
                success:function(data){
                  //로그인 성공
                  if(data.result == "success"){

                    sessionStorage.setItem("id",id);
                    sessionStorage.setItem("cname",data.data[0].cname);
                    sessionStorage.setItem("gname1",data.data[0].gname1);
                    sessionStorage.setItem("gname2",data.data[0].gname2);
                    sessionStorage.setItem("gname3",data.data[0].gname3);
                    sessionStorage.setItem("gname4",data.data[0].gname4);
                    localStorage.setItem("holeNum",0);
                    location.href = "infoPage.html";
                  }
                  //로그인 실패 - 잘못된 값
                  else if(data.result == "wrong"){
                    window.alert('해당 캐디에 배정된 골퍼이름이 없습니다.');
                  }
                  //로그인 실패 - 오류
                  else{
                    window.alert('오1류가 발생하였습니다.');
                  }
                  isLogin = false;
                },
                error:function(){
                  window.alert('php오류가 발생하였습니다');

                }
              });
           }

           //로그인 실패 - 잘못된 값
           else if(data.result == "wrong"){
             window.alert('잘못된 아이디나 비밀번호를 입력하셨습니다.');
           }
           //로그인 실패 - 오류
           else{
             window.alert('오류가 발생하였습니다.');
           }
           isLogin = false;

         },
         error:function(){
           window.alert('dysss류가 발생하였습니다');
           isLogin = false;
           isLoginHiddenValue.value = isLogin;
         }
       });
    });
   /* 회원가입 화면 */
   // 회원가입 버튼
     var isJoin = false; //회원가입 중인지 여부 파악하는 변수
   $('.joinBtnJoin').click(function(){
     if(isJoin) return false; //이미 회원가입중이라면 수행하지 않음
     var id = $('.joinTxtID').val();
     var pw = $('.joinTxtPw').val();
     var pwc = $('.joinTxtPwc').val();

     if(!id){
       window.alert('아이디를 입력하세요!');
       return false;
     }
     else if(!pw){
       window.alert('비밀번호를 입력하세요!');
       return false;
     }
     else if(!pwc){
       window.alert('비밀번호 확인을 입력하세요!');
       return false;
     }
     else if(pw!=pwc){
       window.alert('비밀번호가 일치하지 않습니다!');
       return false;
     }
     isJoin = true;//회원가입 시도
     $.ajax({
       url: 'https://gtcsphp.herokuapp.com/php/join.php',
       data:{
         id: id,
         pw: pw
       },
       dataType: 'jsonp',
       success: function(data){
         console.log(data);
         if(data.result == "success"){
           window.alert('회원가입 완료! 메인화면으로 돌아갑니다.');
           $('.Join').hide();
           $('.Login').show();
         }
         else{
           window.alert('오류가 발생하였습니다.');
         }
          isJoin=false;
       },
       error:function(){

         window.alert('요류가 발생하였습니다.');
         isJoin = false;
       }
     });
   })
   // 회원가입 취소버튼
    $('.joinBtnCancel').click(function(){
      if(window.confirm('가입을 취소하시겠습니까?')){
        $('.Join').hide();
        $('.Login').show();
      }
    });
    //메인화면을 표시
    /*메인화면*/
    $('.mainBtnWrite').click(function(){
      $('.Main').hide();
      $('.Write').show();
      $('.writeTxtSubject').val('');
      $('writeTxtContent').val('');
    });
    $('.mainBtnLogout').click(function(){
      if(window.confirm('로그아웃 하시겠습니까?')){
        location.reload();
      }
    });
 });
