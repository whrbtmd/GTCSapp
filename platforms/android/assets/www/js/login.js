$(document).ready(function(){
  
    /*로그인화면*/
    //로그인 화면을 표시
    $('.login-form').show();
    
    $('.loginBtnJoin').click(function(){
        $('.login-form').hide();
        $('.sign-form').show();
     });
    //로그인버튼
    $('.loginBtnLogin').click(function(){ 
        var id = $('.loginTxtID').val();
        var pw = $('.loginTxtPW').val();
        if(!id){
            window.alert('아이디를 입력하세요!');
            return false;
        }else if(!pw){
            window.alert('비밀번호를 입력하세요!');
            return false;
        }
        isLogin = true; //로그인 시도
        $.ajax({
            url:'https://shielded-fortress-32957.herokuapp.com/php/login.php',
            data:{
                id: id,
                pw: pw
            },
            dataType: 'jsonp',
            success: function(data){
                //로그인성공
                if(data.result == "success"){
                    var mpsn = data.data.mpsn;
                    swal("로그인 성공")
                            sessionStorage.isLogin="yes";
                            sessionStorage.user=id; 
                            sessionStorage.userno= Math.floor(Math.random()*100000+1);
                            sessionStorage.mpsn=mpsn;
              $.ajax({
                url:'https://gtcsphp.herokuapp.com/php/group.php',
                data:{ id : id },
                dataType: 'jsonp',
                success:function(data){
                  //로그인 성공
                  if(data.result == "success"){
                if(sessionStorage.mpsn == 'caddie'){
                    location.href = "home.html";
                        }else if(sessionStorage.mpsn == 'golfer'){
                            location.href = "golfer_home.html";
                        }else{
                             location.href = "home.html";
                        }
                      
                    sessionStorage.setItem("id",id);
                    sessionStorage.setItem("cname",data.data[0].cname);
                    sessionStorage.setItem("gname1",data.data[0].gname1);
                    sessionStorage.setItem("gname2",data.data[0].gname2);
                    sessionStorage.setItem("gname3",data.data[0].gname3);
                    sessionStorage.setItem("gname4",data.data[0].gname4);
                      sessionStorage.setItem("cdnum",data.data[0].cdnum);
                    localStorage.setItem("holeNum",0);
                  }
                  //로그인 실패 - 잘못된 값
                  else if(data.result == "wrong"){
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
                //로그인 실패 - 잘못된값
                else if(data.result== "wrong"){
                    window.alert('잘못된 아이디나 비밀번호를 입력하셨습니다.');
                }
                //로그인 실패 - 오류
                else{
                    window.alert('오류가 발생하였습니다.');
                }
                isLogin = false;
            },
            error: function(){
                window.alert('오류가 발생하였습니다.');
                isLogin = false;
            }
            
        });
    });

    /*회원가입 화면*/
    //회원가입 버튼
    var isJoin = false;//회원가입중인지 여부 파악하는 변수
    $('.joinBtnJoin').click(function(){
        
     if(isJoin) return false; //이미 회원가입중이면 수행안함
        var id= $('.joinTxtID').val();
        var pw= $('.joinTxtPW').val();
        var pwc= $('.joinTxtPwc').val();

        isJoin = true;//회원가입시도
    $.ajax({
        url: 'https://shielded-fortress-32957.herokuapp.com/php/join.php',
        data:{
        id: id,
        pw: pw
    },
    dataType: 'jsonp',
           success: function (data){
        if(data.result == "success"){
           swal('회원가입 완료')
            $('.sign-form').hide();
            $('.login-form').show();
        } else {
            window.alert('오류가 발생했습니다1');
        }
        isJoin = false;
    },
        error: function () {
            window.alert('오류가 발생하였습니다2');
            isJoin = false;
        }
    })
    });
    //회원가입 취소버튼
    $('.joinBtnCancel').click(function(){
        swal({   title: "취소 하시겠습니까?",   text: "메인페이지로 돌아갑니다",   type: "warning",   showCancelButton: true,   confirmButtonColor: "#DD6B55",   confirmButtonText: "OK",   closeOnConfirm: true }, function(){ 
                    $('.sign-form').hide();
            $('.login-form').show();
        });
    });
 });