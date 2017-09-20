
var socket = io.connect('https://gtccc.herokuapp.com');  //localhost로 연결합니다.

//시작버튼을 누르기전 대기시간이 길수도 있으므로 계속 좌표를 찍기 위함
//위치 탐색 시작
navigator.geolocation.watchPosition(function(pos) {
  var loc = '대기상태';
  var h = '대기';
  var m = '대기';
  var s = '대기';
	//위치를 가져오는데 성공한 경우
  var info = {
    id : sessionStorage["id"],
    cname : sessionStorage["cname"],
    gname1 : sessionStorage["gname1"],
    gname2 : sessionStorage["gname2"],
    gname3 : sessionStorage["gname3"],
    gname4 : sessionStorage["gname4"],
     sessionno : sessionStorage["userno"], 
    lat : pos.coords.latitude,
    lng : pos.coords.longitude,
    h : h,
    m : m,
    s : s,
    state : "wait",
    loc: loc
  };
  console.log(info);

  socket.emit('my other event', info);   //서버에 my other event 이벤트를 보냅니다.



}, function(error) {
	//위치를 가져오는데 실패한 경우

},{ maximumAge:10000 , timeout : 10000, enableHighAccuracy:true});
