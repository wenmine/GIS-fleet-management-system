/**
 * Created by Administrator on 2016/3/1.
 */
function check() {
    document.getElementById("drawtype").value = "None";
    document.getElementById("testtype").value = "None";
    document.getElementById("warntype").value = "None";
}
//        window.onload = function(){
function stopEvent(event) { //阻止冒泡事件
    //取消事件冒泡
    var e = arguments.callee.caller.arguments[0] || event; //若省略此句，下面的e改为event，IE运行可以，但是其他浏览器就不兼容
    if (e && e.stopPropagation) {
        // this code is for Mozilla and Opera
        e.stopPropagation();
    } else if (window.event) {
        // this code is for IE
        window.event.cancelBubble = true;
    }
}

function setOn(name, count) {
    var links = document.getElementById("tab1").getElementsByTagName('li');
    for (var i = 1; i <= links.length; i++) {
        var menu = document.getElementById(name + i);
        if (count == i) {
            menu.className = "on";
            document.getElementById("left-nav" + i).style.display = "block";
            if (count != 1) {
                if (document.getElementById("add-ship").style.display != "none") {
                    document.getElementById("add-ship").style.display = "none";
                    clearForm();
                }
            }
        } else {
            menu.className = "";
            menu.className = "out";
            document.getElementById("left-nav" + i).style.display = "none";
        }
    }
    if (map && measureDraw) {
        map.removeInteraction(measureDraw);
        measureDraw = null;
    }
    if (map && warnDraw) {
        map.removeInteraction(warnDraw);
        warnDraw = null;
    }
    if (map && markDraw) {
        map.removeInteraction(markDraw);
        markDraw = null;
    }
    check();
    if (document.getElementById("measure-popup").style.display != "none") {
        document.getElementById("measure-popup").style.display = "none";
        document.getElementById("measureOutput").innerHTML = "";
    }
    if (document.getElementById("mark-popup").style.display != "none") {
        document.getElementById("mark-popup").style.display = "none";
        document.getElementById("mark-name").value = "未命名标注";
    }
    if (document.getElementById("warn-popup").style.display != "none") {
        document.getElementById("warn-popup").style.display = "none";
        document.getElementById("warn-name").value = "未命名";
    }
}

function setUnflod(ulname, name, count) {
    console.log(count);
    var links = document.getElementById(ulname).getElementsByTagName('li');
    for (var i = 0; i < links.length; i++) {
        var menu = document.getElementById("submenu-" + name + (i + 1));
        if (count == (i + 1) && menu) {
            if (menu.style.display == "block") {
                menu.style.display = "none";
                menu.parentNode.className = "list-title-up";
            } else if (menu.style.display == "none" || menu.style.display == "") {
                menu.style.display = "block";
                menu.parentNode.className = "list-title-down";
            }
        } else if (menu) {
            menu.style.display = "none";
        }
    }
}
//随机生成uuid
function generateUUID(){
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });
    return uuid;
};