/**
 * Created by wangw on 2016/3/26.
 */
/* 当前绘制的要素*/
var sketch;
var markFeature;
var warnFeature;
var markDraw = null;//定义全局变量，当绘图方式改变时删除当前的绘制工具
var measureDraw = null;
var warnDraw = null;
/**
 * 当前绘制要素的元素
 */
var sketchElement;

function setMarkUnFlod(ulname, name, count) {
    var links = document.getElementById(ulname).getElementsByTagName('li');
    var measurePopup = document.getElementById("measure-popup");
    //measurePopup.style.display = "block";
    for (var i = 0; i < links.length; i++) {
        var menu = document.getElementById("submenu-" + name + (i + 1));
        if (count == (i + 1) && menu) {
            if (menu.style.display == "block") {
                menu.style.display = "none";
                menu.parentNode.className = "list-title-up";
                if (count == 3) {
                    measurePopup.style.display = "none";
                    if (sketchElement) {
                        sketchElement.innerHTML = "";
                    }
                }
                check();
            } else if (menu.style.display == "none" || menu.style.display == "") {
                menu.style.display = "block";
                menu.parentNode.className = "list-title-down";
                if (count == 3) {
                    measurePopup.style.display = "block";
                    if (sketchElement) {
                        sketchElement.innerHTML = "";
                    }
                }
            }
            map.removeInteraction(markDraw);
            map.removeInteraction(measureDraw);
            map.removeInteraction(warnDraw);
        } else if (menu) {
            menu.style.display = "none";
            measurePopup.style.display = "none";

        }
    }
}

function markClose(that) {
    that.parentNode.parentNode.style.display = "none";
    document.getElementById("#mark-name").value = "未命名标注";
    //if(markDraw!= null){
    //    map.addInteraction(markDraw);
    //}
}

