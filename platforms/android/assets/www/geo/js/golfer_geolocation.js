
 //구글맵 API를 불러옴
document.write("<script src='https://maps.googleapis.com/maps/api/js?v=3.20&key=AIzaSyDv1IGjg0gCic6Pc974cxQhGNt7PNSgA6I&libraries=places,geometry&callback=initMap'></script>");
 var trackerId = 0;
 // var geocoder = new google.maps.Geocoder() ;
 var theUser = {};
 var map = {};
 //node.js에 소켓을 연결
 var socket = io.connect('https://gtccc.herokuapp.com');  //서버로 연결합니다.
 var cid = sessionStorage["id"];
 var direc = sessionStorage["direction"];
  //마커 및 마커의 텍스트창을 넣기 위한 배열
 var markers = [];
 var infowindows = [];
 var pinMarkers = [];
 //시간을 0으로 초기화
 var h = 0;
 var m = 0;
 var s = 0;
 //각 홀에서 나눈 구역에 진입시 시간을 초기화하기 위한 boolean
 var timeReset1 = true;
 var timeReset2 = true;
 var timeReset3 = true;
  var timeReset4 = true;
  //각 구역당 제한시간
 var limitTime = 30;
 var limitMinute = 1;
 //각 홀에대한 정보및 이전 팀에 대한 id 를 저장
 var holeNum = localStorage["holeNum"];
 var precid = sessionStorage['precid'];
 //마커이미지 파일
 var yellowIcon = 'image/yellowIcon.png';
 var redIcon = 'image/redIcon.png';
 var blueIcon = 'image/blueIcon.png';
 var flagIcon = 'image/flag1flag.png';
 var hole1Icon = 'image/1holeMarker.png';
 var hole2Icon = 'image/2holeMarker.png';
 var hole3Icon = 'image/3holeMarker.png';
  //iconColor를 blue로 초기화
var iconColor = "blue";
//앞팀에 대한 변수초기화
 var preState = "";
 var preHole = 0;
 //볼기능을 만들기 위한 변수 초기화
 var rBall,lBall,tBall;
 //자신의 좌표를 담기위한 변수
  var mylat,mylng;
  //볼 기능에 대한 세로 및 가로 길이(거리를 기준으로 구글맵 좌표상 값차이)
  var topWidth = 0.0003;
  var height = 0.0006;
  var minWidth = 0.0003;
  var maxWidth = 0.0009;


  //영역 인식을 위한 좌표값들
  // // 학교 좌표
  //  var toplat = 35.896712798428645;
  //  var botlat = 35.89651724697725;
  //  var leftlng = 128.62010300159454;
  //  var rightlng = 128.6203283071518;
  //
  //  //1홀에 대한 좌표
  //   var c1toplat = 35.896414;
  //   var c1botlat = 35.985489;
  //   var c1leftlng = 128.620996;
  //   var c1rightlng = 128.621312;
  //
  //  //2홀에 대한 좌표
  //   var c2toplat = 35.896414;
  //   var c2botlat = 35.985489;
  //   var c2leftlng = 128.621312;
  //   var c2rightlng = 128.621622;
  //
  //  //3홀에 대한 좌표
  //   var c3toplat = 35.896414;
  //   var c3botlat = 35.985489;
  //   var c3leftlng = 128.621622;
  //   var c3rightlng = 128.622021;
 var overlay1,overlay2,overlay3;
 //지도 초기화
