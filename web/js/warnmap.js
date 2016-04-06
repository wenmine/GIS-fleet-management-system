/**
 * Created by wangw on 2016/3/26.
 */
/*警告*/
var warnFeature;
var warnDraw = null;
var warnFeatureID = 0;

function warnClose(that) {
    that.parentNode.parentNode.style.display = "none";
    document.getElementById("warn-name").value = "未命名";
    if (warnFeature) {
        warnSource.removeFeature(warnFeature);
    }
    if (warnDraw != null) {
        map.addInteraction(warnDraw);
    }
}

$(".warnInfo").each(function (index) {
    var This = $(this);
    var warnId = This.attr("data-id");
    var warnName = This.attr("data-name");
    var coord = This.attr("data-coord");
    var coordFloatArr = coordConver("Polygon", coord);
    drawWarn(warnId, warnName, coordFloatArr);
});

function drawWarn(warnId, name, coord) {
    var feature;
    feature = new ol.Feature({geometry: new ol.geom.Polygon([coord])});
    feature.setId(warnId);
    var warnStyle = new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255,255,255,0.2)'
        }),
        stroke: new ol.style.Stroke({
            color: '#ff0000',
            width: 2
        }),
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
    feature.setStyle(warnStyle);
    warnSource.addFeature(feature);
}
function seeWarnCenter(data) {
    var coord = [];
    coord = coordConver("Polygon",data.Geo);
    map.getView().setCenter(coord[1]);
}
function updateWarnList(data) {
    var list = "";
    console.log(data);
    if (data.length <= 0) {
        list = "<li onclick='stopEvent(event)'><a  class='ship-none'>暂无设置报警区域</a></li>";
        warnSource.clear();
    } else {
        $.each(data, function (index, element) {
            list += "<li class=‘warnInfo’ data-id=" + element.Id + "data-name=" + element.Name + "data-coord=" + element.Geo + " onclick='stopEvent(event)'>";
            list += "<a  data-id=" + element.Id + ">" + element.Name + "</a>";
            list += "<span class='warn-del del' data-id=" + element.Id + "></span>";
            list += "</li>";
        });
    }
    $("#submenu-three2").html(list);
    warnListOperate();
}
function warnListOperate() {
    $('#submenu-three2 li a:not(.warn-none)').dblclick(function (event) {
        stopEvent(event);
        var me = $(this);
        var id = me.attr("data-id");
        $.ajax({
            url: basePath + "/editalert",
            type: 'post',
            data: {
                Warn_ID: id
            },
            dataType: 'json',
            timeout: 1000,
            cache: false,
            error: erryFunction,  //错误执行方法
            success: seeWarnCenter //成功执行方法
        });
        function erryFunction() {
            alert("error");
        }
    });

    /*删除*/
    $(".warn-del").click(function (event) {
        stopEvent(event);
        var me = $(this);
        var id = me.attr("data-id");
        console.log(id);
        $.ajax({
            type: "post",
            url: basePath + "/delalert",
            dataType: "json",
            contentType: "application/x-www-form-urlencoded; charset=GBK",
            data: {
                Warn_ID: id
            },
            success: function (data) {
                warnSource.removeFeature(warnSource.getFeatureById(id));
                updateWarnList(data);
            },
            error: function (data) {
                alert(data);
            }
        });
    });
}
warnListOperate();
function warnInit(ulname, name, count) {
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
                var warnPopup = document.getElementById("warn-popup");
                var warnNameSave = document.getElementById("warn-name-save");
                var warnFeatureID = generateUUID();
                warnFeature = evt.feature;
                warnFeature.setId(warnFeatureID);
                console.log(warnFeature.getId());
                warnPopup.style.display = "block";
                map.removeInteraction(warnDraw);
                warnNameSave.onclick = function () {
                    warnName = document.getElementById("warn-name");
                    if (warnName.value != "") {
                        warnPopup.style.display = "none";
                        var warnStyle = new ol.style.Style({
                            fill: new ol.style.Fill({
                                color: 'rgba(255,255,255,0.2)'
                            }),
                            stroke: new ol.style.Stroke({
                                color: '#0c95f8',
                                width: 2
                            }),
                            text: new ol.style.Text({
                                text: warnName.value,
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
                        map.addInteraction(warnDraw);
                        var Name = warnName.value;
                        var coord = warnFeature.getGeometry().getCoordinates();
                        $.ajax({
                            type: "post",
                            url: basePath + "/addalert",
                            dataType: "json",
                            contentType: "application/x-www-form-urlencoded; charset=GBK",
                            data: {
                                Warn_ID: warnFeatureID,
                                Warn_Name: Name,
                                Warn_Coord: coord.join()
                            },
                            success: updateWarnList,
                            error: function (data) {
                                alert(data);
                            }
                        });
                        document.getElementById("warn-name").value = "未命名";
                    }
                };
            });
        }
    }

    warnType.onchange = function (e) {
        map.removeInteraction(warnDraw);
        addInteraction3();
    };
    setMarkUnFlod(ulname, name, count);
}

