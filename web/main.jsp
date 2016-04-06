<%@ page import="java.util.Map" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="com.test.com.test.EditBoats" %>
<%@ page import="com.test.com.test.EditGeo" %>
<%@ page import="com.test.com.test.EditAlert" %>
<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2016/3/24
  Time: 10:17
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
    List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
    list = EditBoats.read();
    List<Map<String, Object>> geolist = new ArrayList<Map<String, Object>>();
    geolist = EditGeo.read();
    List<Map<String, Object>> alertlist = new ArrayList<Map<String, Object>>();
    alertlist = EditAlert.read();
%>
<html>
<head>
    <title>GIS船队管理系统</title>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/ol.css" type="text/css">
    <script src="js/jquery-1.12.1.min.js"></script>
    <script src="js/main.js"></script>
    <script>
        var basePath = "<%=basePath%>";
    </script>
</head>
<body onbeforeunload="check()">
<div id="header" class="header">
    <div class="header-span"></div>
    <div class="logo"></div>
    <div id="tab1" class="tab1">
        <div class="menu">
            <ul class="header-nav">
                <li id="one1" onclick="setOn('one',1)" class="on"><a href="#">船舶管理</a></li>
                <li id="one2" onclick="setOn('one',2)"><a href="#">标绘地图</a></li>
                <li id="one3" onclick="setOn('one',3)"><a href="#">报警设置</a></li>
            </ul>
        </div>
    </div>
    <div class="header-foot"></div>
