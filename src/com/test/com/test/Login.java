package com.test.com.test;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

/**
 * Created by Administrator on 2016/2/24 0024.
 */
public class Login {
    public  static  boolean checkUser(String name,String pwd) throws SQLException {
        Connection conn = null;
        String sql;
        String url = "jdbc:mysql://localhost:3306/test?user=root&password=";
        boolean flag = false;
        try {
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection(url);
            Statement stmt = conn.createStatement();
            sql = "select * from login";
            ResultSet rs = stmt.executeQuery(sql);
            while(rs.next()){
                if(rs.getString(1).equals(name)){
                    if(rs.getString(2).equals(pwd)) {
                        flag = true;
                        break;
                    }
                }
            }
        }
        catch (SQLException e){
            e.printStackTrace();
        }
        catch (Exception e){
            e.printStackTrace();
       }
       finally {
           conn.close();
       }
        return flag;
    }


}
