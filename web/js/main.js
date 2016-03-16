/**
 * Created by Administrator on 2016/3/1.
 */
function check() {
    document.getElementById("drawtype").value = "None";
    document.getElementById("testtype").value = "None";
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
    for (var i = 0; i < links.length; i++) {
        var menu = document.getElementById(name + (i + 1));
        if (count == (i + 1)) {
            menu.className = "on";
            document.getElementById("left-nav" + i).style.display = "block";
        } else {
            menu.className = "";
            menu.className = "out";
            if ( 0 != i ) {
                document.getElementById("left-nav" + i).style.display = "none";
            }
        }
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
