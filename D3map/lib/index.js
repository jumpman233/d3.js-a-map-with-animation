//参数定义
var temp =0; //定时器参数
var freshTime = 5000;  //定时器刷新
var attackArray = ['#attackOne','#attackTwo','#attackThree'];
var beAttackedArray = ['#attackedOne','#attackedTwo','#attackedThree'];
var attackCityArray = ['#attackCityOne','#attackCityTwo','#attackCityThree'];
var beAttackedCityArray = ['#attackedCityOne','#attackedCityTwo','#attackedCityThree'];

//定义颜色  攻击点颜色
var attackTop = ['#FA900D','#FAB10A','#FADB0D'];
//被攻击点颜色
var beAttackedTop = ['#1E90FF','#00BFFF','#00F5FF'];


function fadeOutOne(id,value){
    $(id).fadeOut("slow",function(){
        $(id).text(value);
    }).fadeIn("slow");
}

function attack(array11,array12,array21,array22){
    $.getJSON('data/getData.json',function(data){
        if(count){
            var index = 0;
        } else {
            index = 1;
        }
        for(var i = 0; i<array11.length;i++){
            fadeOutOne(array11[i],data.items[index].attack[i].ip);
            fadeOutOne(array21[i],data.items[index].attack[i].name);
        }
        for(var i = 0; i<array21.length;i++){
            fadeOutOne(array12[i],data.items[index].beAttacked[i].ip);
            fadeOutOne(array22[i],data.items[index].beAttacked[i].name);
        }
    }).error(function(a){
        console.log(a);
    });
}

var init = function(){
    //清除定时器的函数
    var clearMapElements;
   //获取数据并体现在地图上
    var getDataAndDraw = function(svg,freshTime){
        $.getJSON('data/getData.json',function(data){
            clearMapElements = drawGraph(svg,data,attackTop,beAttackedTop);
        }).error(function(a){
            console.log(a);
            alert("读取数据出错！");
        });
    }
    //获取
    var svg = d3.select("svg");
    drawMap(svg);

    window.setInterval(function(){
    	 temp++;
        (temp % 1 == 0) &&　attack(attackArray,beAttackedArray,attackCityArray,beAttackedCityArray);

        //demo用执行代码
        count=!count;
        //重新获取数据前清除之前的作图内容
        if(clearMapElements!=null){
            clearMapElements();
        }
        clearMapElements = getDataAndDraw(svg,freshTime);

	 if(temp == 50){
            temp = 0;
        }
    }, freshTime);
}

init();

