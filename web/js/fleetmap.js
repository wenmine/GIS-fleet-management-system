/**
 * Created by wangw on 2016/3/27.
 */
//var fleetDraw = null;
//$(function () {
//    //var long = 11492230.765647963;
//    //var lat = 5072972.693230578;
//    var data = {
//        long :  11492230.765647963,
//        lat : 5072972.693230578
//    };
//    function FleetAddInteraction() {
//        fleetDraw = new ol.interaction.Draw({
//            source: fleet_source,//设置要素源，绘制结束后将绘制的要素添加到临时图层
//            type: "point"//绘制的类型
//        });
//        map.addInteraction(fleetDraw);
//    }
//    var feature = ol.format.GeoJSON.readFeature(data);
//    fleet_source.addFeature(feature);
//    FleetAddInteraction();
//});