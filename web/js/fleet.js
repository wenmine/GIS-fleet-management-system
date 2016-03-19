/**
 * Created by Administrator on 2016/3/14.
 */
var getCheckObject = function () {
    var tipNum = document.createElement("span");
    tipNum.className = "error";
    tipNum.appendChild(document.createTextNode("必须为9位数字组成"));
    var tipCall = document.createElement("span");
    tipCall.className = "error";
    tipCall.appendChild(document.createTextNode("必须为4位数字组成"));

    function addErrorTip(node, name) {

        if (name === "number") {
            node.parentNode.appendChild(tipNum);
        } else if (name === "call_sign") {
            node.parentNode.appendChild(tipCall);
        } else {
            if (node.nextElementSibling !== null) {
                return;
            }
            var tipOther = document.createElement("span");
            tipOther.className = "error";
            tipOther.appendChild(document.createTextNode("输入框不能为空"));
            node.parentNode.appendChild(tipOther);
        }
    }

    function removeErrorTip(node) {
        if (node.nextElementSibling !== null) {
            node.parentNode.removeChild(node.nextElementSibling);
        }
    }

    function isValidNum(value) {
        var reg = new RegExp("^[0-9]{9}$");
        var hasEnouthDigital = reg.test(value);
        return hasEnouthDigital;
    }

    function isValidCall(callvalue) {
        var reg = new RegExp("^[0-9]{4}$");
        var hasEnouthDigital = reg.test(callvalue);
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
function clearForm() {
    var objId = document.getElementById("add-ship-form");
    if (objId == undefined) {
        return;
    }
    for (var i = 0; i < objId.elements.length; i++) {
        if (objId.elements[i].type == "text") {
            objId.elements[i].value = "";
        }
        else if (objId.elements[i].type == "password") {
            objId.elements[i].value = "";
        }
        else if (objId.elements[i].type == "radio") {
            objId.elements[i].checked = false;
        }
        else if (objId.elements[i].type == "checkbox") {
            objId.elements[i].checked = false;
        }
        else if (objId.elements[i].type == "select-one") {
            objId.elements[i].options[0].selected = true;
        }
        else if (objId.elements[i].type == "select-multiple") {
            for (var j = 0; j < objId.elements[i].options.length; j++) {
                objId.elements[i].options[j].selected = false;
            }
        }
        else if (objId.elements[i].type == "textarea") {
            objId.elements[i].value = "";
        }
    }
}

function iterateInputAddFocusListener() {
    var addShip = document.getElementById("add-ship");
    var inputList = addShip.getElementsByTagName('input');
    var i = 0;
    var shipNum = document.getElementById("number");
    var shipCall = document.getElementById("call-sign");
    shipNum.onblur = function () {
        if (!checkObj.isValidNum(shipNum.value)) {
            checkObj.addErrorTip(shipNum, 'number');
        }
    };
    shipNum.onfocus = function () {
        checkObj.removeErrorTip(shipNum);
    };
    shipCall.onblur = function () {
        if (!checkObj.isValidCall(shipCall.value)) {
            checkObj.addErrorTip(shipCall, 'call_sign');
        }
    };
    shipCall.onfocus = function () {
        checkObj.removeErrorTip(shipCall);
    };
    for (i = 0; i < inputList.length; i++) {
        checkObj.removeErrorTip(inputList[i]);
        if (inputList[i].name === "number" ||
            inputList[i].name === "call_sign") {
            continue;
        } else {
            inputList[i].onfocus = function () {
                checkObj.removeErrorTip(this);
            };
            inputList[i].onblur = function() {
                if (this.value == "") {
                    nullFlag = false;
                    checkObj.addErrorTip(this);
                }
            }
        }
    }
}

function wOpen() {
    document.getElementById("add-ship").style.display = "block";
    $("#add-ship").css("display", "block");
    iterateInputAddFocusListener();
}
function wClose(that) {
    that.parentNode.parentNode.style.display = "none";
    clearForm();
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
        if (inputList[i].name === "number") {
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
        } else if (inputList[i].value == "") {
            nullFlag = false;
            checkObj.addErrorTip(inputList[i]);
        }
    }
    return (nullFlag && numFlag && callFlag);
}
function addShipSubmit() {
    if (!addShipSubmitCheck()) {
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
            shipList.insertBefore(shipElement, shipList.lastChild.nextElementSibling);
    }
    else {
        shipList.appendChild(shipElement);
    }
    shipElement.className = "dynamic-ship-list";
    shipSpan1.className = "edit";
    shipSpan2.className = "del";
    shipElement.appendChild(shipA);
    shipElement.insertBefore(shipSpan1, shipElement.lastChild.nextElementSibling);
    shipElement.insertBefore(shipSpan2, shipElement.lastChild.nextElementSibling);
    num = shipNum.value;
    shipA.innerHTML = shipNum.value;
    if (shipElement) {
        shipElement.onclick = function () {
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
    clearForm();
}