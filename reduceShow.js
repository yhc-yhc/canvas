//请根据从163获取的JSON数据绘制最近30个交易日的K线图，数据已处理为包含一组对象的数组：
'use strict';

window.loadStockData = function (r) {
    var
        NUMS = 30,
        data = r.data;
    if (data.length > NUMS) {
        data = data.slice(data.length - NUMS);
    }
    data = data.map(function (x) {
        return {
            date: x[0],
            open: x[1],
            close: x[2],
            high: x[3],
            low: x[4],
            vol: x[5],
            change: x[6]
        };
    });
    window.drawStock(data);
}

window.drawStock = function (data) {
 var
        canvas = document.getElementById('stock-canvas'),
        width = canvas.width,
        height = canvas.height,
        ctx = canvas.getContext('2d');
    console.log(JSON.stringify(data[0])); // {"date":"20150602","open":4844.7,"close":4910.53,"high":4911.57,"low":4797.55,"vol":62374809900,"change":1.69}
    ctx.clearRect(0, 0, width, height);
    ctx.fillText('Test Canvas', 10, 10);

    var x = 10;
    var ps={};
    ps.p1=new Path2D();
    ps.p2=new Path2D();
    
    data.unshift(ps)
    data.reduce(function(a,b){
        console.log(b);
        x = x + 10;
    var y1=100-b.high/100;
    var y2=200-b.high/100;
        ps.p1.arc(x, y1, 2, 0, Math.PI*2, true); 
        ps.p2.arc(x, y2, 2, 0, Math.PI*2, true); 
        ps.p1.lineTo(x, y1);
        ps.p2.lineTo(x, y2);
        return ps;
    });
    
    ctx.strokeStyle = '#00f0ff';
    ctx.stroke(ps.p2);
    ctx.strokeStyle = '#0000ff';
    
    ctx.stroke(ps.p1);
};

// 加载最近30个交易日的K线图数据:
var js = document.createElement('script');
js.src = 'http://img1.money.126.net/data/hs/kline/day/history/2015/0000001.json?callback=loadStockData&t=' + Date.now();
document.getElementsByTagName('head')[0].appendChild(js);