var markName =null;
/*实现标注与测距功能*/
function init(ulname, name, count) {
    /*标注开始*/
    var typeSelected = document.getElementById('drawtype');
    //初始化绘图工具
    function addInteraction() {
        var value = typeSelected.value;
        ol.interaction.defaults({doubleClickZoom:false});
        if (value !== 'None') {
            markDraw = new ol.interaction.Draw({
                source: source,//设置要素源，绘制结束后将绘制的要素添加到临时图层
                type: (value)//绘制的类型
            });
            map.addInteraction(markDraw);
            markDraw.on('drawend', function (evt) {
                markFeature = evt.feature;
                var markPopup =document.getElementById("mark-popup");
                markPopup.style.display = "block";
               //console.log( map.removeInteraction(markDraw));
                $("#mark-name-save").click(function(){
                    markName =document.getElementById("mark-name");
                    if(markName.value !=""){
                        markPopup.style.display = "none";
                        var markStyle = new ol.style.Style({
                            fill: new ol.style.Fill({
                                color: 'rgba(255,255,255,0.2)'
                            }),
                            stroke: new ol.style.Stroke({
                                color: '#0c95f8',
                                width: 2
                            }),
                            image: new ol.style.Icon(({
                                anchor: [0.5, 46],
                                anchorXUnits: 'fraction',
                                anchorYUnits: 'pixels',
                                opacity: 0.75,
                                src: '../image/marker-icon.png'
                            })),
                            text: new ol.style.Text({
                                text: markName.value,
                                offsetY: 0,
                                textAlign: 'left',
                                fill: new ol.style.Fill({
                                    color: 'rgba(255,255,255,0.2)'
                                }),
                                stroke: new ol.style.Stroke({
                                    color: '#ff0000',
                                    width: 1
                                })
                            })
                        });
                        markFeature.setStyle(markStyle);
                        //map.addInteraction(markDraw);
                    }
                });


                //console.log(evt.feature);
                //var format = new ol.format.GeoJSON();
                //format.writeFeature(evt.feature);
                //var coord = evt.feature.getGeometry().getCoordinates();
                //console.log(coord);
                //var feature = new ol.Feature(new ol.geom.Point([12053737.17543087, 4402772.829226152]));
                //source.addFeature(feature);
            });
        }
    }

    //绘制方式改变后重新初始化绘图工具
    typeSelected.onchange = function (e) {
        map.removeInteraction(markDraw);
        addInteraction();
    };
    /*测距开始*/
    var viewport = map.getViewport();
    var testType = document.getElementById('testtype');
    var mouseMoveHandler = function (evt) {
        if (sketch) {
            var output;
            var geom = (sketch.getGeometry());
            if (geom instanceof ol.geom.Polygon) {
                output = formateArea(geom);
            }
            else if (geom instanceof ol.geom.LineString) {
                output = formateLength(geom);
            }
            sketchElement.innerHTML = output;

        }
    };
    viewport.addEventListener('mousemove', mouseMoveHandler);

    function addInteraction2(map, typeSelect, source) {
        var type = typeSelect.value == 'area' ? 'Polygon' : 'LineString';
        if (typeSelect.value !== 'None') {
            measureDraw = new ol.interaction.Draw({
                source: range_source,
                type: (type)

            });
            map.addInteraction(measureDraw);
        }
        measureDraw.on('drawstart', function (evt) {
            sketch = evt.feature;
            sketchElement = document.getElementById('measureOutput');
        });
        measureDraw.on('drawend', function (evt) {
            ////console.log(evt.feature);
            //var format = new ol.format.GeoJSON();
            //format.writeFeature(evt.feature);
            //var coord = evt.feature.getGeometry().getCoordinates();
            //console.log(coord);
            //var feature = new ol.Feature(new ol.geom.Point([12053737.17543087, 4402772.829226152]));
            //source.addFeature(feature);
            ////console.log(format);
            ////window.feature = evt.feature;
            ////window.temp = format;
            sketch = null;
        });
    }

    testType.onchange = function (e) {
        map.removeInteraction(measureDraw);
        addInteraction2(map, testType, source);
    };
    var formateLength = function (line) {
        var length = Math.round(line.getLength() * 100) / 100;
        var output;
        if (length > 100) {
            output = (Math.round(length / 1000 * 100) / 100) + ' ' + 'km';
        }
        else {
            output = (Math.round(length * 100) / 100) + ' ' + 'm';
        }
        return output;
    };
    var formateArea = function (polygon) {
        var area = polygon.getArea();
        var output;
        if (area > 10000) {
            output = (Math.round(area / 100000 * 100) / 100) + ' ' + 'km<sup>2</sup>';
        }
        else {
            output = (Math.round(area * 100) / 100) + ' ' + 'm<sup>2</sup>';
        }
        return output;
    };

    setMarkUnFlod(ulname, name, count);
}
function warnInit(ulname, name, count){
    var warnType = document.getElementById('warntype');
    function addInteraction3() {
        var value = warnType.value;
        if (value !== 'None') {
            warnDraw = new ol.interaction.Draw({
                source: warnSource,//设置要素源，绘制结束后将绘制的要素添加到临时图层
                type: (value)//绘制的类型
            });
            map.addInteraction(warnDraw);
            warnDraw.on('drawend', function (evt) {
                warnFeature = evt.feature;
                var markPopup =document.getElementById("mark-popup");
                markPopup.style.display = "block";
                //console.log( map.removeInteraction(markDraw));
                $("#mark-name-save").click(function(){
                    markName =document.getElementById("mark-name");
                    if(markName.value !=""){
                        markPopup.style.display = "none";
                        var warnStyle = new ol.style.Style({
                            fill: new ol.style.Fill({
                                color: 'rgba(255,255,255,0.2)'
                            }),
                            stroke: new ol.style.Stroke({
                                color: '#0c95f8',
                                width: 2
                            }),
                            image: new ol.style.Icon(({
                                anchor: [0.5, 46],
                                anchorXUnits: 'fraction',
                                anchorYUnits: 'pixels',
                                opacity: 0.75,
                                src: '../image/marker-icon.png'
                            })),
                            text: new ol.style.Text({
                                text: markName.value,
                                offsetY: 0,
                                textAlign: 'left',
                                fill: new ol.style.Fill({
                                    color: 'rgba(255,255,255,0.2)'
                                }),
                                stroke: new ol.style.Stroke({
                                    color: '#ff0000',
                                    width: 1
                                })
                            })
                        });
                        warnFeature.setStyle(warnStyle);
                        //map.addInteraction(warnDraw);
                    }
                });
            });
        }
    }

    warnType.onchange = function (e) {
        map.removeInteraction(warnDraw);
        addInteraction3();
    };
    setMarkUnFlod(ulname, name, count);
}

