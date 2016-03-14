var projection = ol.proj.get("EPSG:3857");//指定了地图切片使用的坐标系
var resolutions = [];
var draw1=null;//定义全局变量，当绘图方式改变时删除当前的绘制工具 
var draw2=null;
var map = null;
var source = null;
/* 当前绘制的要素*/
var sketch;
/**
* 当前绘制要素的元素
*/
var sketchElement;

window.onload = function () {
    var format = 'image/png';
    var bounds = [73.4510046356223, 18.1632471876417,
        134.976797646506, 53.5319431522236];
    var controls = new Array();
    //比例尺
    var scaleLineControl = new ol.control.ScaleLine({});
    controls.push(scaleLineControl);

    //全图
    var fullScreenControl = new ol.control.FullScreen({});
    controls.push(fullScreenControl);

    //缩放控件
    var zoomSliderControl = new ol.control.ZoomSlider({});
    controls.push(zoomSliderControl);
    for(var i=0; i<19; i++){
        resolutions[i] = Math.pow(2, 18-i);
    }
    var tilegrid  = new ol.tilegrid.TileGrid({
        origin: [0,0],
        resolutions: resolutions
    });//指定了切片使用的网络的模式

    var baidu_source = new ol.source.TileImage({
        projection: projection,
        tileGrid: tilegrid,
        tileUrlFunction: function(tileCoord, pixelRatio, proj){//每次用户与地图交互，比如 缩放、平移等，就会触发会触发回调函数，此函数根据传入的变量参数构造图片切片的 URL 地址。
            if(!tileCoord){
                return "";
            }
            var z = tileCoord[0];//当前缩放级别z
            var x = tileCoord[1];//切片的x索引
            var y = tileCoord[2];//切片的y索引

            if(x<0){
                x = "M"+(-x);
            }
            if(y<0){
                y = "M"+(-y);
            }

            return "http://online3.map.bdimg.com/onlinelabel/?qt=tile&x="+x+"&y="+y+"&z="+z+"&styles=pl&udt=20160222&scaler=1&p=1";
        }
    });

    var baidu_layer = new ol.layer.Tile({
        source: baidu_source
    });
    //create the style
    var iconStyle = new ol.style.Style({
        fill:new ol.style.Fill({
            color:'rgba(255,255,255,0.2)'
        }),
        stroke:new ol.style.Stroke({
            color:'#0c95f8',
            width:2
        }),
        image: new ol.style.Icon( ({
            anchor: [0.5, 46],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            opacity: 0.75,
            src: 'http://openlayers.org/en/v3.9.0/examples/data/icon.png'
        }))
    });

    //临时图层的数据源  
    source=new ol.source.Vector();
    //新建临时图层，并设置临时图层渲染各种要素的样式  
    var vector=new ol.layer.Vector({
        source:source,
        style: iconStyle
    });
    //临时测距图层的数据源
    range_source = new ol.source.Vector();
    //新建临时图层，并设置临时图层渲染各种要素的样式
    var range_vector = new ol.layer.Vector({
        source:range_source,
        style:new ol.style.Style()
    });
    map = new ol.Map({
        controls: ol.control.defaults({
                    attribution: false
                }).extend(controls),
                interactions: ol.interaction.defaults().extend([
                    new ol.interaction.DragRotateAndZoom()
                ]),
        target: 'map',
        layers: [baidu_layer,vector,range_vector],
        view: new ol.View({
            center:  [12959773,4853101],//设置地图中心
            zoom: 5 //初始的缩放等级
        })
    });
    // map.getView().fitExtent(bounds, map.getSize());

};

function setMarkUnFlod(ulname,name,count){
    var links =  document.getElementById(ulname).getElementsByTagName('li');
    var measurePopup =  document.getElementById("measure-popup");
    measurePopup.style.display = "block";
    for (var i=0;i<links.length;i++){
        var menu =  document.getElementById("submenu-"+name+(i+1));
        if(count == (i+1)&&menu){
            if (  menu.style.display == "block"){
                menu.style.display = "none";
                menu.parentNode.className ="list-title-up";
                if(count == 3){
                    measurePopup.style.display = "none";
                    sketchElement.innerHTML ="";
                }
                check();
            }else if(menu.style.display == "none" || menu.style.display == ""){
                menu.style.display = "block"; 
                menu.parentNode.className ="list-title-down";
                 if(count == 3){
                    measurePopup.style.display = "block";
                    sketchElement.innerHTML ="";
                }
            }
            map.removeInteraction(draw1);
            map.removeInteraction(draw2);
        }else if(menu){
            menu.style.display = "none";
            measurePopup.style.display = "none";

        }
    }
}

function init(ulname,name,count){
    /*标注开始*/
    var typeSelected=document.getElementById('drawtype');
    //初始化绘图工具  
    function addInteraction(){
        var value=typeSelected.value;
        if(value!=='None'){
            draw1=new ol.interaction.Draw({
                source:source,//设置要素源，绘制结束后将绘制的要素添加到临时图层  
                type:(value)//绘制的类型  
            });
            map.addInteraction(draw1);
        }
    }
    //绘制方式改变后重新初始化绘图工具  
    typeSelected.onchange= function(e){
        map.removeInteraction(draw1);
        addInteraction();
    };
     /*测距开始*/
    var viewport=map.getViewport();
    var testType=document.getElementById('testtype');
    var mouseMoveHandler=function(evt){
        if(sketch){
            var output;
            var geom=(sketch.getGeometry());
            if(geom instanceof ol.geom.Polygon){
                output=formateArea(geom);
            }
            else if(geom instanceof  ol.geom.LineString){
                output=formateLength(geom);
            }
            sketchElement.innerHTML=output;

        }
    };
    viewport.addEventListener('mousemove',mouseMoveHandler);

    function addInteraction2(map,typeSelect,source){
        var type=typeSelect.value=='area'?'Polygon':'LineString';
         if(typeSelect.value!=='None'){
            draw2=new ol.interaction.Draw({
                source:range_source,
                type:(type)

            });
            map.addInteraction(draw2);
        }
        draw2.on('drawstart',function(evt){

            sketch=evt.feature;
            sketchElement=document.getElementById('measureOutput');
        });
        draw2.on('drawend',function(evt){
            sketch=null;
        });
    }

    testType.onchange=function(e){
        map.removeInteraction(draw2);
        addInteraction2(map,testType,source);
    };
    var formateLength=function(line){
        var length=Math.round(line.getLength()*100)/100;
        var output;
        if(length>100){
            output=(Math.round(length/1000*100)/100)+' '+'km';
        }
        else{
            output=(Math.round(length*100)/100)+' '+'m';
        }
        return output;
    };
    var formateArea=function(polygon){
        var area=polygon.getArea();
        var output;
        if(area>10000){
            output=(Math.round(area/100000*100)/100)+' '+ 'km<sup>2</sup>';
        }
        else{
            output=(Math.round(area*100)/100)+' '+'m<sup>2</sup>';
        }
        return output;
    };

    setMarkUnFlod(ulname,name,count);
}

