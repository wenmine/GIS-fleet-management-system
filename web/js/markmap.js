/**
 * Created by wangw on 2016/3/26.
 */
/* 当前绘制的要素*/
var sketch;
var markFeature;
/**
 * 当前绘制要素的元素
 */
var sketchElement;

function setMarkUnFlod(ulname, name, count) {
    var links = document.getElementById(ulname).getElementsByTagName('li');
    var measurePopup = document.getElementById("measure-popup");
    measurePopup.style.display = "block";
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
            map.removeInteraction(draw1);
            map.removeInteraction(draw2);
        } else if (menu) {
            menu.style.display = "none";
            measurePopup.style.display = "none";

        }
    }
}

function markClose(that) {
    that.parentNode.parentNode.style.display = "none";
    document.getElementById("#mark-name").value = "未命名标注";
    if(draw1!= null){
        map.addInteraction(draw1);
    }
}
var markPopup =document.getElementById("mark-popup");
var markName =null;
$("#mark-name-save").click(function(){
    markName =document.getElementById("mark-name");
    if(markName.value !=""){
        markPopup.style.display = "none";
        iconStyle.text_.setText(markName.value);
        markFeature.setStyle(iconStyle);
        //map.addInteraction(draw1);
    }
});
/*实现标注与测距功能*/
function init(ulname, name, count) {
    /*标注开始*/
    var typeSelected = document.getElementById('drawtype');
    //初始化绘图工具
    function addInteraction() {
        var value = typeSelected.value;
        if (value !== 'None') {
            draw1 = new ol.interaction.Draw({
                source: source,//设置要素源，绘制结束后将绘制的要素添加到临时图层
                type: (value)//绘制的类型
            });
            var count = 0;
            map.addInteraction(draw1);
            draw1.on('drawstart', function (evt) {
                markFeature = evt.feature;
            });
            draw1.on('drawend', function (evt) {
                //map.removeInteraction(draw1);
                count+=1;
                markPopup.style.display = "block";
                    if(markName&&markName.value !=""){

                        //map.addInteraction(draw1);
                    }
                markFeature = null;
                    // window.temp = evt.feature;
                    // console.log(evt.feature);
                    // console.log(count);

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
        map.removeInteraction(draw1);
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
            draw2 = new ol.interaction.Draw({
                source: range_source,
                type: (type)

            });
            map.addInteraction(draw2);
        }
        draw2.on('drawstart', function (evt) {
            sketch = evt.feature;
            sketchElement = document.getElementById('measureOutput');
        });
        draw2.on('drawend', function (evt) {
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
        map.removeInteraction(draw2);
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

