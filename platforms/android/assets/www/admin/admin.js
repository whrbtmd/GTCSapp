
/*
   All functions pertaining to geolocation and google maps.
   Note: China has its own Maps configurations and therefore the code
   needs to be modified for Chinese geolocations.
 */

 var trackerId = 0;
 var geocoder;
 var theUser = {};
 var map;
 var socket = io.connect('https://gtccc.herokuapp.com');  //localhost로 연결합니다.
 var markers = [];
 var infowindows = [];
 var limitTime = 30;
 var limitMinute = 1;
 var yellowIcon = 'image/yellowIcon.png';
 var redIcon = 'image/redIcon.png';
 var blueIcon = 'image/blueIcon.png';
 var flagIcon = 'image/flag1flag.png';
 var hole1Icon = 'image/1holeMarker.png';
 var hole2Icon = 'image/2holeMarker.png';
 var hole3Icon = 'image/3holeMarker.png';
 var pinNum = "";
 var indexArray1 = [];
 var indexArray2 = [];
 var indexArray3 = [];


 //지도 초기화
 function initialize(){
   //php의 핀위치를 가져옴

 var myLatlng = new google.maps.LatLng(35.897354, 128.626733);

//var hole1PinRight = new google.maps.LatLng(35.895805, 128.621952);
  map = new google.maps.Map(document.getElementById('map-canvas'), {


    zoom: 19,

    center: new google.maps.LatLng(35.895961, 128.622230),

    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  var updateDiv = document.getElementById('updateDiv');

  //TOP_RIGHT와 같은 위치로 지도상 어느부분에 위치하게되는지 결정된다 (googleMap ControlPosition or save-widget 참조)
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(updateDiv);

  // Append a Save Control to the existing save-widget div.
    var updateWidget = new google.maps.SaveWidget(updateDiv);

  function setPinMarker(holenum , lat , lng){

    var pin = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        animation: google.maps.Animation.DROP,
        map: map,
        icon: flagIcon,
        title: holenum

    });
    pin.addListener('click', function(event) {
      pinNum = holenum;
    });
      var a =0;
      pin.addListener('click', function() {

          if(a%2==0){
          $('.Update').show();
          }else{
          $('.Update').hide();
          }
        a++;
      });
  }






  function setMarker(data) {
      //eval('var ' + data.id + ';');
      if(data.state == "wait"){
        icon = yellowIcon;
      }else{
        icon = blueIcon;
      }

      var marker = new google.maps.Marker({

          position: new google.maps.LatLng(data.lat, data.lng) ,
          animation: google.maps.Animation.DROP,
          map: map,
          icon: icon,
          title: data.id

      });
      markers.push(marker);



      attachMessage(marker,data);
      //클릭시 마커위에 텍스트박스(작은것)
      function attachMessage(marker, data) {
        var infowindow = new google.maps.InfoWindow({
          title : data.id,
          content: "캐디이름 : " + data.cname + "<br/>" + "골퍼1 : " + data.gname1
          + "<br/>"+ "골퍼2 : " + data.gname2 + "<br/>" + "골퍼3 : " + data.gname3
          + "<br/>"+ "골퍼4 : " + data.gname4 + "<br/>위치: " + data.loc
          + "<br/>"+ "진행시간 : " + data.h + ":" + data.m + ":" + data.s
        });
        infowindows.push(infowindow);
        marker.addListener('click', function() {
          //function 매개변수에 event를 넣고 setMarker(event.latLng); 를 추가하면 클릭할때마다 마커 추가

          // map.setZoom(18);  //마커클릭시 화면이 커짐
          // map.setCenter(marker.getPosition());
          infowindow.open(marker.get('map'), marker);
        });
  }
} //setMarker 끝
//홀마커를 찍음
function setHoleMarker(holenum , lat , lng, icon){

  var holeMarker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lng),
      animation: google.maps.Animation.DROP,
      map: map,
      icon: icon,
      title: holenum
  });

}
setHoleMarker('1',35.896370, 128.620903, hole1Icon);
setHoleMarker('2',35.895920, 128.621576, hole2Icon);
setHoleMarker('3',35.895260, 128.622782, hole3Icon);

$.ajax({
  url: 'http://gtcsphp.herokuapp.com/php/pinpos.php',
  data:{ },
  dataType: 'jsonp',
  success: function(data){

    if(data.result == "success"){

      //만약 해당 인덱스의 값이 c 이면 깃발 마커를 찍는다
        for(var i =0; i < data.data.length ; i++){

          if(data.data[i].chec == "c"){
          setPinMarker(data.data[i].holenum,data.data[i].lat,data.data[i].lng);
          }


        }

    }
    else{
      window.alert('php안의 코드오류.');

    }
  },
  error: function(){
    window.alert('ajaxFailed 오류.');

  }
});

