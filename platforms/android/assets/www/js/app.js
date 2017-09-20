$(document).ready(function(){
          $('.call').click(function(){
              $('#call').show();
              $('#chat').hide();
          });
          $('.chat').click(function(){
              $('#chat').show();
              $('#call').hide();
          });
    //회원의 등급별 기능을 나누기 위하여 포지션을 세션스토리지에 저장
     var cid = sessionStorage.user;     
     var cpos = sessionStorage.mpsn;
    /*메인화면*/
    $('.u_name').html('환영합니다! '+ cid+'님');
                    if(sessionStorage.mpsn="caddie"){        
                $.ajax({
                        url:'https://shielded-fortress-32957.herokuapp.com/php/cdnum.php',
                        data: {
                            iddz:sessionStorage.user,
                            cdnum:sessionStorage.userno
                        },
                        dataType: 'jsonp', 
                        success: function(data){
                            if(data.result == "success"){
                } 
            },
            error: function(){
            }
        }); 
    }
    $(document.body).on('click','#startPlay', function(){
                    $.ajax({
                url:'https://gtcsphp.herokuapp.com/php/group.php',
                data:{ id : sessionStorage.id },
                dataType: 'jsonp',
                success:function(data){
                    if(data.data[0]){
                  var play= data.data[0].play;
                        if(play == 1){
                        location.href="./geo/infoPage.html";
                            }else{
                                swal("배정된 경기가 없음");
                            }
                    }else{
                        swal("배정된 경기가 없음");
                    }
                  //로그인 성공
                  if(data.result == "success"){
                      if(play == 0){
                         swal("배정된 경기가 없음");
                        }
                      else{            
                      }
                  }
                  else if(data.result == "wrong"){
                    swal("배정된 경기가 없음");
                  }
                  else{
                      swal("배정된 경기가 없음");
                  }
                },
                error:function(){
                    swal("배정된 경기가 없음");
                }
              });  
    });
    //주문예약리스트 보기
    $(document.body).on('click', '.cktestbtn', function(){
        $('.content-primary1').empty();
     var loadPosts2 = function(){
        //데이터를 ajax로 불러옴
        $.ajax({
            url:'https://shielded-fortress-32957.herokuapp.com/php/orderR.php',
            data: { },
            async: 'true',
            dataType: 'jsonp', 
            success: function(data){
            var ui1 = $('<ui data-role="listview" data-inset="true" data-filter="true" class="ui-listview ui-listview-inset ui-corner-all ui-shadow"></ui').appendTo($('.content-primary1'));
            $('<li data-role="list-divider" role="heading" class="ui-li-divider ui-bar-inherit ui-first-child"></li>').text('예약 리스트').appendTo(ui1);
            var li1 = $('<li class="ui-li-has-thumb ui-last-child"></li>').appendTo(ui1);
                if(data.result == "success"){
                    var cnt = data.data.length;
                    for(var i = 0; i < cnt; i++){
                        var pid = data.data[i].pid;
                        var id = data.data[i].id;
                        var food_name = data.data[i].food_name;
                        var qtt = data.data[i].qtt;
                        var time = data.data[i].time;
                        
                    if(id == sessionStorage.user){
                        var a1 = $('<a href="#" data-transition="slide" class="ui-btn ui-btn-icon-right ui-icon-carat-r"></a>').attr('data-id', pid).appendTo(li1);
                        var datebtn = $('<h3></h3>').text(food_name).appendTo(a1);
                        var button1 = $('<p><font color="red">수량 : '+qtt+'</font></p>').appendTo(a1);
                        $('<p></p>').text(time).appendTo(a1);
                                
                            $('<button></button>').addClass('ReBtnDel AppBtnRed').text('삭제').appendTo(button1)   
                            $('<button></button>').addClass('ReBtnUp AppBtnRed').text('수량변경').appendTo(button1) 
                        }
                    }
                } else{
                    $('.OrderR').hide();
                    $('.Login').show();
                }
            },
            error: function(){
                window.alert('오류가 발생하였습니다.ddd')
                $('.OrderR').hide();
                $('.Login').show();
            }
        });
    };
        loadPosts2();
});
//예약전송 버튼 누를시 추후 8홀시작버튼 누를시로 변경
     $('.SubmitOrder').click(function(){
        swal({   title: "전송 하시겠습니까?",   text: "예약리스트는 비워집니다.",   type: "warning",   showCancelButton: true,   confirmButtonColor: "#5CD1E5",   confirmButtonText: "OK",   closeOnConfirm: true }, function(){
        var loadPosts5 = function(){
            $('.content-primary1').empty();
        //데이터를 ajax로 불러옴
        $.ajax({
            url:'https://shielded-fortress-32957.herokuapp.com/php/orderR.php',
            data: { },
            dataType: 'jsonp', 
            success: function(data){
                if(data.result == "success"){
                    var cnt = data.data.length;

                    for(var i = 0; i < cnt; i++){
                        var pid = data.data[i].pid;
                        var id = data.data[i].id;
                        var food_name = data.data[i].food_name;
                        var qtt = data.data[i].qtt;
                        var time = data.data[i].time;
                        var price = data.data[i].price;
                            if(id=sessionStorage.user){
                                $.ajax({
                                    url: 'https://shielded-fortress-32957.herokuapp.com/php/Morder_list.php',
                                    
                                    data: {
                                        id: id,
                                        food_name: food_name,
                                        qtt: qtt,
                                        price: price
                                        },
                                    dataType:'jsonp',
                            
                                  success: function(data){
                    if (data.result == "success"){
                        }else{
                            window.alert('오류가 발생했습니다.bbbbsss');
                        }
                                      isPost=false;
                                  },
                                error:function(){
                        window.alert('오류가 발생하였습니다.cccc');
                                    isPost = false;
                                }
                                });
                        }
                    }
                         var postId = sessionStorage.user;
                        $.ajax({
                            url: 'https://shielded-fortress-32957.herokuapp.com/php/Order_send_c.php',
                            data:{
                                    postId : postId
                                    },
                            dataType: 'jsonp',
                            success: function(data){
                                if(data.result == "success"){
                                        } else{
                                            window.alert('오류가 발생하였습니다.첫번');
                                        }
                                    },
                                error: function(){
                                    window.alert('오류가 발생하였습니다.두번');
                                        }
                            });
                } else{
                    window.alert('오류가 발생하였습니다.(1)');
                }
            },
            error: function(){
                window.alert('오류가 발생하였습니다.qqqq')
            }
        });
    };
        loadPosts5();
     }); });
    //캐디의 최종주문확인
   $(document.body).on('click', '.cktestbtnCk', function(){
       $('.content-primary4').empty();
     var loadPosts = function(){
        $('.Items6').empty();
        //데이터를 ajax로 불러옴
        $.ajax({
            url:'https://shielded-fortress-32957.herokuapp.com/php/MorderR.php',
            data: { },
            dataType: 'jsonp', 
            success: function(data){
            var ui4 = $('<ui data-role="listview" data-inset="true" data-filter="true" class="ui-listview ui-listview-inset ui-corner-all ui-shadow"></ui').appendTo($('.content-primary4'));
            $('<li data-role="list-divider" role="heading" class="ui-li-divider ui-bar-inherit ui-first-child"></li>').text('주문확인').appendTo(ui4);
            var li4 = $('<li class="ui-li-has-thumb ui-last-child"></li>').appendTo(ui4);
                if(data.result == "success"){
                    var cnt = data.data.length;
                    for(var i = 0; i < cnt; i++){
                        var pid = data.data[i].pid;
                        var id = data.data[i].id;
                        var food_name = data.data[i].food_name;
                        var qtt = data.data[i].qtt;
                        var time = data.data[i].time;
                        
                    if(id == sessionStorage.user){
                        var a4 = $('<a href="#" data-transition="slide" class="ui-btn ui-btn-icon-right ui-icon-carat-r"></a>').attr('data-id', pid).appendTo(li4);
                        var datebtn = $('<h3></h3>').text(food_name).appendTo(a4);
                        var button4 = $('<p><font color="red">수량 : '+qtt+'</font></p>').appendTo(a4);
                        $('<p></p>').text(time).appendTo(a4);
                            $('<button></button>').addClass('ReBtnDelCk').text('삭제').appendTo(button4);   
                            $('<button></button>').addClass('ReBtnUpCk').text('수량변경').appendTo(button4); 
                        }
                    }
                } else{
                    window.alert('오류가 발생하였습니다.(2)');

                }
            },
            error: function(){
                window.alert('오류가 발생하였습니다.wwww')

            }
        });
    };
        loadPosts();
   });

    //캐디 업데이트 버튼 클릭시 실행
        $(document.body).on('click', '.PosBtnUp', function(){
        if(window.confirm('캐디회원으로 변경하시겠습니까?')){
            var id = $(this).parent().parent().parent().attr('data-id');
            var updateTarget = $(this).parent().parent().parent();
            $.ajax({
                url: 'https://shielded-fortress-32957.herokuapp.com/php/position.php',
                data:{
                    postId :id
                },
                dataType: 'jsonp',
                success: function(data){
                    if(data.result == "success"){
                        location.reload();
                    } else{
                        window.alert('오류가 발생하였습니다.(4)');
                    }
                },
                error: function(){
                    window.alert('오류가 발생하였습니다.222');
                }
            });
        }
    });
    
    //일반회원 버튼 클릭시 실행
            $(document.body).on('click', '.PosBtnDa', function(){
        if(window.confirm('일반회원으로 변경하시겠습니까?')){
            var id = $(this).parent().parent().parent().attr('data-id');
            var updateTarget = $(this).parent().parent().parent();
            $.ajax({
                url: 'https://shielded-fortress-32957.herokuapp.com/php/position1.php',
                data:{
                    postId :id
                },
                dataType: 'jsonp',
                success: function(data){
                    if(data.result == "success"){
                        location.reload();
                    } else{
                        window.alert('오류가 발생하였습니다.(5)');
                    }
                },
                error: function(){
                    window.alert('오류가 발생하였습니다.222');
                }
            });
        }
    });
    //로그 아웃시 세션스토리지를 비우고 새로고침
    $('.LogOutBtn').click(function(){
        if (window.confirm('로그아웃 하시겠습니까?')){
            sessionStorage.clear();
            location.reload(); 
        }
    });
    //관리자의 최종 메뉴확인
                $.ajax({
                        url:'https://shielded-fortress-32957.herokuapp.com/php/MorderR.php',
                        data: { },
                        dataType: 'jsonp', 
                        success: function(data){
                            if(data.result == "success"){
                                var cnt = data.data.length;
                                var ztime = "cc";
                                var zid = "zdzscs";
                                var ui7 = $('<ui data-role="listview" data-inset="true" data-filter="true" class="ui-listview ui-listview-inset ui-corner-all ui-shadow"></ui').appendTo($('.content-primary7'));
                                var li7 = $('<li class="ui-li-has-thumb ui-last-child" style="margin-bottom:10% "></li>').appendTo(ui7);
                    
                    for(var j = 0; j < cnt; j++){
                        var pid = data.data[j].pid;
                        var did = data.data[j].id; 
                        var time = data.data[j].time;
                        var food_name = data.data[j].food_name;
                        var qtt = data.data[j].qtt;
                        
                        if(zid != did){
                        $('<p style="display:inline;font-size:40px; margin-top:15%;"></p>').text(did).appendTo(li7);
                        zid = did;
                        }
                        if(ztime != time){
                        var itemTime = $('<br><li class="ui-li-has-thumb ui-last-child"  style="border:solid 1px; border-color:#008299;border-radius:10px;margin-bottom:1px;"></li>').attr('data-time', data.data[j].time).text("주문시간: "+ time + "  " ).appendTo(li7);
                            
                        var delBtn = $('<button style="margin-left:5%;height:32px;border-raduis:6px;"><p style="font-size:12px;">판매완료</p></button>').addClass('ReDtBtndel').appendTo(itemTime); 
                           ztime = time;
                        }
                        var a7 = $('<a href="#" data-transition="slide" class="ui-btn ui-btn-icon-right ui-icon-carat-r"></a>').attr('data-id', pid).appendTo(li7);
                        var datebtn = $('<h3></h3>').text(food_name).appendTo(a7);
                        var button1 = $('<p><font color="red">수량 : '+qtt+'</font></p>').appendTo(a7);
                        $('<p></p>').text(time).appendTo(a7);
                    }
                            
                } else{
                    window.alert('오류가 발생하였습니다.');
                }
            },
            error: function(){
                window.alert('오류가 발생하였습니다.yyyyy');
            }
        });
    /*글쓰기화면*/
    var isPost = false; // 게시글 작성 중인지 체크하는 변수
    $('.writeBtnWrite').click(function(){
        if (isPost) return false;
        var food_name = $('.writeTxtFood_name').val();
        var price = $('.writeTxtPrice').val();
        var size = $('.writeTxtSize').val();
        var lev = $('.writeTxtLev').val();
        if (!food_name){
            swal("메뉴 이름을 입력해주세요!")
            return false;
        }
        else if (!price){
            swal("가격을 입력해주세요!")
            return false;
        }       
        else if (!size){
            swal("사이즈를 입력해 주세요!")
            return false;
        }
        
        swal({   title: "알림",   text: "등록 하시겠습니까?",   type: "warning",   showCancelButton: true,   confirmButtonColor: "#5CD1E5",   confirmButtonText: "OK",   closeOnConfirm: false }, function(){
            isPost = true;
            $.ajax({
                url: 'https://shielded-fortress-32957.herokuapp.com/php/post.php',
                data: {
                    food_name: food_name,
                    price: price,
                    size: size,
                    lev: lev,
                },
                dataType:'jsonp',
                success: function(data){
                    if (data.result == "success"){
                      loadPosts();
                    }else{
                        window.alert('오류가 발생했습니다.bbbb');
                    }
                    isPost=false;
                },
                error:function(){
                }
            });
            });
    });
    
    $('.writeBtnCancel').click(function(){
        swal({   title: "알림",   text: "취소 하시겠습니까?",   type: "warning",   showCancelButton: true,   confirmButtonColor: "#5CD1E5",   confirmButtonText: "OK",   closeOnConfirm: false }, function(){  
            location.href="home.html"
        });
    });
     //메뉴 불러와 화면에 출력하는 함수
        var loadPosts = function(){
        //데이터를 ajax로 불러옴
        $.ajax({
            url:'https://shielded-fortress-32957.herokuapp.com/php/load.php',
            data: { },
            dataType: 'jsonp', 
            success: function(data){
                if(data.result == "success"){
            //음식
            var ui = $('<ui data-role="listview" data-inset="true" data-filter="true" class="ui-listview ui-listview-inset ui-corner-all ui-shadow"></ui').appendTo($('.content-primary'));
            $('<li data-role="list-divider" role="heading" class="ui-li-divider ui-bar-inherit ui-first-child"></li>').text('Foods').appendTo(ui);
            //음료
            var ui2 = $('<br><ui data-role="listview" data-inset="true" data-filter="true" class="ui-listview ui-listview-inset ui-corner-all ui-shadow"></ui').appendTo($('.content-primary'));
            $('<li data-role="list-divider" role="heading" class="ui-li-divider ui-bar-inherit ui-first-child"></li>').text('Drink').appendTo(ui2);
                    var cnt = data.data.length;
                    for(var i = 0; i < cnt; i++){
                        var lev = data.data[i].lev;
                        var id = data.data[i].id;
                        var food_name = data.data[i].food_name;
                        var price = data.data[i].price;
                        var size = data.data[i].size;
                        var price = data.data[i].price;
                        var img = data.data[i].img;
                        if(lev == 1){
                        var item = $('<li class="ui-li-has-thumb ui-last-child" style:"margin-top:0px;margin-bottom:0px"></li>').attr('data-id', id).addClass(ui);
                        var itemText = $('<li data-transition="slide" class="ui-btn ui-btn-icon-right ui-icon-carat-r"></li>').appendTo(item);
                        //이미지불러오기
                            $('<img style="height:100%; width:90px; margin-top:3px; margin-left:5px;"></img>').attr('src',''+img+'').appendTo(itemText);
                        //이까지
                        $('<h3 style="display:inline"></h3>').text(food_name).appendTo(itemText);
                       var itemMenu = $('<br><p style="display:inline"><font color="red" >Price : '+price+'원</font></p>').appendTo(itemText);
                        $('<br><p style="display:inline"></p>').text(size).appendTo(itemText);
                            var form = $('<form class=ajax'+food_name+' style="display:inline;"</form>').appendTo(itemMenu);
                            var select = $('<select name="order_qtt"></select>').appendTo(form);   
                            var option = $('<option value="1">1</option><option value = "2">2</option><option value="3">3</option><option value="4">4</option>') .appendTo(select);
                            var cfood_name = $('<input type="hidden" name="food_name" value="'+food_name+'"></input>').appendTo(form);
                            var price= $('<input type="hidden" name="price" value="'+price+'"></input>').appendTo(form);
                            var cid = $('<input type="hidden" name="id" value="'+sessionStorage.user+'"></input>').appendTo(form);
                            var input = $('<input type="button" value="주문" onClick="send(this.form);">').appendTo(form);
                        item.appendTo($(ui));
                    }else if(lev == 2){
                        var item2 = $('<li class="ui-li-has-thumb ui-last-child"></li>').attr('data-id', id).addClass(ui2);
                        var itemText2 = $('<li data-transition="slide" class="ui-btn ui-btn-icon-right ui-icon-carat-r"></li>').appendTo(item2);
                                   //이미지불러오기
                        $('<img style="height:100%; width:90px; margin-top:3px; margin-left:5px;"></img>').attr('src',''+img+'').appendTo(itemText2);
                        //이까지
                        $('<h3 style="display:inline"></h3>').text(food_name).appendTo(itemText2);
                       var itemMenu2 = $('<br><p style="display:inline"><font color="red" >Price : '+price+'원</font></p>').appendTo(itemText2);
                        $('<br><p style="display:inline"></p>').text(size).appendTo(itemText2);
                            var form = $('<form class=ajax'+food_name+' style="display:inline ;"</form>').appendTo(itemMenu2);
                            var select = $('<select name="order_qtt"></select>').appendTo(form);   
                            var option = $('<option value="1">1</option><option value = "2">2</option><option value="3">3</option><option value="4">4</option>') .appendTo(select);
                            var cfood_name = $('<input type="hidden" name="food_name" value="'+food_name+'"></input>').appendTo(form);
                            var price= $('<input type="hidden" name="price" value="'+price+'"></input>').appendTo(form);
                            var cid = $('<input type="hidden" name="id" value="'+sessionStorage.user+'"></input>').appendTo(form);
                            var input = $('<input type="button" value="주문" onClick="send(this.form);">').appendTo(form);
                        item2.appendTo($(ui2));
                    }
                    }
                } else{
                }
            },
            error: function(){
                window.alert('오류가 발생하였습니다.iiiiii')
            }
        });
       }
        loadPosts();


    //작성한 글삭제
    $(document.body).on('click', '.mainBtnDel', function(){
            var id = $(this).parent().parent().parent().attr('data-id');
            var removeTarget = $(this).parent().parent().parent();
        swal({   title: "경고",   text: "삭제 하시겠습니까?",   type: "warning",   showCancelButton: true,   confirmButtonColor: "#DD6B55",   confirmButtonText: "delete",   closeOnConfirm: false }, function(){   swal("완료!", "삭제되었습니다.", "success");
            $.ajax({
                url: 'https://shielded-fortress-32957.herokuapp.com/php/del.php',
                data:{
                    postId :id
                },
                dataType: 'jsonp',
                success: function(data){
                    if(data.result == "success"){
                        removeTarget.remove();
                    } else{
                        window.alert('오류가 발생하였습니다.');
                    }
                },
                error: function(){
                    window.alert('오류가 발생하였습니다.222');
                }
            });
        });
    });
        //작성한 예약리스트 삭제

    $(document.body).on('click', '.ReBtnDel', function(){
            var id = $(this).parent().parent().attr('data-id');
            var removeTarget = $(this).parent().parent();
swal({   title: "경고",   text: "삭제 하시겠습니까?",   type: "warning",   showCancelButton: true,   confirmButtonColor: "#DD6B55",   confirmButtonText: "delete",   closeOnConfirm: false }, function(){   swal("완료!", "삭제되었습니다.", "success");

            $.ajax({
                url: 'https://shielded-fortress-32957.herokuapp.com/php/redel.php',
                data:{
                    postId :id
                },
                dataType: 'jsonp',
                success: function(data){
                    if(data.result == "success"){
                        removeTarget.remove();
                    } else{
                        window.alert('오류가 발생하였습니다.');
                    }
                },
                error: function(){
                    window.alert('오류가 발생하였습니다.222');
                }
            });
        });
    });
    //최종주문 삭제
        $(document.body).on('click', '.ReBtnDelCk', function(){
            var id = $(this).parent().parent().attr('data-id');
            var removeTarget = $(this).parent().parent();
swal({   title: "경고",   text: "삭제 하시겠습니까?",   type: "warning",   showCancelButton: true,   confirmButtonColor: "#DD6B55",   confirmButtonText: "delete",   closeOnConfirm: false }, function(){   swal("완료!", "삭제되었습니다.", "success");
            $.ajax({
                url: 'https://shielded-fortress-32957.herokuapp.com/php/forderCK.php',
                data:{
                    postId :id
                },
                dataType: 'jsonp',
                success: function(data){
                    if(data.result == "success"){
                        removeTarget.remove();
                    } else{
                        window.alert('오류가 발생하였습니다.');
                    }
                },
                error: function(){
                    window.alert('오류가 발생하였습니다.222');
                }
            });
        
    });});
    //작성한 예약리스트 수정 
        $(document.body).on('click', '.ReBtnUpCk', function(){
            
            var id = $(this).parent().parent().attr('data-id');
            var updateTarget = $(this).parent().parent();
                swal({   title: "알림",   text: "수량을 입력해주세요.",   type: "input",   showCancelButton: true,   closeOnConfirm: false,   animation: "slide-from-top",   inputPlaceholder: "수량 입력" },
                     function(inputValue){   if (inputValue === false) return false;      if (inputValue === "") {     swal.showInputError("수량이 입력되지 않았습니다.");     return false   }
            var qtt= inputValue;
            $.ajax({
                url: 'https://shielded-fortress-32957.herokuapp.com/php/ForderUp.php',
                data:{
                    qtt:qtt,
                    postId :id
                },
                dataType: 'jsonp',
                success: function(data){
                    if(data.result == "success"){
                         location.reload();
                        
                    } else{
                        window.alert('오류가 발생하였습니다.');
                    }
                },
                error: function(){
                    window.alert('오류가 발생하였습니다.222');
                }
            });
    });});
    //최종 예약리스트 수정
            $(document.body).on('click', '.ReBtnUp', function(){
            
            var id = $(this).parent().parent().attr('data-id');
            var updateTarget = $(this).parent().parent().parent();
            swal({   title: "알림",   text: "수량을 입력해주세요.",   type: "input",   showCancelButton: true,   closeOnConfirm: false,   animation: "slide-from-top",   inputPlaceholder: "수량 입력" },
                     function(inputValue){   if (inputValue === false) return false;      if (inputValue === "") {     swal.showInputError("수량이 입력되지 않았습니다.");     return false   }
            var qtt= inputValue;
            $.ajax({
                url: 'https://shielded-fortress-32957.herokuapp.com/php/OrderUp.php',
                data:{
                    qtt:qtt,
                    postId :id
                },
                dataType: 'jsonp',
                success: function(data){
                    if(data.result == "success"){
                         location.reload();
                    } else{
                        window.alert('오류가 발생하였습니다.');
                    }
                },
                error: function(){
                    window.alert('오류가 발생하였습니다.222');
                }
            });
        });
    });

    //판매금액 추가
        $(document.body).on('click', '.ReDtBtndel', function(){
            var time2 = $(this).parent().attr('data-time');
                $.ajax({
                        url:'https://shielded-fortress-32957.herokuapp.com/php/MorderR.php',
                        data: { },
                        dataType: 'jsonp', 
                        success: function(data){
                            if(data.result == "success"){
                        var cnt = data.data.length;
                        var now = new Date();
                        var date =now.getDate();
                        var day =$day =now.getDay();
                        var month =$day =now.getMonth();
                    for(var j = 0; j < cnt; j++){
                        var price = data.data[j].price;
                        var qtt = data.data[j].qtt;
                             $.ajax({
                                    url: 'https://shielded-fortress-32957.herokuapp.com/php/sell_complete.php',
                                    data: {
                                        price: price,
                                        date: date,
                                        day: day,
                                        month: month,
                                        qtt: qtt
                                        },
                                    dataType:'jsonp',
                                  success: function(data){
                    if (data.result == "success"){
                        }else{

                        }
                                      isPost=false;
                                  },
                                error:function(){

                                    isPost = false;
                                }
                                });
                    }
                } else{

                }
            },
            error: function(){


            }
        });        
    });
});