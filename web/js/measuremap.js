/* 当前绘制的要素*/
var sketch;
var measureDraw = null;

/**
 * 当前绘制要素的元素
 */
var sketchElement;

function measureInit(ulname, name, count) {
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
            sketch = null;
        });
    }

    testType.onchange = function (e) {
        map.removeInteraction(measureDraw);
        addInteraction2(map, testType, range_source);
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