//1홀
var college1 = [
{lat: 35.895920811717986, lng: 128.6206709589194},
{lat: 35.89592787334217, lng: 128.62063273757985},
{lat: 35.89594389782141, lng: 128.620582446218},
{lat: 35.89596535431829, lng: 128.62055361250918},
{lat: 35.895989798427806, lng: 128.62053550750932},
{lat: 35.89606435295577, lng: 128.6205021475289},
{lat: 35.896141080281765, lng: 128.62048152798172},
{lat: 35.89618100571718, lng: 128.6204805220242},
{lat: 35.89622880736451, lng: 128.62049192128825},
{lat: 35.89639597731044, lng: 128.6205841221572},
{lat: 35.896416483142694, lng: 128.62059988018336},
{lat: 35.89644663085965, lng: 128.6206340785352},
{lat: 35.896470531813485, lng: 128.62066626488354},
{lat: 35.896544542782905, lng: 128.62079786065271},
{lat: 35.89655119700584, lng: 128.62081948591003},
{lat: 35.896559480789925, lng: 128.62084111123147},
{lat: 35.896605788429376, lng: 128.62099952929987},
{lat: 35.896621540997664, lng: 128.6210645732059},
{lat: 35.89663240522449, lng: 128.62111687628294},
{lat: 35.89667477488319, lng: 128.62147595695865},
{lat: 35.89667586115963, lng: 128.62151317267376},
{lat: 35.896671515252, lng: 128.6215607820168},
{lat: 35.896658478477974, lng: 128.6215943097211},
{lat: 35.89663254075589, lng: 128.6216367221873},
{lat: 35.89659139346491, lng: 128.62167913461724},
{lat: 35.89656559152053, lng: 128.62169422202294},
{lat: 35.896544406761, lng: 128.62169690417477},
{lat: 35.89652104916573, lng: 128.6216935513428},
{lat: 35.896495790394155, lng: 128.62167946972272},
{lat: 35.89646740822556, lng: 128.62166035898588},
{lat: 35.89643148915506, lng: 128.62162934595767},
{lat: 35.89641295246505, lng: 128.62159296853406},
{lat: 35.89640643417503, lng: 128.62155675867155},
{lat: 35.89640426140793, lng: 128.62150378502474},
{lat: 35.89643576697824, lng: 128.6213163656921},
{lat: 35.8964368532612, lng: 128.62127780888363},
{lat: 35.89643576687526, lng: 128.62124428123184},
{lat: 35.89641892768244, lng: 128.621177226},
{lat: 35.89640643406678, lng: 128.62114503949522},
{lat: 35.896342336444256, lng: 128.62105920877752},
{lat: 35.89632604041431, lng: 128.62104579773745},
{lat: 35.896073994927306, lng: 128.6208955939893},
{lat: 35.896054982849236, lng: 128.62088553558283},
{lat: 35.8960302671417, lng: 128.62086843645443},
{lat: 35.89601030444983, lng: 128.62085049918005},
{lat: 35.89595968474187, lng: 128.6207883473238},
{lat: 35.89592373147112, lng: 128.6207114433996}
     ];