</div>
<div class="content" id="con-one-1">
    <div id="left-menu" class="left-menu">
        <ul id="left-nav1" class="left-nav1">
            <li id="left-one1" class="list-title-down" onclick="setUnflod('left-nav1','one',1)"><a><span
                    class="icon"></span>我的船队</a>
                <ul id="submenu-one1" class="left-one-submenu" style="display: block">

                    <%
                        if (list == null || list.isEmpty()) {
                    %>
                    <li onclick="stopEvent(event)"><a class="ship-none">暂无船队</a></li>
                    <%
                    } else {
                        for (Map<String, Object> stringObjectMap : list) {
                    %>
                    <li class="fleetInfo" data-id="<%=stringObjectMap.get("Official_Number")%>"
                        onclick="stopEvent(event)">
                        <a data-id="<%=stringObjectMap.get("Official_Number")%>"><%=stringObjectMap.get("Official_Number")%>
                        </a>
                        <span class="fleet-edit edit" data-id="<%=stringObjectMap.get("Official_Number")%>"></span>
                        <span class="fleet-del del" data-id="<%=stringObjectMap.get("Official_Number")%>"></span>
                        <input type="hidden" name="LONG" class="fleet-long" value="<%=stringObjectMap.get("LONG")%>"/>
                        <input type="hidden" name="LAT" class="fleet-lat" value="<%=stringObjectMap.get("LAT")%>"/>
                    </li>
                    <%
                            }
                        }
                    %>
                </ul>
            </li>
            <li id="left-one2" class="list-title-up"><a><span class="icon"></span>添加船舶</a></li>
        </ul>
        <ul id="left-nav2" class="left-nav1 left-nav2">
            <li id="left-two1" onclick="init('left-nav2','two',1)" class="list-title-up"><a><span
                    class="icon"></span>添加标注</a>
                <ul id="submenu-two1" class="left-one-submenu" onclick="stopEvent(event)">
                    <select id="drawtype" class="drawtype" onclick="stopEvent(event)">
                        <option value="None" selected="selected">None</option>
                        <option value="Point">点</option>
                        <option value="LineString">线</option>
                        <option value="Polygon">面</option>
                    </select>
                </ul>
            </li>
            <li id="left-two2" onclick="init('left-nav2','two',2)" class="list-title-up"><a><span class="icon"></span>标绘信息管理</a>
                <ul id="submenu-two2" class="left-one-submenu">
                    <%
                        if (list == null || list.isEmpty()) {
                    %>
                    <li onclick="stopEvent(event)"><a class="mark-none">暂无标注</a></li>
                    <%
                    } else {
                        for (Map<String, Object> stringObjectMap : geolist) {
                    %>
                    <li class="markInfo" data-id="<%=stringObjectMap.get("Id")%>" data-type="<%=stringObjectMap.get("Type")%>"
                        data-name="<%=stringObjectMap.get("Name")%>" data-coord="<%=stringObjectMap.get("Geo")%>"
                        onclick="stopEvent(event)">
                        <a data-id="<%=stringObjectMap.get("Id")%>"><%=stringObjectMap.get("Name")%>
                        </a>
                        <span class="mark-del del" data-id="<%=stringObjectMap.get("Id")%>"></span>
                    </li>
                    <%
                            }
                        }

                    %>
                </ul>
            </li>
            <li id="left-two3" onclick="measureInit('left-nav2','two',3)" class="list-title-up"><a><span
                    class="icon"></span>测距</a>
                <ul id="submenu-two3" class="left-one-submenu" onclick="stopEvent(event)">
                    <select id="testtype" class="drawtype" onclick="stopEvent(event)">
                        <option value="None" selected="selected">None</option>
                        <option value="length">直线测距</option>
                        <option value="area">面积测距</option>
                    </select>
                </ul>
            </li>
        </ul>
        <ul id="left-nav3" class="left-nav1 left-nav2">
            <li id="left-three1" class="list-title-up" onclick="warnInit('left-nav3','three',1)"><a><span
                    class="icon"></span>设置报警区域</a>
                <ul id="submenu-three1" class="left-one-submenu" onclick="stopEvent(event)">
                    <select id="warntype" class="drawtype" onclick="stopEvent(event)">
                        <option value="None" selected="selected">None</option>
                        <option value="Polygon">设置区域面</option>
                    </select>
                </ul>
            </li>
            <li id="left-three2" onclick="init('left-nav3','three',2)" class="list-title-up"><a><span class="icon"></span>报警区域管理</a>
                <ul id="submenu-three2" class="left-one-submenu">
                    <%
                        if (list == null || list.isEmpty()) {
                    %>
                    <li onclick="stopEvent(event)"><a class="warn-none">暂无设置区域</a></li>
                    <%
                    } else {
                        for (Map<String, Object> stringObjectMap : alertlist) {
                    %>
                    <li class="warnInfo" data-id="<%=stringObjectMap.get("Id")%>" data-name="<%=stringObjectMap.get("Name")%>"
                        data-coord="<%=stringObjectMap.get("Geo")%>" onclick="stopEvent(event)">
                        <a data-id="<%=stringObjectMap.get("Id")%>"><%=stringObjectMap.get("Name")%>
                        </a>
                        <span class="warn-del del" data-id="<%=stringObjectMap.get("Id")%>"></span>
                    </li>
                    <%
                            }
                        }

                    %>
                </ul>
            </li>
            <li id="left-three3" class="list-title-up"><a><span class="icon"></span>区域提醒</a></li>
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
                <p id="ship-warn">登记号为唯一值，不可修改,请谨慎填写!</p>
                <div><label>船舶登记号：</label> <input type="text" name="Official_Number" id="number" required="required"
                                                  placeholder="只能为9位数字" maxlength="9"/>
                </div>
                <div><label>中文船名：</label><input type="text" name="Chinese_Name" id="chinese-name" required="required"/>
                </div>
                <div><label>英文船名：</label> <input type="text" name="English_Name" id="english-name" required="required"
                                                 placeholder="只能由英文、数字和下划线组成"/>
                </div>
                <div><label>船舶呼号：</label> <input type="text" name="Call_Sign" id="call-sign" required="required"
                                                 placeholder="只能为4位大写字母" maxlength="4"/></div>
                <div><label>船舶种类：</label> <input type="text" name="Type" id="ship-kind" required="required"/></div>
                <div><label>船旗国：</label> <input type="text" name="Flag" id="ship-flag" required="required"/></div>
                <div><label>船舶拥有者：</label><input type="text" name="Owner" id="ship-owner" required="required"/></div>
                <div><label>船籍港：</label><input type="text" name="Port_Registry" id="ship-port" required="required"/>
                </div>
                <input type="hidden" name="LONG" id="long"/>
                <input type="hidden" name="LAT" id="lat"/>
            </form>
            <input type="button" value="提交" id="addShipSubmit" class="btn" OnClick="addShipSubmit()"/>
            <input type="button" value="关闭" id="close-see" class="btn" onclick="wSeeClose()">
        </div>
    </div>
    <div id="measure-popup" class="measure-popup">
        <div id="measure-popup-top" class="popup-top">
            测距
            <span class="btnclose" onclick="wClose(this)"></span>
        </div>
        <p id="measureOutput"></p>
    </div>
    <div id="mark-popup">
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
    <div id="warn-popup">
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
<script type="text/javascript" src="js/ol-debug.js"></script>
<script type="text/javascript" src="js/map.js"></script>
<script type="text/javascript" src="js/fleetmap.js"></script>
<script type="text/javascript" src="js/markmap.js"></script>
<script src="js/fleet.js"></script>
<script type="text/javascript" src="js/measuremap.js"></script>
<script type="text/javascript" src="js/warnmap.js"></script>
<script src="js/drag.js"></script>
</body>
</html>
