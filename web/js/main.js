/**
 * Created by Administrator on 2016/3/1.
 */
function check(){
    document.getElementById("drawtype").value="None";
     document.getElementById("testtype").value="None";
}
//        window.onload = function(){
function stopEvent(event){ //阻止冒泡事件
    //取消事件冒泡
    var e=arguments.callee.caller.arguments[0]||event; //若省略此句，下面的e改为event，IE运行可以，但是其他浏览器就不兼容
    if (e && e.stopPropagation) {
        // this code is for Mozilla and Opera
        e.stopPropagation();
    } else if (window.event) {
        // this code is for IE
        window.event.cancelBubble = true;
    }
}

function setOn(name,count){
    var links = document.getElementById("tab1").getElementsByTagName('li');
    for (var i=0;i<links.length;i++){
        var menu = document.getElementById(name+(i+1));
        if(count == (i+1)){
            menu.className="on";
            document.getElementById("left-nav"+i).style.display = "block";
        }else{
            menu.className="";
            menu.className="out";
            if (i != 0)
            {
                document.getElementById("left-nav"+i).style.display = "none";
            }
        }
    }
}

function setUnflod(ulname,name,count){
    console.log(count);
    var links =  document.getElementById(ulname).getElementsByTagName('li');
    for (var i=0;i<links.length;i++){
        var menu =  document.getElementById("submenu-"+name+(i+1));
        if(count == (i+1)&&menu){
            if (  menu.style.display == "block"){
                menu.style.display = "none";
                menu.parentNode.className ="list-title-up";
            }else if(menu.style.display == "none" || menu.style.display == ""){
                menu.style.display = "block";
                menu.parentNode.className ="list-title-down";
            }
        }else if(menu){
            menu.style.display = "none";
        }
    }
}
function doReset(){
    for(i=0;i<document.all.tags("input").length;i++){
        if(document.all.tags("input")[i].type=="text"){
            document.all.tags("input")[i].value="";
        }
    }
}
function wOpen(){
    document.getElementById("add-ship").style.display = "block";
}
function wClose(that){
    that.parentNode.parentNode.style.display = "none";
    doReset();
}
function editShipHandler(num) {
    document.getElementById("add-ship").style.display = "block";
    document.getElementById("number").value = num;
}
function delShipHandler(shipElement) {
    var shipList = document.getElementById("submenu-one1");
    shipList.removeChild(shipElement);
    shipElement =null;
}
function addShipSubmit(){
    document.getElementById("add-ship").style.display = "none";
    var shipElement = document.createElement("li");
    var shipA = document.createElement("a");
    var shipSpan1 = document.createElement("span");
    var shipSpan2 = document.createElement("span");
    var shipNum = document.getElementById("number");
    var shipList = document.getElementById("submenu-one1");
    console.log(shipElement);
    if(shipList.childNodes){
        if(shipList.childNodes[0])
        shipList.insertBefore(shipElement,shipList.lastChild.nextSibling);
    }
    else{
        shipList.appendChild(shipElement);
    }
    shipElement.className = "dynamic-ship-list";
    shipSpan1.className = "edit";
    shipSpan2.className = "del";
    shipElement.appendChild(shipA);
    shipElement.insertBefore(shipSpan1,shipElement.lastChild.nextSibling);
    shipElement.insertBefore(shipSpan2,shipElement.lastChild.nextSibling);
    console.log(shipNum.value);
    shipA.innerHTML = shipNum.value;
    // shipSpan1.addEventListener('click',editShipHandler());
    // shipSpan2.addEventListener('click',delShipHandler());
    doReset();
}

function cancelShipSubmit(){
    document.getElementById("add-ship").style.display = "none";
    doReset();
}