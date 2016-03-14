/**
 * Created by Administrator on 2016/3/14.
 */

function addShipSubmitCheck() {
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

        function removeErrorTip(node, type) {
            node.className = "";
            if (name == "number") {
                node.parentNode.removeChild(tipNum);
            } else if (type == "call_sign") {
                node.parentNode.removeChild(tipCall);
            } else {
                node.parentNode.removeChild(tipOther);
            }
        }

        function isValidNum(value) {
            var reg = new RegExp("^\d{9}$");
            var hasEnouthDigital = reg.test(value);
            if (!hasEnouthDigital) {
                return false;
            } else {
                return true;
            }
        }

        function isValidCall(callvalue) {
            var reg = new RegExp("^\d{4}$");
            var hasEnouthDigital = reg.test(callvalue);
            if (!hasEnouthDigital) {
                return false;
            } else {
                return true;
            }
        }

        return {
            addErrorTip: addErrorTip,
            removeErrorTip: removeErrorTip,
            isValidName: isValidName,
            isValidPassword: isValidPassword
        };
    };

    var checkObj = getCheckObject();
    var addShip = document.getElementById("add-ship");
    var inputList = addShip.getElementsByTagName('input');
    var i = 0;
    //form.addEventListener('submit', function (event) {
    //    if (!checkObj.isValidName(username.value)) {
    //        checkObj.addErrorTip(username, 'username');
    //        event.preventDefault();
    //    }
    //    if (!checkObj.isValidPassword(password.value)) {
    //        checkObj.addErrorTip(password, 'password');
    //        event.preventDefault();
    //    }
    //}, false);

    for (i = 0; i < inputList.length; i++) {
        if (inputList[i].value == "") {
            checkObj.addErrorTip(inputList[i]);
        } else if (inputList[i].name === "number") {
            if (!checkObj.isValidNum(inputList[i].value)) {
                checkObj.addErrorTip(inputList[i], 'number');
                event.preventDefault();

            }
        } else if (inputList[i].name === "call_sign") {
            if (!checkObj.isValidCall(inputList[i].value)) {
                checkObj.addErrorTip(inputList[i], 'call_sign');
                event.preventDefault();

            }
        }

        username.addEventListener('blur', function (event) {
            if (!checkObj.isValidName(username.value)) {
                checkObj.addErrorTip(username, 'username');
            }
        }, false);
        username.addEventListener('focus', function (event) {
            checkObj.removeErrorTip(username, 'username');
        }, false);
        password.addEventListener('blur', function (event) {
            if (!checkObj.isValidPassword(password.value)) {
                checkObj.addErrorTip(password, 'password');
            }
        }, false);
        password.addEventListener('focus', function (event) {
            checkObj.removeErrorTip(password, 'password');
        }, false);

    }
}