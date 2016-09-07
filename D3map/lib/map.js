//地图和画布宽高
var viewBoxWidth = 1000;
var viewBoxHeight = 800;
var screenWidth = 1500;
var screenHeight = 800*viewBoxHeight/viewBoxWidth;

//投影函数的定义
var width = screenWidth, height = screenHeight; //svg map大小
var projection = d3.geo.equirectangular();
xy = projection.scale(screenHeight*screenWidth/4000*105/100)
    .translate([screenWidth*35/101, screenHeight*68/101]).center([12, 0]);

//测试用demo参数
var count = true;

//计算两点间距离
var canculateSub = function (coor1, coor2){
    return Math.sqrt(Math.pow(coor1[0]-coor2[0],2)+Math.pow(coor1[1]-coor2[0],2));
}

//返回曲线M Q的三个参数
//曲线使用了贝塞尔二次曲线,中间点是两个点的中点的中垂线上一点,离两点的中点的距离为sub/5
var canculateCurve = function (coor1, coor2) {
    var sub = canculateSub(coor1,coor2);
    var sin = Math.abs(coor2[1]-coor1[1])/sub;
    var cos = Math.abs(coor2[0]-coor1[0])/sub;

    var subX = sub/5*sin;
    var subY = sub/5*cos;
    var midX = (coor1[0]+coor2[0])/2;
    var midY = (coor1[1]+coor2[1])/2;

    var x = subX + midX;
    var y = subY + midY;

    return [
        projection([coor1[0], coor1[1]]),
        projection([x, y]),
        projection([coor2[0], coor2[1]])
    ]
}

//传入地图和两个点的经纬度然后绘制一条曲线,time是画的时间，默认是1
var drawCurve = function (svg, coor1, coor2, time) {

    if (time == null) {
        time = 1;
    }

    var sub = canculateSub(coor1,coor2);

    var curvePoint = canculateCurve(coor1, coor2);
    return svg.append('path')
        .attr({
            class: 'path',
            d: 'M' + curvePoint[0].join(" ") + 'Q' + curvePoint[1].join(" ") + ' ' + curvePoint[2].join(" ")
        })
        .attr("class", "lines")
        .style({
            fill: 'none',
            //stroke: '#F49724',
            stroke: '#5DBA09',
            "stroke-width": 2,
            //动画效果
            animation: "dash " + time.toString() + "s linear forwards",
            "stroke-dasharray": sub*10,
            "stroke-dashoffset": sub*10
        });
}

//开始画水波纹，动画效果是不停的有圆在扩散
var drawWaterTex = function(svg,coorR,name,color,twinkleTime){
//如果后画的覆盖先画的，所以要先画半径大的
//    svg.append("circle")
//        .attr("class", "waterTex")
//        .attr("id", name + "point")
//        .attr("cx", coorR[0])
//        .attr("cy", coorR[1])
//        .attr("r", 8)
//        .attr("fill", '#000')
//        .attr("stroke", color)
//        .transition()
//        .duration(0)
//        .delay(twinkleTime/2)
//        .attr("r",0)
    //svg.append("circle")
    //    .attr("class", "waterTex")
    //    .attr("id", name + "point")
    //    .attr("cx", coorR[0])
    //    .attr("cy", coorR[1])
    //    .attr("r", 6)
    //    .attr("fill", '#000')
    //    .attr("stroke", color)
    //    .transition()
    //    .duration(twinkleTime/2)
    //    .ease("linear")
    //    .attr("r", 8)
    svg.append("circle")
        .attr("class", "waterTex")
        .attr("id", name + "point")
        .attr("cx", coorR[0])
        .attr("cy", coorR[1])
        .attr("r", 4)
        .attr("fill", '#000')
        .attr("stroke", color)
        .transition()
        .duration(twinkleTime)
        .ease("linear")
        .attr("r", 8)
        .transition()
        .duration(0)
        .attr("r",0)
    //svg.append("circle")
    //    .attr("class", "waterTex")
    //    .attr("id", name + "point")
    //    .attr("cx", coorR[0])
    //    .attr("cy", coorR[1])
    //    .attr("r", 4)
    //    .attr("fill", '#000')
    //    .attr("stroke", color)
    //    .transition()
    //    .duration(twinkleTime/2)
    //    .delay(twinkleTime/2)
    //    .ease("linear")
    //    .attr("r", 6)
}

