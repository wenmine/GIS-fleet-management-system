var projection = ol.proj.get("EPSG:3857");//指定了地图切片使用的坐标系
var resolutions = [];
var draw1 = null;//定义全局变量，当绘图方式改变时删除当前的绘制工具
var draw2 = null;
var map = null;
var source = null;
var fleet_source = null;
var range_source = null;
var iconStyle = null;
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
    for (var i = 0; i < 19; i++) {
        resolutions[i] = Math.pow(2, 18 - i);
    }
    var tilegrid = new ol.tilegrid.TileGrid({
        origin: [0, 0],
        resolutions: resolutions
    });//指定了切片使用的网络的模式

    var baidu_source = new ol.source.TileImage({
        projection: projection,
        tileGrid: tilegrid,
        tileUrlFunction: function (tileCoord, pixelRatio, proj) {//每次用户与地图交互，比如 缩放、平移等，就会触发会触发回调函数，此函数根据传入的变量参数构造图片切片的 URL 地址。
            if (!tileCoord) {
                return "";
            }
            var z = tileCoord[0];//当前缩放级别z
            var x = tileCoord[1];//切片的x索引
            var y = tileCoord[2];//切片的y索引

            if (x < 0) {
                x = "M" + (-x);
            }
            if (y < 0) {
                y = "M" + (-y);
            }

            return "http://online3.map.bdimg.com/onlinelabel/?qt=tile&x=" + x + "&y=" + y + "&z=" + z + "&styles=pl&udt=20160222&scaler=1&p=1";
        }
    });

    var baidu_layer = new ol.layer.Tile({
        source: baidu_source
    });
    //创建标注图层的样式
    iconStyle = new ol.style.Style({
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
            text: "未命名标注",
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
    //临时标注图层的数据源
    source = new ol.source.Vector();
    //新建临时标注图层，并设置临时图层渲染各种要素的样式
    var vector = new ol.layer.Vector({
        source: source,
        style: iconStyle
    });

    //创建船队图层的样式
    var fleetStyle = new ol.style.Style({
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
            src: '../image/fleeticon.png'
        }))
    });

    //临时标注图层的数据源
    fleet_source = new ol.source.Vector();
    //新建临时标注图层，并设置临时图层渲染各种要素的样式
    var fleet_vector = new ol.layer.Vector({
        source: fleet_source,
        style: fleetStyle
    });
    //临时测距图层的数据源
    range_source = new ol.source.Vector();
    //新建临时测距图层，并设置临时图层渲染各种要素的样式
    var range_vector = new ol.layer.Vector({
        source: range_source,
        style: new ol.style.Style()
    });
    map = new ol.Map({
        controls: ol.control.defaults({
            attribution: false
        }).extend(controls),
        interactions: ol.interaction.defaults().extend([
            new ol.interaction.DragRotateAndZoom()
        ]),
        target: 'map',
        layers: [baidu_layer, vector, range_vector, fleet_vector],
        view: new ol.View({
            center: [12959773, 4853101],//设置地图中心
            zoom: 5 //初始的缩放等级
        })
    });
    // map.getView().fitExtent(bounds, map.getSize());

};
