import com.test.com.test.Login;

import javax.swing.*;
import java.io.IOException;
import java.sql.*;

/**
 * Created by Administrator on 2016/2/24 0024.
 */

public class LoginServlet extends javax.servlet.http.HttpServlet {
    protected void doPost(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {

        String name = request.getParameter("username");
        String pwd = request.getParameter("password");
        try {
            if (!Login.checkUser(name, pwd)){
                JOptionPane.showMessageDialog(null, "用户名或密码错误！", "警告", JOptionPane.ERROR_MESSAGE);
                response.sendRedirect("wmbs.html");
            }
            else
                response.sendRedirect("main.html");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    protected void doGet(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {

    }
}
