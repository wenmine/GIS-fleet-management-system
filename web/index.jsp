<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2016/2/24
  Time: 9:43
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
  <head>
    <meta charset="UTF-8">
    <title>GIS船队管理系统</title>
    <link rel="stylesheet" href="css/style.css">
  </head>
  <body>
  <h1>GIS船队管理系统</h1>
  <div id="container" class="container">
    <h2>登录</h2>
    <form method="post">
      <div class="user">
        <span class="usr_img"></span>
        <input type="text" name="username" placeholder="用户名" required="required" id="username" class="userinfo" onblur="GetPwdAndChk()"/>
      </div>
      <div class="userpasswd">
        <span class="pwd_img"></span>
        <input type="password" name="password" placeholder="密码" required="required" id="passwd" class="userinfo"/>
      </div>
      <input type="submit" value="登录" id="submit" class="submit" OnClick="SetPwdAndChk()"/>
    </form>
  </div>
  </body>
</html>