//2홀
var college2 = [
{lat: 35.89607073580859, lng: 128.62109407781713},
{lat: 35.896087031876405, lng: 128.62110346547774},
{lat: 35.89610169833789, lng: 128.62111486484355},
{lat: 35.89611989560952, lng: 128.62113263448077},
{lat: 35.89616375915928, lng: 128.6211830935606},
{lat: 35.896191122938156, lng: 128.62122508693528},
{lat: 35.89619893145121, lng: 128.62124629320783},
{lat: 35.8962043635883, lng: 128.62126339235851},
{lat: 35.89620653644028, lng: 128.62128803520181},
{lat: 35.896204906842556, lng: 128.62131644987699},
{lat: 35.89617638874762, lng: 128.62145672104896},
{lat: 35.89614026567438, lng: 128.62159833320857},
{lat: 35.8960435756891, lng: 128.62193629161675},
{lat: 35.89600745276707, lng: 128.6220170932188},
{lat: 35.895961552146325, lng: 128.62210862355573},
{lat: 35.895949058453304, lng: 128.62212404626644},
{lat: 35.89593819433264, lng: 128.62213477511477},
{lat: 35.895923935194844, lng: 128.62213921751606},
{lat: 35.89591354641377, lng: 128.62214345036955},
{lat: 35.895900203985775, lng: 128.6221462373469},
{lat: 35.89581841798274, lng: 128.62213829550183},
{lat: 35.89579641818415, lng: 128.62213108706965},
{lat: 35.895783924468965, lng: 128.62212739903202},
{lat: 35.89577088756263, lng: 128.6221213640673},
{lat: 35.89575988763966, lng: 128.62211599950365},
{lat: 35.895746782822286, lng: 128.62210929391676},
{lat: 35.89573371196199, lng: 128.622100576712},
{lat: 35.89562232106601, lng: 128.6219872534964},
{lat: 35.89560846932794, lng: 128.62196646638097},
{lat: 35.895603580463366, lng: 128.62195238480547},
{lat: 35.89560086441038, lng: 128.62193830326828},
{lat: 35.89560032147677, lng: 128.6219201984618},
{lat: 35.895601951206636, lng: 128.62189404697006},
{lat: 35.8957339496567, lng: 128.6214320362178},
{lat: 35.895742640999366, lng: 128.62140923751247},
{lat: 35.895750245922784, lng: 128.62138777981454},
{lat: 35.89575893720745, lng: 128.62137101599183},
{lat: 35.895786640618766, lng: 128.6213213951371},
{lat: 35.895899626896124, lng: 128.6211658269276},
{lat: 35.89591551552772, lng: 128.6211520806694},
{lat: 35.89595252122407, lng: 128.62112609678536},
{lat: 35.89599057938518, lng: 128.6211070698571},
{lat: 35.89604493363205, lng: 128.6210947484351},
{lat: 35.89605824210786, lng: 128.62109273675844}
 ];

//3홀