//传入地图和一个点，画水波纹和点
var drawPoint = function (svg, coordinate, name, color, twinkleTime) {
    var coorR = projection(coordinate);

    if (twinkleTime == null) {
        twinkleTime = 1200;
    }

    if (color == null) {
        color = '#00FF00';
    }
//画水波纹
    drawWaterTex(svg,coorR,name,color,twinkleTime);
//画水波纹中间那个不会变的圆
    svg.append("circle")
        .attr("class", "circle")
        .attr("cx", coorR[0])
        .attr("cy", coorR[1])
        .attr("r", 4)
        .attr("fill", color)
}

//画地图
var drawMap = function (svg) {
    d3.json("data/countries.topo.json", function (error, world) {
        svg.attr("width", "100%")
            .attr("height", "100%")
            .attr("preserveAspectRatio", "xMidYMid")
            .attr("viewBox", "0 0 " + viewBoxWidth+" "+viewBoxHeight);

        path = d3.geo.path().projection(xy);
        svg.append("g")
            .selectAll("path")
            .data(topojson.feature(world, world.objects.countries).features)
            .enter()
            .append("path")
            .attr("classes", "country")
            .style("fill", "#000")
            .style("stroke-width", width/3000+"px")
            .style("stroke", "#2F7484")
            .attr("d", path);
    })
}

//添加文字
var drawText = function (svg, coordinate, name) {

    var coorR = projection(coordinate);

    svg.append("text")
        .attr("class", "texts")
        .attr("dx", coorR[0])
        .attr("dy", coorR[1] + 30)
        .text(name)
        .attr("fill", "#ffffff")
        .attr("font-size", "12px")
        .attr("font-family","微软雅黑")
        .attr("font-weight", "normal");
}

//根据得到的画布、数据以及颜色画具体图像
//将返回一个清除所有画的内容（除了地图）的函数
var drawGraph = function (svg, data,attackTopColor,beAttackedTopColor) {
    //测试demo用代码
    if(count) {
        var index = 0;
    }
    else{
        var index = 1;
    }

    var line = function (svg, data) {
        for (var i = 0; i < data.items[index].line.length; i++) {
            drawCurve(svg, data.items[index].line[i].sourceCoord,  data.items[index].line[i].targetCoord);
        }
    }
    var text = function (svg, data) {
        for (var i = 0; i < data.items[index].attack.length; i++) {
            drawText(svg, data.items[index].attack[i].coordinate, data.items[index].attack[i].name);
        }
        for (var i = 0; i < data.items[index].beAttacked.length; i++) {
            drawText(svg, data.items[index].beAttacked[i].coordinate, data.items[index].beAttacked[i].name);
        }
    }
    var point = function (svg, data) {
        for (var i = 0; i < data.items[index].attack.length; i++) {
            drawPoint(svg, data.items[index].attack[i].coordinate, data.items[index].attack[i].name,attackTopColor[i]);
        }
        for (var i = 0; i < data.items[index].beAttacked.length; i++) {
            drawPoint(svg, data.items[index].beAttacked[i].coordinate, data.items[index].beAttacked[i].name,beAttackedTopColor[i]);
        }
    }

    //画文字、线、点
    text(svg, data);
    line(svg, data);
    point(svg, data);

    //水波纹的动画需要通过定时器实现，并且重新载入数据时需要将这个定时器删掉
    var interval = window.setInterval(function () {
        svg.selectAll(".waterTex").remove();
        point(svg, data);
    }, 1300)

    return function () {
        window.clearInterval(interval); //清除定时器
        svg.selectAll('.lines').remove(); //清除线
        svg.selectAll('.circle').remove(); //清除点
        svg.selectAll('.texts').remove(); //清除文字
        svg.selectAll('.waterTex').remove(); //清除水波纹
    };
}