var initMap = function initMap() {



jQuery().ready(function(){
  var opts = { zoom: 18, mapTypeId: google.maps.MapTypeId.SATELLITE};
  //맵을 가져와 map-canvas에 투척
  map = new google.maps.Map(document.getElementById("map-canvas"), opts);
  //화면 상단에 버튼 박스 띄우기, 시간 표시
 var widgetDiv = document.getElementById('button-widget');
 var emptyDiv = document.getElementById('emptyDiv');// 버튼 공간을 띄우기 위한 빈 div
 var time = document.getElementById('time');
 var result = document.getElementById('result');
 //TOP_RIGHT와 같은 위치로 지도상 어느부분에 위치하게되는지 결정된다 (googleMap ControlPosition or save-widget 참조)
   map.controls[google.maps.ControlPosition.RIGHT_TOP].push(emptyDiv);
   map.controls[google.maps.ControlPosition.TOP_CENTER].push(result);
   map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(widgetDiv);
 // Append a Save Control to the existing save-widget div.
   var saveWidget = new google.maps.SaveWidget(widgetDiv);
   var divEmpty = new google.maps.SaveWidget(emptyDiv);
   var result = new google.maps.SaveWidget(result); 
     
    USGSOverlay.prototype = new google.maps.OverlayView();

  var bounds1 = new google.maps.LatLngBounds(
        new google.maps.LatLng(35.895755, 128.620507),
        new google.maps.LatLng(35.896685, 128.621806)
      );
  var bounds2 = new google.maps.LatLngBounds(
        new google.maps.LatLng(35.895472, 128.620864),
        new google.maps.LatLng(35.896302, 128.622242)
      );
  var bounds3 = new google.maps.LatLngBounds(
        new google.maps.LatLng(35.894951, 128.622057),
        new google.maps.LatLng(35.895595, 128.623529)
      );
    // The photograph is courtesy of the U.S. Geological Survey.
    var srcImage1 = 'image/golfcouse.png';
    var srcImage2 = 'image/golf.png';


    // The custom USGSOverlay object contains the USGS image,
    // the bounds of the image, and a reference to the map.
    overlay1 = new USGSOverlay(bounds1, srcImage1, map);
    overlay2 = new USGSOverlay(bounds2, srcImage2, map);
    overlay3 = new USGSOverlay(bounds3, srcImage2, map);
  // [END region_initialization]

  // [START region_constructor]
  /** @constructor */
  function USGSOverlay(bounds, image, map) {

    // Initialize all properties.
    this.bounds_ = bounds;
    this.image_ = image;
    this.map_ = map;

    // Define a property to hold the image's div. We'll
    // actually create this div upon receipt of the onAdd()
    // method so we'll leave it null for now.
    this.div_ = null;

    // Explicitly call setMap on this overlay.
    this.setMap(map);
  }
  // [END region_constructor]

  // [START region_attachment]
  /**
   * onAdd is called when the map's panes are ready and the overlay has been
   * added to the map.
   */
  USGSOverlay.prototype.onAdd = function() {

    var div = document.createElement('div');
    div.style.borderStyle = 'none';
    div.style.borderWidth = '0px';
    div.style.position = 'absolute';

    // Create the img element and attach it to the div.
    var img = document.createElement('img');
    img.src = this.image_;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.position = 'absolute';
    div.appendChild(img);

    this.div_ = div;

    // Add the element to the "overlayLayer" pane.
    var panes = this.getPanes();
    panes.overlayLayer.appendChild(div);
  };
  // [END region_attachment]

  // [START region_drawing]
  USGSOverlay.prototype.draw = function() {

    // We use the south-west and north-east
    // coordinates of the overlay to peg it to the correct position and size.
    // To do this, we need to retrieve the projection from the overlay.
    var overlayProjection = this.getProjection();

    // Retrieve the south-west and north-east coordinates of this overlay
    // in LatLngs and convert them to pixel coordinates.
    // We'll use these coordinates to resize the div.
    var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
    var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

    // Resize the image's div to fit the indicated dimensions.
    var div = this.div_;
    div.style.left = sw.x + 'px';
    div.style.top = ne.y + 'px';
    div.style.width = (ne.x - sw.x) + 'px';
    div.style.height = (sw.y - ne.y) + 'px';
  };
  // [END region_drawing]
  // //  //클릭했을 때 이벤트
  //  google.maps.event.addListener(map, 'click', function(event) {
  //  placeMarker(event.latLng);
  //  infowindow.setContent("latLng: " + event.latLng); // 인포윈도우 안에 클릭한 곳위 좌표값을 넣는다.
  //  infowindow.setPosition(event.latLng);             // 인포윈도우의 위치를 클릭한 곳으로 변경한다.
  //  });
  //  //클릭 했을때 이벤트 끝
  //   //인포윈도우의 생성
  //   var infowindow = new google.maps.InfoWindow(
  //   { content: '<br><b>원하는 위치을 클릭</b>하면 좌표값생성<br> <b>복사하여 좌료값 입력</b>하십시요',
  //   size: new google.maps.Size(50,50),
  //
  //   });
  //   infowindow.open(map);
  //
  //   // 마커 생성 합수
  //   function placeMarker(location)
  //   {
  //   var clickedLocation = new google.maps.LatLng(location);
  //   var marker = new google.maps.Marker({       position: location,        map: map   });
  //   map.setCenter(location);
  //   }

    //gps를 사용
     if (navigator.geolocation) {
         var gps = navigator.geolocation;
         //첫 좌표를 얻어옴
         gps.getCurrentPosition(function (pos) {

             var latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude); //좌표값 위도, 경도


                //1홀
               var college1 = [
            {lat: 35.89572525865906, lng: 128.6206179857254}, // bottom
            {lat: 35.896029452640285, lng: 128.62033903598785}, //left
            {lat: 35.896429248666514, lng: 128.6206179857254},
            {lat: 35.89659872680737, lng: 128.62104713916779},
            {lat: 35.896648701061686, lng: 128.62154334783554}, // top
            {lat: 35.89652050617206, lng: 128.62170696258545},  //right
            {lat: 35.896390138274775, lng: 128.62157553434372},
            {lat: 35.89641186627258, lng: 128.62125903367996},
            {lat: 35.89638796547467, lng: 128.6211195588112},
            {lat: 35.89630322622399, lng: 128.62102836370468},
            {lat: 35.89605118073707, lng: 128.62087815999985}
                     ];


            //2홀
           var college2 = [
             {lat: 35.896055526355724, lng: 128.621084690094}, //left
             {lat: 35.89619241322083, lng: 128.62125366926193}, //top
             {lat: 35.89612505622155, lng: 128.6215889453888},
             {lat: 35.896029452640285, lng: 128.62193495035172},
             {lat: 35.89592298487981, lng: 128.62212538719177},
             {lat: 35.895755678109765, lng: 128.6221119761467},//right
             {lat: 35.89558402534185, lng: 128.6219322681427}, //bottom
             {lat: 35.8957187402038, lng: 128.62142264842987},
             {lat: 35.8958860470519, lng: 128.62116247415543}
                 ];

             //3홀

            var college3 = [
              {lat: 35.896046835118185, lng: 128.6224204301834}, //left top
              {lat: 35.89602510702021, lng: 128.62268328666687},
              {lat: 35.89583172668546, lng: 128.62304538488388},
              {lat: 35.89558185251963, lng: 128.62328946590424},
              {lat: 35.8954210635089, lng: 128.62341821193695},
              {lat: 35.895251582846804, lng: 128.6234986782074}, // right
              {lat: 35.89517770654719, lng: 128.62321436405182},// bottom
              {lat: 35.89553622323895, lng: 128.6227583885193},
              {lat: 35.89575350529226, lng: 128.62246602773666}
                  ];

              //구역에 색을 칠함

              var college1 = new google.maps.Polygon({
                paths: college1, // 위에서 만든 좌표배열을 넣는다
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

              //위에서 만든 객체를 맵에 뿌림

//              college1.setMap(map);
//              college2.setMap(map);
//              college3.setMap(map);


        //       //베지어
        //       google.maps.event.addDomListener(window, 'load', initMap);
         //
        //       var GmapsCubicBezier = function(lat1, long1, lat2, long2, lat3, long3, lat4, long4, resolution, map) {
         //
        //         var points = [];
         //
        //         for (it = 0; it <= 1; it += resolution) {
        //           points.push(this.getBezier({
        //             x: lat1,
        //             y: long1
        //           }, {
        //             x: lat2,
        //             y: long2
        //           }, {
        //             x: lat3,
        //             y: long3
        //           }, {
        //             x: lat4,
        //             y: long4
        //           }, it));
        //         }
         //
        //         for (var i = 0; i < points.length - 1; i++) {
        //           var Line = new google.maps.Polygon({
        //             path: [new google.maps.LatLng(points[i].x, points[i].y), new google.maps.LatLng(points[i + 1].x, points[i + 1].y, false)],
        //               geodesic: true,
        //               strokeColor: 'black', // 선 색깔
        //               strokeOpacity: 0.8, //선 투명도
        //               strokeWeight: 3, // 선 굵기
        //               fillColor: 'red', // 채워지는 색깔
        //               fillOpacity: 0.35 // 채워지는 투명도
        //             //  icons: [{
        //             //     icon: {
        //             //         path: 'M 0,-2 0,2',
        //             //         strokeColor: 'violet',
        //             //         strokeOpacity: 1,
        //             //         strokeWeight: 4
        //             //     },
        //             //     repeat: '36px'
        //             // }, {
        //             //     icon: {
        //             //         path: 'M -1,-2 -1,2',
        //             //         strokeColor: 'black',
        //             //         strokeOpacity: 1,
        //             //         strokeWeight: 2
        //             //     },
        //             //     repeat: '36px'
        //             // }]
        //           });
        //           Line.setMap(map);
        //         }
        //         // connect end of line to first point
        //         var Line = new google.maps.Polygon({
        //             path: [new google.maps.LatLng(lat1,long1),new google.maps.LatLng(points[points.length-1].x, points[points.length-1].y)],
        //               geodesic: true,
        //               strokeColor: 'black', // 선 색깔
        //               strokeOpacity: 0.8, //선 투명도
        //               strokeWeight: 3, // 선 굵기
        //               fillColor: 'red', // 채워지는 색깔
        //               fillOpacity: 0.35 // 채워지는 투명도
        //             //  icons: [{
        //             //     icon: {
        //             //         path: 'M 0,-2 0,2',
        //             //         strokeColor: 'violet',
        //             //         strokeOpacity: 1,
        //             //         strokeWeight: 4
        //             //     },
        //             //     repeat: '36px'
        //             // }, {
        //             //     icon: {
        //             //         path: 'M -1,-2 -1,2',
        //             //         strokeColor: 'black',
        //             //         strokeOpacity: 1,
        //             //         strokeWeight: 2
        //             //     },
        //             //     repeat: '36px'
        //             // }]
        //           });
        //           Line.setMap(map);
         //
        //         return Line;
        //       };
         //
         //
        //       GmapsCubicBezier.prototype = {
         //
        //         B1: function(t) {
        //           return t * t * t;
        //         },
        //         B2: function(t) {
        //           return 3 * t * t * (1 - t);
        //         },
        //         B3: function(t) {
        //           return 3 * t * (1 - t) * (1 - t);
        //         },
        //         B4: function(t) {
        //           return (1 - t) * (1 - t) * (1 - t);
        //         },
        //         getBezier: function(C1, C2, C3, C4, percent) {
        //           var pos = {};
        //           pos.x = C1.x * this.B1(percent) + C2.x * this.B2(percent) + C3.x * this.B3(percent) + C4.x * this.B4(percent);
        //           pos.y = C1.y * this.B1(percent) + C2.y * this.B2(percent) + C3.y * this.B3(percent) + C4.y * this.B4(percent);
        //           return pos;
        //         }
        //       };
        //       //1홀
        //       // 35.89572525865906, 128.6206179857254) bottom
        //       // 35.896029452640285, 128.62033903598785) left
        //       // (35.896429248666514, 128.6206179857254)
        //       // ()
        //       // () top
        //       // () right
        //       // )
        //       // ()
        //       // ()
        //       //  ()
        //       // ()
        //  //
        //  var curvedLine = new GmapsCubicBezier(
        //    35.89572525865906, 128.6206179857254,
        //    35.896029452640285, 128.62033903598785,
        //    35.896429248666514, 128.6206179857254,
        //    35.89659872680737, 128.62104713916779,
        //    0.01, map);
        //    var curvedLine = new GmapsCubicBezier(
        //      35.89659872680737, 128.62104713916779,
        //      35.896648701061686, 128.62154334783554,
        //      35.89652050617206, 128.62170696258545,
        //      35.896390138274775, 128.62157553434372,
        //      0.01, map);
        //      var curvedLine = new GmapsCubicBezier(
        //        35.896390138274775, 128.62157553434372,
        //        35.89641186627258, 128.62125903367996,
        //       35.89638796547467, 128.6211195588112,
        //        35.89630322622399, 128.62102836370468,
        //        0.01, map);
        //        var curvedLine = new GmapsCubicBezier(
        //          35.89630322622399, 128.62102836370468,
        //         35.89605118073707, 128.62087815999985,
        //         35.89572525865906, 128.6206179857254,
        //         35.896029452640285, 128.62033903598785,
        //          0.01, map);

         //
        //   //2홀
        //  var college2 = [
        //    {lat: 35.896055526355724, lng: 128.621084690094}, //left
        //    {lat: 35.89619241322083, lng: 128.62125366926193}, //top
        //    {lat: 35.89612505622155, lng: 128.6215889453888},
        //    {lat: 35.896029452640285, lng: 128.62193495035172},
        //    {lat: 35.89592298487981, lng: 128.62212538719177},
        //    {lat: 35.895755678109765, lng: 128.6221119761467},//right
        //    {lat: 35.89558402534185, lng: 128.6219322681427}, //bottom
        //    {lat: 35.8957187402038, lng: 128.62142264842987},
        //    {lat: 35.8958860470519, lng: 128.62116247415543}
        //        ];
         //
        //    //3홀
         //
        //   var college3 = [
        //     {lat: 35.896046835118185, lng: 128.6224204301834}, //left top
        //     {lat: 35.89602510702021, lng: 128.62268328666687},
        //     {lat: 35.89583172668546, lng: 128.62304538488388},
        //     {lat: 35.89558185251963, lng: 128.62328946590424},
        //     {lat: 35.8954210635089, lng: 128.62341821193695},
        //     {lat: 35.895251582846804, lng: 128.6234986782074}, // right
        //     {lat: 35.89517770654719, lng: 128.62321436405182},// bottom
        //     {lat: 35.89553622323895, lng: 128.6227583885193},
        //     {lat: 35.89575350529226, lng: 128.62246602773666}
        //         ];

});
         var markerCount = 0;
         //주기적으로 좌표값을 얻어옴 매개변수 pos에 좌표값이 저장
         trackerId = gps.watchPosition(function (pos) {

             var loc = "";
             //35.896985, 128.620778(pos.coords.latitude, pos.coords.longitude)
             mylat = pos.coords.latitude;
             mylng = pos.coords.longitude;

            var latLng = new google.maps.LatLng(35.896096, 128.621309);

            //홀의 방향에 근거하여 볼버튼을 누를시 어느 좌표로 볼 구역을 줄것인가
            //direc 은 동서남북으로 되어있으며 각 홀에 대한 방향이 sessionStorage에 저장되어
            //어느홀에 위치해 있는지에 따라 direc값이 변경 그에따라 볼버튼을 누를시 좌표값이 전송
             if(direc == 'N'){
               //nlat,nlng 는 기준점이 되는 좌표 mlat,mlng는 기준점좌표에서 대각선방향에 있는 꼭지점 좌표값
               //0.0006 차이는 50m 가량
               rBall = {
                 nlat : mylat,
                 nlng : mylng + minWidth,
                 mlat : mylat + height,
                 mlng : mylng + maxWidth,
                 way  : holeNum
                        };
              lBall = {
                  nlat : mylat,
                  nlng : mylng - maxWidth,
                  mlat : mylat + height,
                  mlng : mylng - minWidth,
                  way  : holeNum
                     };
              tBall = {
                  nlat : mylat,
                  nlng : mylng - topWidth,
                  mlat : mylat + height,
                  mlng : mylng + topWidth,
                  way  : holeNum
                      };
            }else if(direc == 'S'){
              rBall = {
                nlat : mylat - height,
                nlng : mylng - maxWidth,
                mlat : mylat,
                mlng : mylng - minWidth,
                way  : holeNum
                       };
             lBall = {
                 nlat : mylat - height,
                 nlng : mylng + minWidth,
                 mlat : mylat,
                 mlng : mylng + maxWidth,
                 way  : holeNum
                    };
            tBall = {
                nlat : mylat - height,
                nlng : mylng - topWidth,
                mlat : mylat,
                mlng : mylng + topWidth,
                way  : holeNum
                    };
            }else if(direc == 'E'){
              rBall = {
                nlat : mylat - maxWidth,
                nlng : mylng,
                mlat : mylat - minWidth,
                mlng : mylng + height,
                way  : holeNum
                       };
             lBall = {
                 nlat : mylat + minWidth,
                 nlng : mylng,
                 mlat : mylat + maxWidth,
                 mlng : mylng + height,
                 way  : holeNum
                    };
              tBall = {
                  nlat : mylat - topWidth,
                  nlng : mylng,
                  mlat : mylat + topWidth,
                  mlng : mylng + height,
                  way  : holeNum
                      };
            }else if(direc == 'W'){
              rBall = {
                nlat : mylat + minWidth,
                nlng : mylng - height,
                mlat : mylat + maxWidth,
                mlng : mylng,
                way  : holeNum
                       };
             lBall = {
                 nlat : mylat - maxWidth,
                 nlng : mylng - height,
                 mlat : mylat - minWidth,
                 mlng : mylng,
                 way  : holeNum
                    };
              tBall = {
                  nlat : mylat - topWidth,
                  nlng : mylng - height,
                  mlat : mylat + topWidth,
                  mlng : mylng,
                  way  : holeNum
                      };
            }


              //소켓으로 전송하기 위해 loc 변수에 위치값을 저장후 전송
              //각 구역의 좌표값을 측정후 loc값을 변경
              //1홀
              //1-1
              var c1toplat = 35.896648;
              var c1botlat = 35.896246;
              var c1leftlng = 128.620481;
              var c1rightlng = 128.621733;
             //1-2
             var c12toplat = 35.896246;
             var c12botlat = 35.895725;
             var c12leftlng = 128.620339;
             var c12rightlng = 128.621031;

             //2홀에 대한 좌표
              var c2toplat = 35.896192;
              var c2botlat = 35.895584;
              var c2leftlng = 128.621084;
              var c2rightlng = 128.622111;

             //3홀에 대한 좌표
              var c3toplat = 35.895595;
              var c3botlat = 35.894951;
              var c3leftlng = 128.622057;
              var c3rightlng = 128.623529;

              //현재 어느 구역에 있는지 알기 위함
              //위에서 지정한 좌표에 나의 좌표가 들어가있다면 loc 값이 변경
             if(pos.coords.latitude > c1botlat && pos.coords.latitude < c1toplat && pos.coords.longitude < c1rightlng && pos.coords.longitude > c1leftlng ){
                loc="1홀";


            }else if(pos.coords.latitude > c12botlat && pos.coords.latitude < c12toplat && pos.coords.longitude < c12rightlng && pos.coords.longitude > c12leftlng ){
               loc="1홀";


           }else if(pos.coords.latitude > c2botlat && pos.coords.latitude < c2toplat && pos.coords.longitude < c2rightlng && pos.coords.longitude > c2leftlng ){
               loc="2홀";

                // //한 홀의 각 구역에 진입시 시간이 초기화 됨
                //  if(timeReset1){
                //    //처음 초기화한 timeReset이라는 변수에 true를 주고 시간이 초기화 되면 false로 변경하여 다시 되돌아가더라도 시간이 초기화 하지않도록함
                //    timeReset();
                //    timeReset1 = false;
                //  }

            }else if(pos.coords.latitude > c3botlat && pos.coords.latitude < c3toplat && pos.coords.longitude < c3rightlng && pos.coords.longitude > c3leftlng ){
               loc="3홀";


             }

             else{
               loc="홀 외";

             }
  var playAlert = setInterval(function() {
             if(pos.coords.latitude > c1botlat && pos.coords.latitude < c1toplat && pos.coords.longitude < c1rightlng && pos.coords.longitude > c1leftlng ){
        var p1 = new google.maps.LatLng(mylat,mylng);
        var p2 = pinMarkers[0].position;

            var result =calcDistance(p1, p2);
            $(document).ready(function(){
                $('#result').empty();
                $('#result').append(result + " M");
                });
            function calcDistance(p1, p2) {
                return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2)).toFixed(2);
                    }

            }else if(pos.coords.latitude > c12botlat && pos.coords.latitude < c12toplat && pos.coords.longitude < c12rightlng && pos.coords.longitude > c12leftlng ){
        var p1 = new google.maps.LatLng(mylat,mylng);
        var p2 = pinMarkers[0].position;

            var result =calcDistance(p1, p2);
            $(document).ready(function(){
                $('#result').empty();
                $('#result').append(result + " M");
                });
            function calcDistance(p1, p2) {
                return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2)).toFixed(2);
                    }

           }else if(pos.coords.latitude > c2botlat && pos.coords.latitude < c2toplat && pos.coords.longitude < c2rightlng && pos.coords.longitude > c2leftlng ){
        var p1 = new google.maps.LatLng(mylat,mylng);
        var p2 = pinMarkers[1].position;

            var result =calcDistance(p1, p2);
            $(document).ready(function(){
                $('#result').empty();
                $('#result').append(result + " M");
                });
            function calcDistance(p1, p2) {
                return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2)).toFixed(2);
                    }

            }else if(pos.coords.latitude > c3botlat && pos.coords.latitude < c3toplat && pos.coords.longitude < c3rightlng && pos.coords.longitude > c3leftlng ){
        var p1 = new google.maps.LatLng(mylat,mylng);
        var p2 = pinMarkers[2].position;

            var result =calcDistance(p1, p2);
            $(document).ready(function(){
                $('#result').empty();
                $('#result').append(result + " M");
                });
            function calcDistance(p1, p2) {
                return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2)).toFixed(2);
                    }

             }else{
                         var p1 = new google.maps.LatLng(mylat,mylng);
        var p2 = pinMarkers[2].position;
                  var result =calcDistance(p1, p2);
                 //나중에 핀위치 아닌 조건 넣을때 여기 수정
            $(document).ready(function(){
                
                $('#result').empty();
                $('#result').append(result + " M");
                });
                function calcDistance(p1, p2) {
                return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2)).toFixed(0);
                    }
             }
}, 3000);

      function calcDistance(p1, p2) {
          return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2)).toFixed(2);
      }
             //마커가 1개 이상이라면
             //자신을 기준으로 바로 앞팀과 비교, 앞팀이 빨간색이라면 자신은 파란색으로 표시
             //앞팀이 빨간색이 아니고 내가 시간을 초과했다면 나를 빨간색으로 표시
             if(markerCount==1){
                 iconColor = "blue";
                 markers[0].setIcon(blueIcon);
                 markers[0].setAnimation(null);
             }
             //객체형태로 데이터들을 저장
             var info = {
               id : sessionStorage["id"],
               cname : sessionStorage["cname"],
               gname1 : sessionStorage["gname1"],
               gname2 : sessionStorage["gname2"],
               gname3 : sessionStorage["gname3"],
               gname4 : sessionStorage["gname4"],
               sessionno : sessionStorage["userno"],
               lat : mylat,
               lng : mylng,
               h : h,
               m : m,
               s : s,
               state : "null",
               loc: loc,
               holeNum : holeNum,
               iconColor : iconColor
             };
           
             /*저장된 마커가 없으면 마커객체를 새로 만듦
             계속 중복해서 마커를 찍지 않도록 하기 위함*/
             if(markerCount == 0){
             setMarker(info);
             markerCount=1;
              }
            /*
            아래 코드들은 각 캐디 본인의 마커에대한 정보를 변경하기 위함
            마커배열안의 마커들의 타이틀을 비교후 정보를 변경
            위에서 설정한 영역인식 좌표들을 gps에서 받은 좌표와 비교후
            영역안에 gps에서 받은 좌표가 있으면 위치텍스트를 변경
            */
            for(var i=0; i < markers.length; i++ ){
              if(info.id == markers[i].title){
                // 마커 위치 업데이트
                markers[i].setPosition( new google.maps.LatLng(info.lat,info.lng));
                var text = "캐디이름 : " + info.cname + "<br/>" + "골퍼1 : " + info.gname1
                + "<br/>"+ "골퍼2 : " + info.gname2 + "<br/>" + "골퍼3 : " + info.gname3
                + "<br/>"+ "골퍼4 : " + info.gname4 + "<br/>위치: " + info.loc
                + "<br/>"+ "진행시간 : " + info.h + ":" + info.m + ":" + info.s;
        infowindows[i].setContent(text);

                  }
                }

              //각 폰의 info 객체를 socket으로 정송
             socket.emit('my other event', info);   //서버에 my other event 이벤트를 보냅니다.

             //화면의 위치를 좌표의 중심을 변경
             map.setCenter(latLng);
             //theUser.setPosition(latLng);
             //showLocation(pos);

        //좌표를 몇초마다 한번씩 받을것인가  1000 = 1 second
         },onError,{ maximumAge:0 , timeout : 10000, enableHighAccuracy:true});

        function onError(error){

        }

}
//홀마커를 찍음
function setHoleMarker(holenum , lat , lng, icon){

  var holeMarker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lng) ,
      animation: google.maps.Animation.DROP,
      map: map,
      icon: icon,
      title: holenum
  });

}
setHoleMarker(1,35.896370,128.620903, hole1Icon);
setHoleMarker(2,35.895920, 128.621576, hole2Icon);
setHoleMarker(3,35.895309, 128.622742, hole3Icon);
});

