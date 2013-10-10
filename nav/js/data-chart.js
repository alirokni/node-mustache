$(function () {
        $('#container').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Overall PageSpeed Score'
            },
            subtitle: {
                text: 'Source: Google PageSpeed tools'
            },
            xAxis: {
                categories: [
                    '07/30',
                    '09/20'
                              ]
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'PageSpeed (100)'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y}/100</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Rokni.com',
                data: [86, 100]
    
            }, {
                name: 'Rokni.net',
                data: [77, 98]
    
          
    
            }]
        });
    });
    
