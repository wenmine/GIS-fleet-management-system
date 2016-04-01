/**
 * Created by Administrator on 2016/3/14.
 */
//封装form表单验证
var getCheckObject = function () {
    var tipNum = document.createElement("span");
    tipNum.className = "error";
    tipNum.appendChild(document.createTextNode("必须为9位数字"));
    var tipCall = document.createElement("span");
    tipCall.className = "error";
    tipCall.appendChild(document.createTextNode("必须为4位大写字母"));
    var tipEnglishName = document.createElement("span");
    tipEnglishName.className = "error";
    tipEnglishName.appendChild(document.createTextNode("格式错误！"));
    function addErrorTip(node, name) {

        if (name === "Official_Number") {
            node.parentNode.appendChild(tipNum);
        } else if (name === "Call_Sign") {
            node.parentNode.appendChild(tipCall);
        } else if (name === "LONG" || name === "LAT") {

        } else if (name === "English_Name") {
            node.parentNode.appendChild(tipEnglishName);
        } else {
            if (node.parentNode.lastChild.className === "error") {
                return;
            }
            var tipOther = document.createElement("span");
            tipOther.className = "error";
            tipOther.appendChild(document.createTextNode("不能为空"));
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
        var reg = new RegExp("^[A-Z]{4}$");
        var hasEnouthUpper = reg.test(callvalue);
        return hasEnouthUpper;
    }

    function isValidEnglishName(englishnamevalue) {
        var reg = new RegExp("^[a-zA-Z 0-9]+$");
        var hasOnlyLetter = reg.test(englishnamevalue);
        return hasOnlyLetter;
    }

    return {
        addErrorTip: addErrorTip,
        removeErrorTip: removeErrorTip,
        isValidNum: isValidNum,
        isValidCall: isValidCall,
        isValidEnglishName: isValidEnglishName
    };
};
var checkObj = getCheckObject();

//每次打开对话框时将里面的表单原先的值清空
function clearForm(obj) {
    var objId = document.getElementById(obj);
    if (objId == undefined) {
        return;
    }
    for (var i = 0; i < objId.elements.length; i++) {
        if (objId.elements[i].type == "text") {
            objId.elements[i].value = "";
            objId.elements[i].removeAttribute("readOnly");
        }
        else if (objId.elements[i].type == "password") {
            objId.elements[i].value = "";
            objId.elements[i].removeAttribute("readOnly");
        }
        else if (objId.elements[i].type == "radio") {
            objId.elements[i].checked = false;
            objId.elements[i].removeAttribute("readOnly");
        }
        else if (objId.elements[i].type == "checkbox") {
            objId.elements[i].checked = false;
            objId.elements[i].removeAttribute("readOnly");
        }
        else if (objId.elements[i].type == "select-one") {
            objId.elements[i].options[0].selected = true;
            objId.elements[i].removeAttribute("readOnly");
        }
        else if (objId.elements[i].type == "select-multiple") {
            for (var j = 0; j < objId.elements[i].options.length; j++) {
                objId.elements[i].options[j].selected = false;
                objId.elements[i].removeAttribute("readOnly");
            }
        }
        else if (objId.elements[i].type == "textarea") {
            objId.elements[i].value = "";
            objId.elements[i].removeAttribute("readOnly");

        }
    }
}
//添加\移除错误信息,当窗口打开时，onblur和onfocus的表单验证
function iterateInputAddFocusListener() {
    var addShip = document.getElementById("add-ship");
    var inputList = addShip.getElementsByTagName('input');
    var i = 0;
    var shipNum = document.getElementById("number");
    var shipCall = document.getElementById("call-sign");
    var EnglishName = document.getElementById("english-name");
    shipNum.onblur = function () {
        if (!checkObj.isValidNum(shipNum.value)) {
            checkObj.addErrorTip(shipNum, 'Official_Number');
        }
    };
    shipNum.onfocus = function () {
        checkObj.removeErrorTip(shipNum);
    };
    shipCall.onblur = function () {
        if (!checkObj.isValidCall(shipCall.value)) {
            checkObj.addErrorTip(shipCall, 'Call_Sign');
        }
    };
    shipCall.onfocus = function () {
        checkObj.removeErrorTip(shipCall);
    };
    EnglishName.onblur = function () {
        if (!checkObj.isValidEnglishName(EnglishName.value)) {
            checkObj.addErrorTip(EnglishName, 'English_Name');
        }
    };
    EnglishName.onfocus = function () {
        checkObj.removeErrorTip(EnglishName);
    };

    for (i = 0; i < inputList.length; i++) {
        checkObj.removeErrorTip(inputList[i]);
        if (inputList[i].name === "Official_Number" ||
            inputList[i].name === "Call_Sign" || inputList[i].name == "LONG" || inputList[i].name == "LAT" || inputList[i].name == "English_Name") {
            continue;
        } else {
            inputList[i].onfocus = function () {
                checkObj.removeErrorTip(this);
            };
            inputList[i].onblur = function () {
                if (this.value == "") {
                    nullFlag = false;
                    checkObj.addErrorTip(this);
                }
            }
        }
    }
}

//function wOpen() {
//    if(document.getElementById("add-ship").style.display == "block"){
//        clearForm();
//    }else{
//        document.getElementById("add-ship").style.display = "block";
//    }
//    iterateInputAddFocusListener();
//}
function wClose(that) {
    that.parentNode.parentNode.style.display = "none";
    clearForm("add-ship-form");
}
function wSeeClose(that) {
    document.getElementById("add-ship").style.display = "none";
    if (document.getElementById("addShipSubmit").style.display == "none") {
        document.getElementById("addShipSubmit").style.display = "block";
    }
    document.getElementById("close-see").style.display = "none";
    clearForm("add-ship-form");
}
function addShipToBox(tt) {
    var shipNum = $("#number");
    var chineseName = $("#chinese-name");
    var englishName = $("#english-name");
    var callSign = $("#call-sign");
    var shipKind = $("#ship-kind");
    var shipFlag = $("#ship-flag");
    var shipOwner = $("#ship-owner");
    var shipPort = $("#ship-port");
    var shipLong = $("#long");
    var shiplat = $("#lat");
    var json = eval(tt); //数组
    shipNum.val(json.Official_Number);
    chineseName.val(json.Chinese_Name);
    englishName.val(json.English_Name);
    callSign.val(json.Call_Sign);
    shipKind.val(json.Type);
    shipFlag.val(json.Flag);
    shipOwner.val(json.Owner);
    shipPort.val(json.Port_Registry);
    shipLong.val(json.LONG);
    shiplat.val(json.LAT);
}

function updateShipList(data) {
    var list = "";
    if (data.length <= 0) {
        list = "<li onclick='stopEvent(event)' class='ship-none'><a>暂无船队</a></li>"
    } else {
        $.each(data, function (index, element) {
            list += "<li  class=‘fleetInfo’ data-id=" + element.Official_Number + " onclick='stopEvent(event)'>";
            list += "<a>" + element.Official_Number + "</a>";
            list += "<span class='edit' data-id=" + element.Official_Number + "></span>";
            list += "<span class='del' data-id=" + element.Official_Number + "></span>";
            list += "<input type='hidden' name='LONG' class='fleet-long' value=" + element.LONG + " />";
            list += "<input type='hidden' name='LAT' class='fleet-lat' value=" + element.LAT + " />";
            list += "</li>";
        });
    }
    $("#submenu-one1").html(list);
    shipListOperate();
}

$("#left-one2").click(function (event) {
    $("#popup-top").html("添加船舶" + " <span id='btnclose' class='btnclose' onclick='wClose(this)'></span>");
    document.getElementById("ship-warn").style.display = "block";
    document.getElementById("ship-warn").innerHTML = "登记号为唯一值，不可修改,请谨慎填写!";
    clearForm("add-ship-form");
    $("#add-ship").show();
    iterateInputAddFocusListener();
    stopEvent(event);
});
function shipListOperate() {
    $('#submenu-one1 li:not(.ship-none)').dblclick(function (event) {
        document.getElementById("ship-warn").style.display = "none";
        document.getElementById("addShipSubmit").style.display = "none";
        document.getElementById("close-see").style.display = "block";
        stopEvent(event);
        var me = $(this);
        var id = me.attr("data-id");
        $("#id").val(id);
        $.ajax({
            url: basePath + "/editajax",
            type: 'post',
            data: {
                Official_Number: id
            },
            dataType: 'json',
            timeout: 1000,
            cache: false,
            error: erryFunction,  //错误执行方法
            success: addShipToBox //成功执行方法
        });
        function erryFunction() {
            alert("error");
        }

        $('#add-ship-form input').attr("readonly", "readonly");
        $("#add-ship").show();

    });

    $(".edit").click(function (event) {
        $("#popup-top").html("修改船舶" + " <span id='btnclose' class='btnclose' onclick='wClose(this)'></span>");
        document.getElementById("ship-warn").style.display = "block";
        document.getElementById("ship-warn").innerHTML = "登记号为唯一值，不可修改!";
        var me = $(this);
        var id = me.attr("data-id");
        $("#id").val(id);
        $.ajax({
            url: basePath + "/editajax",
            contentType: "application/x-www-form-urlencoded; charset=GBK",
            type: 'post',
            data: {
                Official_Number: id
            },
            dataType: 'json',
            timeout: 1000,
            cache: false,
            error: erryFunction,  //错误执行方法
            success: addShipToBox //成功执行方法
        });
        function erryFunction() {
            alert("error");
        }

        $("#add-ship").show();
        $("#number").attr("readonly", "readonly");
        stopEvent(event);
    });
    /*删除*/
    $(".del").click(function (event) {
        stopEvent(event);
        var me = $(this);
        var id = me.attr("data-id");
        console.log("delete");
        $.ajax({
            type: "post",
            url: basePath + "/delajax",
            dataType: "json",
            contentType: "application/x-www-form-urlencoded; charset=GBK",
            data: {
                Official_Number: id
            },
            success: updateShipList,
            error: function (data) {
                alert(data);
            }
        });
    });
}
shipListOperate();
//提交时表单验证
function addShipSubmitCheck() {
    var addShip = document.getElementById("add-ship");
    var inputList = addShip.getElementsByTagName('input');
    var i = 0;
    var nullFlag = true;
    var numFlag = true;
    var callFlag = true;
    for (i = 0; i < inputList.length; i++) {
        if (inputList[i].name === "Official_Number") {
            numFlag = checkObj.isValidNum(inputList[i].value);
            if (!numFlag) {
                checkObj.addErrorTip(inputList[i], 'Official_Number');
                event.preventDefault();
            }
        } else if (inputList[i].name === "Call_Sign") {
            callFlag = checkObj.isValidCall(inputList[i].value);
            if (!callFlag) {
                checkObj.addErrorTip(inputList[i], 'Call_Sign');
                event.preventDefault();
            }
        } else if (inputList[i].name == "LONG" || inputList[i].name === "LAT") {

        } else if (inputList[i].value == "") {
            nullFlag = false;
            checkObj.addErrorTip(inputList[i]);
        }
    }
    return (nullFlag && numFlag && callFlag);
}

//验证后提交到数据库中
function addShipSubmit() {
    if (!addShipSubmitCheck()) {
        return;
    }
    $.ajax({
        type: "post",
        url: basePath + "/addajax",
        contentType: "application/x-www-form-urlencoded; charset=GBK",
        data: $("#add-ship-form").serialize(),
        dataType: "json",
        success: updateShipList,
        error: function (data) {
            alert("error");
        }
    });
    $("#add-ship").hide();
    //addShipInfoToList();
    clearForm("add-ship-form");
}
$(document).ready(function () {
    $(".fleetInfo").each(function (index) {
        var This = $(this);
        console.log(This.find("input").first().html());
    })
});