/**
 * Created by Administrator on 2016/3/14.
 */
var getCheckObject = function () {
    var tipNum = tip = document.createElement("p");
    tip.appendChild(document.createTextNode("必须为9位数字组成"));
    var tipCall = tip = document.createElement("p");
    tip.appendChild(document.createTextNode("必须为4位数字组成"));
    var tipOther = tip = document.createElement("p");
    tip.appendChild(document.createTextNode("输入框不能为空"));

    function addErrorTip(node, name) {
        node.className += ' ' + 'error' + ' ';
        if (name === "number") {
            node.parentNode.appendChild(tipNum);
        } else if (name === "call_sign") {
            node.parentNode.appendChild(tipCall);
        } else {
            node.parentNode.appendChild(tipOther);
        }
    }

    function removeErrorTip(node, name) {
        node.className = "";
        if (name === "number") {
            node.parentNode.removeChild(tipNum);
        } else if (name === "call_sign") {
            node.parentNode.removeChild(tipCall);
        } else {
            node.parentNode.removeChild(tipOther);
        }
    }

    function isValidNum(value) {
        var reg = new RegExp("^[0-9]{9}$");
        var hasEnouthDigital = reg.test(value);
        return hasEnouthDigital;
    }

    function isValidCall(callvalue) {
        var reg = new RegExp("^[0-9]{4}$");
        var hasEnouthDigital = reg.test(value);
        return hasEnouthDigital;
    }

    return {
        addErrorTip: addErrorTip,
        removeErrorTip: removeErrorTip,
        isValidNum: isValidNum,
        isValidCall: isValidCall
    };
};
var checkObj = getCheckObject();

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
    var shipNum = document.getElementById("number");
    var shipCall = document.getElementById("call-sign");
    shipNum.addEventListener('blur', function (event) {
        if (!checkObj.isValidNum(shipNum.value)) {
            checkObj.addErrorTip(shipNum, 'number');
        }
    }, false);
    shipNum.addEventListener('focus', function (event) {
        checkObj.removeErrorTip(shipNum, 'number');
    }, false);
    shipCall.addEventListener('blur', function (event) {
        if (!checkObj.isValidCall(shipCall.value)) {
            checkObj.addErrorTip(shipCall, 'call_sign');
        }
    }, false);
    shipCall.addEventListener('focus', function (event) {
        checkObj.removeErrorTip(shipCall, 'call_sign');
    }, false);
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
function addShipSubmitCheck() {
    var addShip = document.getElementById("add-ship");
    var inputList = addShip.getElementsByTagName('input');
    var i = 0;
    var nullFlag = true;
    var numFlag = true;
    var callFlag = true;

    for (i = 0; i < inputList.length; i++) {
        if (inputList[i].value == "") {
            nullFlag = false;
            checkObj.addErrorTip(inputList[i]);
        } else if (inputList[i].name === "number") {
            numFlag = checkObj.isValidNum(inputList[i].value);
            if (!numFlag) {
                checkObj.addErrorTip(inputList[i], 'number');
                event.preventDefault();
            }
        } else if (inputList[i].name === "call_sign") {
            callFlag = checkObj.isValidCall(inputList[i].value);
            if (!callFlag) {
                checkObj.addErrorTip(inputList[i], 'call_sign');
                event.preventDefault();
            }
        }
    }
    return (nullFlag && numFlag && callFlag);
}
function addShipSubmit() {
    if(!addShipSubmitCheck()){
        return;
    }
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