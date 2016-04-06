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
/**
 * 当前绘制要素的元素
 */
var sketchElement;

function setMarkUnFlod(ulname, name, count) {
    var links = document.getElementById(ulname).getElementsByTagName('li');
    var measurePopup = document.getElementById("measure-popup");
    var markPopup = document.getElementById("mark-popup");
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
            if (count != 1) {
                if (markPopup.style.display == "block") {
                    markPopup.style.display = "none";
                    document.getElementById("mark-name").value = "未命名标注";
                    map.removeInteraction(markDraw);
                }
            }
        } else if (menu) {
            menu.style.display = "none";
            measurePopup.style.display = "none";

        }
    }
    check();
    map.removeInteraction(markDraw);
    map.removeInteraction(measureDraw);
    map.removeInteraction(warnDraw);
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

//将后台传来的坐标字符串改为坐标数组
function coordConver(marktype, coord) {
    var coordFloatArr = [];//保存转换后的整型字符串
    var i, j, k;
    if (marktype == "Point") {
        var coordStrArr = coord.split(" ");//分割成字符串数组
        for (i = 0; i < coordStrArr.length; i++) {
            coordFloatArr.push(parseFloat(coordStrArr[i]));
        }
    } else {
        var temp = coord.split(",");
        for (i = 0; i < temp.length; i++) {
            var eachCoordStrArr = temp[i].split(" ");
            var eachTemp = [];
            for (j = 0; j < eachCoordStrArr.length; j++) {
                eachTemp.push(parseFloat(eachCoordStrArr[j]));
            }
            coordFloatArr.push(eachTemp);
        }
    }
    return coordFloatArr;
}

$(".markInfo").each(function (index) {
    var This = $(this);
    var markId = This.attr("data-id");
    var markName = This.attr("data-name");
    var marktype = This.attr("data-type");
    var coord = This.attr("data-coord");
    var coordFloatArr = coordConver(marktype, coord);
    console.log(coordFloatArr);
    drawMark(markId, markName, marktype, coordFloatArr);
});

function drawMark(markId, name, type, coord) {
    var feature;
    console.log(type + coord + markId + name);
    if(type == "Point"){
       feature = new ol.Feature(new ol.geom.Point(coord));
    }else if(type == "LineString"){
        feature = new ol.Feature(new ol.geom.LineString(coord));
    }else if(type == "Polygon"){
        feature = new ol.Feature({  geometry: new ol.geom.Polygon([coord])});
    }

    feature.setId(markId);
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
            text: name,
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
    feature.setStyle(markStyle);
    source.addFeature(feature);
}
function seeMarkCenter(data) {
    var coord = [];
    console.log(data);
    coord = coordConver(data.Type, data.Geo);
    if (data.Type == "Point") {
        map.getView().setCenter(coord);
    } else if (data.Type == "LineString") {
        map.getView().setCenter(coord[1]);
    } else if (data.Type == "Polygon") {
        map.getView().setCenter(coord[1]);
    }
}
function updateMarkList(data) {
    var list = "";
    console.log(data);
    if (data.length <= 0) {
        list = "<li onclick='stopEvent(event)'><a  class='ship-none'>暂无标注</a></li>";
        source.clear();
    } else {
        $.each(data, function (index, element) {
            list += "<li class=‘markInfo’ data-id=" + element.Id + "data-type=" + element.Type + "data-name=" + element.Name + "data-coord=" + element.Geo + " onclick='stopEvent(event)'>";
            list += "<a  data-id=" + element.Id + ">" + element.Name + "</a>";
            list += "<span class='mark-del del' data-id=" + element.Id + "></span>";
            list += "</li>";
        });
    }
    $("#submenu-two2").html(list);
    markListOperate();
}
function markListOperate() {
    $('#submenu-two2 li a:not(.mark-none)').dblclick(function (event) {
        stopEvent(event);
        var me = $(this);
        var id = me.attr("data-id");
        $.ajax({
            url: basePath + "/editgeo",
            type: 'post',
            data: {
                Mark_ID: id
            },
            dataType: 'json',
            timeout: 1000,
            cache: false,
            error: erryFunction,  //错误执行方法
            success: seeMarkCenter //成功执行方法
        });
        function erryFunction() {
            alert("error");
        }
    });

    /*删除*/
    $(".mark-del").click(function (event) {
        stopEvent(event);
        var me = $(this);
        var id = me.attr("data-id");
        console.log(id);
        $.ajax({
            type: "post",
            url: basePath + "/delgeo",
            dataType: "json",
            contentType: "application/x-www-form-urlencoded; charset=GBK",
            data: {
                Mark_ID: id
            },
            success: function (data) {
                source.removeFeature(source.getFeatureById(id));
                updateMarkList(data);
            },
            error: function (data) {
                alert(data);
            }
        });
    });
}
markListOperate();
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
                var markFeatureID;
                markFeatureID = generateUUID();
                markFeature = evt.feature;
                markFeature.setId(markFeatureID);

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
                        var Name = markName.value;
                        var type = markFeature.getGeometry().getType();
                        var coord = markFeature.getGeometry().getCoordinates();
                        $.ajax({
                            type: "post",
                            url: basePath + "/addgeo",
                            dataType: "json",
                            contentType: "application/x-www-form-urlencoded; charset=GBK",
                            data: {
                                Mark_ID: markFeatureID,
                                Mark_Name: Name,
                                Mark_Type: type,
                                Mark_Coord: coord.join()
                            },
                            success: updateMarkList,
                            error: function (data) {
                                alert(data);
                            }
                        });
                        document.getElementById("mark-name").value = "未命名标注";
                    }

                };
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