//핀마커를 찍음
function setPinMarker(holenum , lat , lng){

  var pin = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lng) ,
      animation: google.maps.Animation.DROP,
      map: map,
      icon: flagIcon,
      title: holenum

  });
pinMarkers.push(pin);
}

//DB에 있는 핀위치에 대한 좌표를 불러옴
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
    }
  },
  error: function(){

  }
});
//마커를 찍기위한 함수(매개변수 : node.js에서 받은 data객체)
function setMarker(data) {
      if(data.state == "wait"){
        icon = yellowIcon;
      }else{
        icon = blueIcon;
      }
    //eval('var ' + data.id + ';');
    var marker = new google.maps.Marker({
        //마커의 위치
        position: new google.maps.LatLng(data.lat, data.lng) ,
        //마커 애니메이션
        animation: google.maps.Animation.DROP,
        //마커를 부여할 맵
        map: map,
        //마커의 기본 이미지
        icon: blueIcon,
        //마커의 이름
        title: data.id
    });

    //마커를 마커배열에 저장
    markers.push(marker);

    //메시지를 추가하기위한 함수 호출(매개변수 : 마커 , node.js에서 받은 data객체)
    attachMessage(marker,data);
    //클릭시 마커위에 텍스트박스(작은것)
    function attachMessage(marker, data) {
      //마커를 클릭시 텍스트 창을 띄우기 위함
      var infowindow = new google.maps.InfoWindow({
        //이름은 캐디 아이디
        title : data.id,
        //data객체로 받은 정보들을 content에 저장
        content: "캐디이름 : " + data.cname + "<br/>" + "골퍼1 : " + data.gname1
        + "<br/>"+ "골퍼2 : " + data.gname2 + "<br/>" + "골퍼3 : " + data.gname3
        + "<br/>"+ "골퍼4 : " + data.gname4 + "<br/>위치: " + data.loc
        + "<br/>"+ "진행시간 : " + data.h + ":" + data.m + ":" + data.s
      });
      /*텍스트창을 배열에 저장
      후에 타이틀을 비교후 정보를 변경하기 위함*/
         infowindows.push(infowindow);
      //마커에 클릭이벤트를 추가, 클릭시 텍스트창이 뜸
      marker.addListener('click', function() {
        //function 매개변수에 event를 넣고 setMarker(event.latLng); 를 추가하면 클릭할때마다 마커 추가

        // map.setZoom(18);  //마커클릭시 화면이 커짐
        // map.setCenter(marker.getPosition());
        infowindow.open(marker.get('map'), marker);
      });
}
} //setMarker 끝

