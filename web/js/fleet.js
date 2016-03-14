/**
 * Created by Administrator on 2016/3/14.
 */
//每次打开对话框时将里面的原先的值清空
function doReset() {
    for (i = 0; i < document.all.tags("input").length; i++) {
        if (document.all.tags("input")[i].type == "text") {
            document.all.tags("input")[i].value = "";
        }
    }
}
function wOpen() {
    document.getElementById("add-ship").style.display = "block";
}
function wClose(that) {
    that.parentNode.parentNode.style.display = "none";
    doReset();
}
function editShipHandler(num, event) {
    document.getElementById("add-ship").style.display = "block";
    document.getElementById("number").value = num;
    stopEvent(event);
}
function delShipHandler(shipElement, event) {
    var shipList = document.getElementById("submenu-one1");
    shipList.removeChild(shipElement);
    shipElement = null;
    stopEvent(event);
}
function addShipSubmitCheck(){
    addShip = document.getElementById("add-ship");

}
function addShipSubmit() {
    addShipSubmitCheck();
    document.getElementById("add-ship").style.display = "none";
    var shipElement = document.createElement("li");
    var shipA = document.createElement("a");
    var shipSpan1 = document.createElement("span");
    var shipSpan2 = document.createElement("span");
    var shipNum = document.getElementById("number");
    var shipList = document.getElementById("submenu-one1");
    var num;
    console.log(shipElement);
    if (shipList.childNodes) {
        if (shipList.childNodes[0])
            shipList.insertBefore(shipElement, shipList.lastChild.nextSibling);
    }
    else {
        shipList.appendChild(shipElement);
    }
    shipElement.className = "dynamic-ship-list";
    shipSpan1.className = "edit";
    shipSpan2.className = "del";
    shipElement.appendChild(shipA);
    shipElement.insertBefore(shipSpan1, shipElement.lastChild.nextSibling);
    shipElement.insertBefore(shipSpan2, shipElement.lastChild.nextSibling);
    num = shipNum.value;
    shipA.innerHTML = shipNum.value;
    if (shipElement) {
        shipElement.onclick = function(){
            stopEvent(event);
        };
    }
    if (shipSpan1) {
        shipSpan1.onclick = function () {
            editShipHandler(num, event);
        };
    }
    if (shipSpan2) {
        shipSpan2.onclick = function () {
            delShipHandler(shipElement, event);
        };
    }
    doReset();
}

//function cancelShipSubmit(){
//    document.getElementById("add-ship").style.display = "none";
//    doReset();
//}