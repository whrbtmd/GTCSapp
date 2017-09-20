       $(document).ready(function(){
       $.ajax({
            url:'https://shielded-fortress-32957.herokuapp.com/php/sell_completer.php',
            data: { },
            dataType: 'jsonp', 
            success: function(data){
        $(function () {
    $('#container').highcharts({
        chart: {
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 10,
                beta: 25,
                depth: 70
            }
                },
                title: {
                    text: '주간판매금액'
                    },
                subtitle: {
                },
                       plotOptions: {
            column: {
                depth: 25
            }
        },
        xAxis: {
            categories: Highcharts.getOptions().lang.weekdays
        },
        yAxis: {
            title: {
                text: null
            }
        },
              series:data
              
            });   
        });
                   
            }
        });
    });

