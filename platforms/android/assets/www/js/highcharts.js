       $(document).ready(function(){
       $.ajax({
            url:'https://shielded-fortress-32957.herokuapp.com/php/order_completeR.php',
            data: { },
            dataType: 'jsonp', 
            success: function(data){
        $(function () {
            $('#container').highcharts({
                chart: {
                    type: 'pie',
                    options3d: {
                    enabled: true,
                    alpha: 45
                    }
                },
                title: {
                    text: '품목별 판매통계'
                    },
                subtitle: {
                },
                plotOptions: {
                pie: {
                innerSize: 100,
                depth: 45
                    }
                },
      series: data  
                });   
              });          
            }
        });
    });