/**
 * Created by Administrator on 2016/3/14.
 */
    //封装form表单验证
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
            if (node.parentNode.lastChild.className === "error") {
                return;
            }
            var tipOther = document.createElement("span");
            tipOther.className = "error";
            tipOther.appendChild(document.createTextNode("输入框不能为空"));
            node.parentNode.appendChild(tipOther);
        }
    }

    function removeErrorTip(node) {
        if (node.parentNode.lastChild.className === "error") {
            node.parentNode.removeChild(node.parentNode.lastChild);
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

//每次打开对话框时将里面的表单原先的值清空
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
//添加\移除错误信息
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

//提交时表单验证
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
class ShipInfo {
    constructor(number, chinese_name, english_name, call_sign,
                ship_kind, ship_flag, ship_owner, ship_port) {
        this.number = number;
        this.chinese_name = chinese_name;
        this.english_name = english_name;
        this.call_sign = call_sign;
        this.ship_kind = ship_kind;
        this.ship_flag = ship_flag;
        this.ship_owner = ship_owner;
        this.ship_port = ship_port;
    }
}
var shipMap = new Map();
function createShipObj(){
    var shipNumValue= document.getElementById("number").value;
    var chineseNameValue= document.getElementById("chinese-name").value;
    var englishNameValue= document.getElementById("english-name").value;
    var callSignValue= document.getElementById("call-sign").value;
    var shipKindValue= document.getElementById("ship-kind").value;
    var shipFlagValue= document.getElementById("ship-flag").value;
    var shipOwnerValue= document.getElementById("ship-owner").value;
    var shipPortValue= document.getElementById("ship-port").value;
    var shipObj = new ShipInfo(shipNumValue,chineseNameValue,englishNameValue,callSignValue,
        shipKindValue,shipFlagValue,shipOwnerValue,shipPortValue);
    shipMap.set(shipNumValue,shipObj);
}
function addShipInfoToList(){
    createShipObj();
    var shipElement = document.createElement("li");
    var shipA = document.createElement("a");
    var shipSpan1 = document.createElement("span");
    var shipSpan2 = document.createElement("span");
    var shipList = document.getElementById("submenu-one1");
    var shipNumValue= document.getElementById("number").value;
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
    shipA.innerHTML =shipNumValue;
    if (shipElement) {
        shipElement.onclick = function () {
            stopEvent(event);
        };
    }
    if (shipSpan1) {
        shipSpan1.onclick = function () {
            editShipHandler(shipNumValue, event);
        };
    }
    if (shipSpan2) {
        shipSpan2.onclick = function () {
            delShipHandler(shipElement, event);
        };
    }
}
//验证后更新信息到我的船队中
function addShipSubmit() {
    if (!addShipSubmitCheck()) {
        return;
    }
    document.getElementById("add-ship").style.display = "none";
    addShipInfoToList();
    clearForm();
}