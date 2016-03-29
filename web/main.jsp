<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2016/3/24
  Time: 10:17
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/ol.css" type="text/css">
    <script src="js/jquery-1.12.1.min.js"></script>
    <script src="js/main.js"></script>
    <script src="js/fleet.js"></script>
</head>
<body onbeforeunload="check()">
<div id="header" class="header">
    <div class="header-span"></div>
    <div class="logo"></div>
    <div id="tab1" class="tab1">
        <div class="menu">
            <ul class="header-nav">
                <li id="one1" onclick="setOn('one',1)" class="on"><a href="#">地图查看</a></li>
                <li id="one2" onclick="setOn('one',2)"><a href="#">船舶管理</a></li>
                <li id="one3" onclick="setOn('one',3)"><a href="#">标绘地图</a></li>
                <li id="one4" onclick="setOn('one',4)"><a href="#">报警设置</a></li>
            </ul>
        </div>
    </div>
    <div class="header-foot"></div>
</div>
<div class="content" id="con-one-1">
    <div id="left-menu" class="left-menu">
        <ul id="left-nav0" class="left-nav1">
            <li id="left-one1" class="list-title-down" onclick="setUnflod('left-nav0','one',1)"><a><span
                    class="icon"></span>我的船队</a>
                <ul id="submenu-one1" class="left-one-submenu" style="display: block">
                    <li onclick="stopEvent(event)"><a>暂无船队</a><span class="edit"></span><span class="del"></span></li>
                    <%--<c:forEach items="${paginate.dataList}" var="record">--%>
                        <%--<li data-id="${record.get("Official_Number")}" onclick="stopEvent(event)">--%>
                            <%--<a>${record.get("Official_Number")}</a><span class="edit"--%>
                                                                         <%--data-id="${record.get("Official_Number")}"></span><span--%>
                                <%--class="del" data-id="${record.get("Official_Number")}"></span></li>--%>
                    <%--</c:forEach>--%>
                </ul>
            </li>
        </ul>
        <ul id="left-nav1" class="left-nav1 left-nav2">
            <li id="left-two1" onclick="wOpen()" class="list-title-up"><a><span class="icon"></span>添加船舶</a></li>
            <li id="left-two2" class="list-title-up"><a><span class="icon"></span>删除船舶</a></li>
        </ul>
        <ul id="left-nav2" class="left-nav1 left-nav2">
            <li id="left-three1" onclick="init('left-nav2','three',1)" class="list-title-up"><a><span
                    class="icon"></span>添加标注</a>
                <ul id="submenu-three1" class="left-one-submenu" onclick="stopEvent(event)">
                    <select id="drawtype" class="drawtype" onclick="stopEvent(event)">
                        <option value="None" selected="selected">None</option>
                        <option value="Point">点</option>
                        <option value="LineString">线</option>
                        <option value="Polygon">面</option>
                    </select>
                </ul>
            </li>
            <li id="left-three2" onclick="init('left-nav2','three',2)" class="list-title-up"><a><span class="icon"></span>标绘信息管理</a>
                <ul id="submenu-three2" class="left-one-submenu" >
                    <li onclick="stopEvent(event)"><a>暂无标注</a><span class="edit"></span><span class="del"></span></li>
                    <%--<c:forEach items="${paginate.dataList}" var="record">--%>
                    <%--<li data-id="${record.get("Official_Number")}" onclick="stopEvent(event)">--%>
                    <%--<a>${record.get("Official_Number")}</a><span class="edit"--%>
                    <%--data-id="${record.get("Official_Number")}"></span><span--%>
                    <%--class="del" data-id="${record.get("Official_Number")}"></span></li>--%>
                    <%--</c:forEach>--%>
                </ul>
            </li>
            <li id="left-three3" onclick="init('left-nav2','three',3)" class="list-title-up"><a><span
                    class="icon"></span>测距</a>
                <ul id="submenu-three3" class="left-one-submenu" onclick="stopEvent(event)">
                    <select id="testtype" class="drawtype" onclick="stopEvent(event)">
                        <option value="None" selected="selected">None</option>
                        <option value="length">直线测距</option>
                        <option value="area">面积测距</option>
                    </select>
                </ul>
            </li>
        </ul>
        <ul id="left-nav3" class="left-nav1 left-nav2">
            <li id="left-four1" class="list-title-up" onclick="warnInit('left-nav3','four',1)"><a><span class="icon"></span>设置报警区域</a>
                <ul id="submenu-four1" class="left-one-submenu" onclick="stopEvent(event)">
                    <select id="warntype" class="drawtype" onclick="stopEvent(event)">
                        <option value="None" selected="selected">None</option>
                        <option value="Polygon">设置区域面</option>
                    </select>
                </ul>
            </li>
            <li id="left-four2" class="list-title-up"><a><span class="icon"></span>报警区域管理</a></li>
            <li id="left-four3" class="list-title-up"><a><span class="icon"></span>区域提醒</a></li>
        </ul>

    </div>
    <div class="layer-change-switch" id="switch">
    </div>
    <div id="map" class="map">
        <div id="location"></div>
    </div>
    <div id="add-ship" class="add-ship">
        <div class="popup-top" id="popup-top">
            添加船舶
            <span id="btnclose" class="btnclose" onclick="wClose(this)"></span>
        </div>
        <div id="add-ship-content">
            <form method="post" id="add-ship-form">
                <div><label>船舶登记号：</label> <input type="text" name="Official_Number" id="number" required="required"
                                                  placeholder="必须为9位数字"/></div>
                <div><label>中文船名：</label><input type="text" name="Chinese_Name" id="chinese-name" required="required"/>
                </div>
                <div><label>英文船名：</label> <input type="text" name="English_Name" id="english-name" required="required"/>
                </div>
                <div><label>船舶呼号：</label> <input type="text" name="Call_Sign" id="call-sign" required="required"
                                                 placeholder="必须为4位大写字母"/></div>
                <div><label>船舶种类：</label> <input type="text" name="Type" id="ship-kind" required="required"/></div>
                <div><label>船旗国：</label> <input type="text" name="Flag" id="ship-flag" required="required"/></div>
                <div><label>船舶拥有者：</label><input type="text" name="Owner" id="ship-owner" required="required"/></div>
                <div><label>船籍港：</label><input type="text" name="Port_Registry" id="ship-port" required="required"/>
                </div>
                <input type="hidden" name="LONG" id="long"/>
                <input type="hidden" name="LAT" id="lat"/>
            </form>
            <input type="submit" value="提交" id="addShipSubmit" class="btn" OnClick="addShipSubmit()"/>
        </div>
    </div>
    <div id="measure-popup" class="measure-popup">
        <div id="measure-popup-top" class="popup-top">
            测距
            <span class="btnclose" onclick="wClose(this)"></span>
        </div>
        <p id="measureOutput"></p>
    </div>
    <div id="mark-popup" >
        <div id="mark-popup-top" class="popup-top">
            标注
            <span class="btnclose" onclick="markClose(this)"></span>
        </div>
        <div class="mark-content">
            <form method="post">
                <label>名称:</label><input type="text" name="Mark_Name" id="mark-name" required="required" value="未命名标注">
                <input type="button" value="保存" id="mark-name-save">
            </form>
        </div>
    </div>
    <div id="warn-popup" >
        <div id="warn-popup-top" class="popup-top">
            报警区域名称
            <span class="btnclose" onclick="warnClose(this)"></span>
        </div>
        <div class="warn-content">
            <form method="post">
                <label>名称:</label><input type="text" name="Warn_Name" id="warn-name" required="required" value="未命名">
                <input type="button" value="保存" id="warn-name-save">
            </form>
        </div>
    </div>
</div>
<script src="js/ol-debug.js" type="text/javascript"></script>
<script type="text/javascript" src="js/map.js"></script>
<script type="text/javascript" src="js/markmap.js"></script>
<script type="text/javascript" src="js/fleetmap.js"></script>
<script src="js/drag.js"></script>
</body>
</html>