//node.js에서 socket으로 다른 캐디들의 정보를 받아옴
socket.on('gps', function (data) {


  //마커에대한 정보와 텍스트창의 정보를 변경하기 위함
  //마커의 배열에 1개 이상 들어있다면 아래 코드 실행
  if(markers.length > 0){
    //마커 배열에 data에서 받은 캐디 아이디와 동일한 마커가 있는지 체크
    var exi = false;
    //배열에 같은 케디 아이디가 있다면 인덱스 값을 얻기위한 변수
    var arrayNum=0;

      /*소켓에서 받은 정보와 이미 마커배열에 저장된 타이틀을 비교하기위함
      만약 마커 배열에 소켓에서 받은 타이틀이 없다면 새로 마커를 찍음*/
      for(var i=0; i < markers.length; i++ ){

        if(data.id == markers[i].title){

          exi = true;
          arrayNum = i;
        }
      }

      if(exi){ //배열안에 같은 캐디의 이름인 마커가 있다면
        // 마커 위치 업데이트
        markers[arrayNum].setPosition( new google.maps.LatLng(data.lat,data.lng));
        var text = "<div id='user_infor'>"
        + "<button id='call' value='"+data.sessionno+"' style='background:none;float:right'><img src='image/call.png' style='width:30px;height:30px;float:right'></button>"
        + "<button id='chatbtnclick2' ; value='" + data.cname + "' style='background:none;float:left'><img src='image/chat.png' style='width:30px;height:30px;float:right'></button>"   
        + "<br/><hr style='margin-bottom:8px;margin-top:15px;'>"+ "캐디이름 : " + data.cname
        + "<br/>"+ "골퍼1 : " + data.gname1
        + "<br/>"+ "골퍼2 : " + data.gname2 + "<br/>" + "골퍼3 : " + data.gname3
        + "<br/>"+ "골퍼4 : " + data.gname4 + "<br/>위치: " + data.loc
        + "<br/>"+ "진행시간 : " + data.h + ":" + data.m + ":" + data.s +"</div>"

/*        +       "<div id='chat'; style='display:none'>"
        +       "<div id='header' class='ui-widget' style='overflow:hidden;'>"
        +       "<div class='ui-state-highlight ui-corner-all'; style='margin-top: 20px; padding: 0 .7em;'>"
        + 		"<p><span class='ui-icon ui-icon-info' style='float: left; margin-right: .3em;'></span></div></div>"
        + "<div id='box'>"
	    + "<div id='scrolldiv' style='float:left;width:80%;height:250px; margin-top:20px; overflow: auto;'>"
		+ "<div id='conversation'></div></div>"
		+ "<input id='data' style='width:80%; overflow:hidden;'><br>"
		+ "<input type='button' id='datasend' value='send'>"
        + "<input type='button' class='roomexit' value='exit'></div></div>"*/
        //마커 텍스트창 업데이트

        infowindows[arrayNum].setContent(text);

   
         //채팅
          

      //이까지
            if(data.state == "wait"){ //대기 상태 체크
              markers[arrayNum].setIcon(yellowIcon); // 대기일경우 노란마커로 변경
              markers[arrayNum].setAnimation(null);
            }else if(data.iconColor == "red"){ // 받은 캐디의 상태가 red인가
              if(data.id == precid){ //받은 캐디의 정보가 순서상 내 앞팀인가
                preHole = data.holeNum;
                preState = data.iconColor;
                if(data.holeNum == holeNum){ //내 앞팀이 나와 같은홀 인가
                markers[arrayNum].setIcon(redIcon);
                markers[arrayNum].setAnimation(google.maps.Animation.BOUNCE); // 애니메이션을 부여
                }else{
                  markers[arrayNum].setIcon(blueIcon);
                  markers[arrayNum].setAnimation(null);
                }
              }else{
                markers[arrayNum].setIcon(redIcon);
                markers[arrayNum].setAnimation(google.maps.Animation.BOUNCE);
              }
            }else if(data.iconColor == "blue"){ //받은 캐디의 상태가 파란색인가
              markers[arrayNum].setIcon(blueIcon);
              markers[arrayNum].setAnimation(null);
            }
      }else{// 배열에 없는경우 마커를 새로 생성 if(exi) 끝
        setMarker(data);
      }

  }

});
//마커 삭제
socket.on('delete', function (deleteId) {
  if(deleteId == precid){
    preState = "blue";
  }
});