var college3 = [
  {lat: 35.895572617455564, lng: 128.62218037265256},
  {lat: 35.895587284015114, lng: 128.6221991479399},
  {lat: 35.895603444381464, lng: 128.62223770458115},
  {lat: 35.89561525907994, lng: 128.62230308334392},
  {lat: 35.895616990569636, lng: 128.6223320007964},
  {lat: 35.89561437640324, lng: 128.62237432929533},
  {lat: 35.89560914804047, lng: 128.62244289299474},
  {lat: 35.895590000026246, lng: 128.6225290587155},
  {lat: 35.895535136599285, lng: 128.62270340201508},
  {lat: 35.89550634687318, lng: 128.62279191447783},
  {lat: 35.895474841018554, lng: 128.62288847339903},
  {lat: 35.89542269397738, lng: 128.62300380745387},
  {lat: 35.895370546423216, lng: 128.62313925882768},
  {lat: 35.89534447274753, lng: 128.62317815056542},
  {lat: 35.89533279390863, lng: 128.6232059784361},
  {lat: 35.89526027580377, lng: 128.62328476823416},
  {lat: 35.89518178234514, lng: 128.62337428689307},
  {lat: 35.895121350443375, lng: 128.62341435239},
  {lat: 35.89509133823022, lng: 128.62341954913563},
  {lat: 35.895024523593, lng: 128.6234161963415},
  {lat: 35.8949946471991, lng: 128.62340479692784},
  {lat: 35.894974548524466, lng: 128.62339071540111},
  {lat: 35.894959881949724, lng: 128.6233726105703},
  {lat: 35.894953227709436, lng: 128.6233622169791},
  {lat: 35.894897684489486, lng: 128.62318284426533},
  {lat: 35.8948887215275, lng: 128.62314998730062},
  {lat: 35.8948860055656, lng: 128.62312517723888},
  {lat: 35.89488600556171, lng: 128.62309433202108},
  {lat: 35.89489143757629, lng: 128.62306281633994},
  {lat: 35.89490230155466, lng: 128.62302660739488},
  {lat: 35.8949137087444, lng: 128.62299106859996},
  {lat: 35.8950576587166, lng: 128.62258002044337},
  {lat: 35.89513588019878, lng: 128.62240835997216},
  {lat: 35.89519671924941, lng: 128.62230509517815},
  {lat: 35.895242348533756, lng: 128.6221984775708},
  {lat: 35.89527494088098, lng: 128.62213980434535},
  {lat: 35.89531038494961, lng: 128.6221088333125},
  {lat: 35.895336085333604, lng: 128.62209840831508},
  {lat: 35.895432402692435, lng: 128.62209468883816},
  {lat: 35.89545338390682, lng: 128.62209797873004},
  {lat: 35.895485229330845, lng: 128.62210730357026},
  {lat: 35.89550729704084, lng: 128.6221193106271},
  {lat: 35.89552753137896, lng: 128.62213259590612}
  ];

    var college1 = new google.maps.Polygon({
      paths: college1,
      geodesic: true,
      strokeColor: '#05C664',
      strokeOpacity: 0.8,
      strokeWeight: 3,
      fillColor: '#05C664',
      fillOpacity: 0.35
    });
    var college2 = new google.maps.Polygon({
      paths: college2,
      geodesic: true,
      strokeColor: '#05C664',
      strokeOpacity: 0.8,
      strokeWeight: 3,
      fillColor: '#05C664',
      fillOpacity: 0.35
    });
    var college3 = new google.maps.Polygon({
      paths: college3,
      geodesic: true,
      strokeColor: '#05C664',
      strokeOpacity: 0.8,
      strokeWeight: 3,
      fillColor: '#05C664',
      fillOpacity: 0.35
    });

    college1.setMap(map);
    college2.setMap(map);
    college3.setMap(map);



  socket.on('gps', function (data) { // node서버에서 받아옴
    //마커에대한 정보와 텍스트창의 정보를 변경하기 위함
    //마커의 배열에 1개 이상 들어있다면 아래 코드 실행
    if(markers.length > 0){
      //마커 배열에 data에서 받은 캐디 아이디와 동일한 마커가 있는지 체크
      var exi = false;
      //배열에 같은 케디 아이디가 있다면 인덱스 값을 얻기위한 변수
      var arrayNum;

        /*소켓에서 받은 정보와 이미 마커배열에 저장된 타이틀을 비교하기위함
        만약 마커 배열에 소켓에서 받은 타이틀이 없다면 새로 마커를 찍음*/
        for(var i=0; i < markers.length; i++ ){

          //
          if(data.id == markers[i].title){
            exi = true;
            arrayNum = i;
          }



        }
        if(exi){ //배열안에 같은 캐디의 이름인 마커가 있다면
          // 마커 위치 업데이트
          markers[arrayNum].setPosition( new google.maps.LatLng(data.lat,data.lng));
          var text = "캐디이름 : " + data.cname + "<br/>" + "골퍼1 : " + data.gname1
          + "<br/>"+ "골퍼2 : " + data.gname2 + "<br/>" + "골퍼3 : " + data.gname3
          + "<br/>"+ "골퍼4 : " + data.gname4 + "<br/>위치: " + data.loc
          + "<br/>"+ "진행시간 : " + data.h + ":" + data.m + ":" + data.s;
          //마커 텍스트창 업데이트
          infowindows[arrayNum].setContent(text);
          if(data.state == "wait"){ //대기 상태 체크
            markers[arrayNum].setIcon(yellowIcon); // 대기일경우 노란마커로 변경
          }else if(data.iconColor == "red"){

              markers[arrayNum].setIcon(redIcon);
              markers[arrayNum].setAnimation(google.maps.Animation.BOUNCE);

          }else if(data.iconColor == "blue"){
            markers[arrayNum].setIcon(blueIcon);
            markers[arrayNum].setAnimation(null);
          }
        }else{// 배열에 없는경우 마커를 새로 생성 if(exi) 끝
          setMarker(data);
        }

    }else{
      setMarker(data);
    }

    console.log(data);
  });

  // socket.on('delete', function (deleteId) {
  //
  //
  // });


}; //init 종료

  $(document).ready(function(){
    $('#submit').click(function(){

      var radioVal = $("input:radio[name=radio]:checked").val();

      //클릭한 핀위치 마커에 대한 정보를 불러옴
      //핀 마커에 대한 홀위치를 ajax로 넘겨줌
      $.ajax({
        url: 'http://gtcsphp.herokuapp.com/php/pinUpdate.php',
        data:{
          holeNum : pinNum,
          sequence : radioVal
        },
        dataType: 'jsonp',
        success: function(data){

          if(data.result == "success"){
            window.alert("성공!");
          }
          else{
            window.alert('php안의 코드오류.');

          }
        },
        error: function(){
          window.alert('ajaxFailed 오류.');

        }
      });
      location.reload();
    });
  });

//Load our maps/geolocation functions
function loadAPI() {
  var script = document.createElement("script");
  script.type = "text/javascript";

  //With API Key
  script.src = "https://maps.googleapis.com/maps/api/js?v=3.20&key=AIzaSyDv1IGjg0gCic6Pc974cxQhGNt7PNSgA6I&libraries=places,geometry&callback=initialize";
  document.body.appendChild(script);
}
//Run this file after the document/window is loaded to avoid errors
window.onload = loadAPI;
