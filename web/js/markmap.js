/**
 * Created by wangw on 2016/3/26.
 */
/* 标注*/
var markFeature;
var markDraw = null;//定义全局变量，当绘图方式改变时删除当前的绘制工具
/*警告*/
var warnDraw = null;
/*测距*/
var measureDraw = null;
var markFeatureID = 0;
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
    document.getElementById("mark-name").value = "未命名标注";
    if (markFeature) {
        source.removeFeature(markFeature);
    }
    if (markDraw != null) {
        map.addInteraction(markDraw);
    }
}

var markName = null;
/*实现标注与测距功能*/
function init(ulname, name, count) {
    /*标注开始*/
    var typeSelected = document.getElementById('drawtype');
    //初始化绘图工具
    function addInteraction() {
        var value = typeSelected.value;
        if (value !== 'None') {
            markDraw = new ol.interaction.Draw({
                source: source,//设置要素源，绘制结束后将绘制的要素添加到临时图层
                type: (value)//绘制的类型
            });
            map.addInteraction(markDraw);
            markDraw.on('drawend', function (evt) {
                var markPopup = document.getElementById("mark-popup");
                var markNameSave = document.getElementById("mark-name-save");
                markFeatureID = markFeatureID + 1;
                markFeature = evt.feature;
                var coord = markFeature.getGeometry().getCoordinates();
                console.log(coord);
                markFeature.setId(markFeatureID);
                console.log(markFeature.getId());
                markPopup.style.display = "block";
                map.removeInteraction(markDraw);
                markNameSave.onclick = function () {
                    markName = document.getElementById("mark-name");
                    if (markName.value != "") {
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
                        map.addInteraction(markDraw);
                        document.getElementById("mark-name").value = "未命名标注";
                    }
                };


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
    setMarkUnFlod(ulname, name, count);
}