//서버에서 볼이라는 소켓을 받으면
socket.on('Ball', function (data) {

  // //자신의 좌표를 기준으로 꼭지점 좌표를 선언
  //leftBottom
  var lbLat = mylat - 0.0002 ;
  var lbLng = mylng - 0.0002 ;
  //leftTop
  var ltLat = mylat + 0.0002 ;
  var ltLng = mylng - 0.0002 ;
  //rightTop
  var rtLat = mylat + 0.0002 ;
  var rtLng = mylng + 0.0002 ;
  //rightBottom
  var rbLat = mylat - 0.0002 ;
  var rbLng = mylng + 0.0002 ;
  //
  // var draw = [
  //   {lat: lbLat, lng: lbLng}, // b,l
  //   {lat: ltLat, lng: ltLng}, // t,l
  //   {lat: rtLat, lng: rtLng}, // t,r
  //   {lat: rbLat, lng: rbLng} // b,r
  //       ];
  // var poly1 = new google.maps.Polygon({
  //   paths: draw, // 위에서 만든 좌표배열을 넣는다
  //   geodesic: true,
  //   strokeColor: '#05C664',
  //   strokeOpacity: 0.8,
  //   strokeWeight: 3,
  //   fillColor: 'red',
  //   fillOpacity: 0.35
  // });
  // poly1.setMap(map);
  //
  // var rBallDraw = [
  //   {lat: data.nlat, lng: data.nlng}, // b,l
  //   {lat: data.mlat, lng: data.nlng}, // t,l
  //   {lat: data.mlat, lng: data.mlng}, // t,r
  //   {lat: data.nlat, lng: data.mlng} // b,r
  //       ];
  // var rBallPolygon = new google.maps.Polygon({
  //   paths: rBallDraw, // 위에서 만든 좌표배열을 넣는다
  //   geodesic: true,
  //   strokeColor: '#05C664',
  //   strokeOpacity: 0.8,
  //   strokeWeight: 3,
  //   fillColor: '#05C664',
  //   fillOpacity: 0.35
  // });
  // rBallPolygon.setMap(map);

  var audioImage = function(){

    //   var player = new Audio('');
    //
    //   function play(url){
    //       if(player.paused || url != player.src){
    //           if(player.canPlayType('audio/mp3')){
    //               player.src = url;
    //           }
    //           player.play();
    //       } else {
    //           player.pause();
    //           // 오디오의 재생 위치를 처음으로 되돌리는 아래 줄을 지우면 일시정지(pause)가 됩니다.
    //       }
    //   }
    //
    //
    // play('warning sound.mp3');
    // function playAudio(url) {
    //     alert("오디오 진입");
    //     // Play the audio file at url
    //     var my_media = new Media(url,
    //         // success callback
    //         function () {
    //             alert("playAudio():Audio Success");
    //         },
    //         // error callback
    //         function (err) {
    //             alert("playAudio():Audio Error: " + err);
    //         }
    //     );
    //     // Play audio
    //     my_media.play();
    // }
    // playAudio('warningsound.mp3');
    var audioElement = document.createElement('audio');
      audioElement.setAttribute('src', 'warningsound.mp3');
      audioElement.play();


    //경고 이미지 나타냄
      var warningCount = 0;

      var warningImage = setInterval(function(){
        $('.imageDiv').empty();
        if(warningCount%2 == 0 || warningCount == 0){
            
      $('<img style="width:80%;height:80%;">').attr({src:'image/warning.gif',class:'warningImage'}).appendTo($('.imageDiv'));
    }else{
      $('.imageDiv').empty();
    }

      warningCount++;
      if(warningCount==8)
      clearInterval(warningImage);
    },1000);

};

    //볼에 대한 정보가 날아올시 자신의 좌표를 기준으로 정사각형을 만들어 각 꼭지점이 해당 구역에 진입하는지 아닌지 체크
    //각 꼭지점이 볼에 대한 구역으로 진입이 경고창이 뜸
    if(lbLat > data.nlat && lbLat < data.mlat && lbLng < data.mlng && lbLng > data.nlng ){
      audioImage();
      //alert(data.way + "홀에서 공이 날라옵니다!!!!!");
    }else if(ltLat > data.nlat && ltLat < data.mlat && ltLng < data.mlng && ltLng > data.nlng ){
      audioImage();
      //alert(data.way + "홀에서 공이 날라옵니다!!!!!");
    }else if(rtLat > data.nlat && rtLat < data.mlat && rtLng < data.mlng && rtLng > data.nlng ){
      audioImage();
      //alert(data.way + "홀에서 공이 날라옵니다!!!!!");
    }else if(rbLat > data.nlat && rbLat < data.mlat && rbLng < data.mlng && rbLng > data.nlng ){
      audioImage();
      //alert(data.way + "홀에서 공이 날라옵니다!!!!!");
    }else if(mylat > data.nlat && mylat < data.mlat && mylng < data.mlng && mylng > data.nlng ){
      audioImage();
      //alert(data.way + "홀에서 공이 날라옵니다!!!!!");
    }


  });
  //시간을 리셋 하기 위한 함수
