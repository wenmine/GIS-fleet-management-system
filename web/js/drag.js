/**
 * Created by wangw on 2016/3/14.
 */
//由于IE浏览器没有getElementByClassName，所以要封装这个方法
//返回是所要找的classname的对象数组
function getByClass (clsName,parent) {
    var oParent = parent?document.getElementById(parent):document;
    eles = [];
    elements = oParent.getElementsByTagName('*');
    for (var i = 0,l = elements.length; i<l;i++) {
        if (elements[i].className == clsName) {
            eles.push(elements[i]);
        }
    }
    return eles;
}
var oTitle = getByClass('popup-top','measure-popup')[0];
oTitle.onmousedown = fnDown;
function fnDown (event) {
    console.log("1");
    event = event || window.event;
    var oDrag = document.getElementById('measure-popup');
    //disX和disY是光标按下时光标与面板间的距离，
    //通过光标在在整个页面的距离减去面板在整个页面的距离获得
    var disX = event.clientX-oDrag.offsetLeft;
    var disY = event.clientY-oDrag.offsetTop;
    //移动
    document.onmousemove = function  (event) {

        event = event || window.event;
        fnMove(event,disX,disY);
    };

    //释放鼠标
    document.onmouseup = function  () {
        document.onmousemove = null;
        document.onmouseup = null;
    }
}

function fnMove (e,posX,posY) {
    var oDrag = document.getElementById('measure-popup');
    var l = e.clientX-posX,
        t = e.clientY-posY,
        winW = document.documentElement.clientWidth || document.body.clientWidth,
        winH = document.documentElement.clientHeight || document.body.clientHeight,
        maxW = winW -oDrag.offsetWidth-5,
        maxH = winH -oDrag.offsetHeight-45;
    if(l < 0){
        l = 0;
    }else if(l > maxW){
        l = maxW;
    }
    if(t < 0){
        t = 0;
    }else if(t > maxH){
        t = maxH;
    }
    oDrag.style.left = l + 'px';
    oDrag.style.top = t +'px';
}