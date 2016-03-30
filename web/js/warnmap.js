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
                warnFeatureID = warnFeatureID + 1;
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
                            image: new ol.style.Icon(({
                                anchor: [0.5, 46],
                                anchorXUnits: 'fraction',
                                anchorYUnits: 'pixels',
                                opacity: 0.75,
                                src: '../image/marker-icon.png'
                            })),
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