var timeReset = function(){
  h=0;
  m=0;
  s=0;
}
} //init 종료
$(function(){  //타이머 시계

    var time = setInterval(function(){
      s++;
      if(s == 61){
        m = m+1;
        s = 0;
      }
      if(m == 61){
        h = h+1;
        m=0;
      }

      $("#time").text(h + ":" + m + ":" + s);
    },1000);
  });
$(document).ready(function(){

//각 볼버튼을 클릭시 소켓을 이용 서버로 해당 객체를 전송
$('.ballRight').click(function(){
  var rBallDraw = [
    {lat: rBall.nlat, lng: rBall.nlng}, // b,l
    {lat: rBall.mlat, lng: rBall.nlng}, // t,l
    {lat: rBall.mlat, lng: rBall.mlng}, // t,r
    {lat: rBall.nlat, lng: rBall.mlng} // b,r
        ];
  var rBallPolygon = new google.maps.Polygon({
    paths: rBallDraw, //위에서 만든 좌표배열을 넣는다
    geodesic: true,
    strokeColor: '#05C664',
    strokeOpacity: 0.8,
    strokeWeight: 3,
    fillColor: '#05C664',
    fillOpacity: 0.35
  });
//  rBallPolygon.setMap(map);
  socket.emit('Ball', rBall);

});
$('.ballLeft').click(function(){
  var lBallDraw = [
    {lat: lBall.nlat, lng: lBall.mlng}, // b,l
    {lat: lBall.mlat, lng: lBall.mlng}, // t,l
    {lat: lBall.mlat, lng: lBall.nlng}, // t,r
    {lat: lBall.nlat, lng: lBall.nlng} // b,r
        ];
  var lBallPolygon = new google.maps.Polygon({
    paths: lBallDraw, // 위에서 만든 좌표배열을 넣는다
    geodesic: true,
    strokeColor: '#05C664',
    strokeOpacity: 0.8,
    strokeWeight: 3,
    fillColor: '#05C664',
    fillOpacity: 0.35
  });
//  lBallPolygon.setMap(map);
  socket.emit('Ball', lBall);

});
$('.ballTop').click(function(){
  var tBallDraw = [
    {lat: tBall.nlat, lng: tBall.nlng}, // b,l
    {lat: tBall.mlat, lng: tBall.nlng}, // t,l
    {lat: tBall.mlat, lng: tBall.mlng}, // t,r
    {lat: tBall.nlat, lng: tBall.mlng} // b,r
        ];
  var tBallPolygon = new google.maps.Polygon({
    paths: tBallDraw, // 위에서 만든 좌표배열을 넣는다
    geodesic: true,
    strokeColor: '#05C664',
    strokeOpacity: 0.8,
    strokeWeight: 3,
    fillColor: '#05C664',
    fillOpacity: 0.35
  });
//  tBallPolygon.setMap(map);
  socket.emit('Ball', tBall);

});

//종료버튼 클릭시
  $('.toScorePage').click(function(){

      //해당 홀이 종료 되었다는 정보를 DB에 저장
      $.ajax({
        url: 'https://gtcsphp.herokuapp.com/php/holeHistory.php',
        data:{
          cid : cid,
          holeNum: holeNum
        },
        dataType: 'jsonp',
        success: function(data){
          if(data.result == "success"){
            //window.alert('기록 저장완료.');
          }
          else{
          }

        },
        error:function(){

        }
      });

    //한 홀에서 끝난 시간을 세션스토리지에 저장
    sessionStorage.setItem("hour",h);
    sessionStorage.setItem("minute",m);
    sessionStorage.setItem("second",s);
    location.href = "scoreInput.html";

    //마커를 삭제
    socket.emit('markerDelete', cid);
  });
});


 //트랙킹 중지
 function stopTracking() {
     if (trackerId) {
         navigator.geolocation.clearWatch(trackerId);
     }
     alert("위치 추적 종료!");
 }
