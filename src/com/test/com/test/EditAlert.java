package com.test.com.test;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2016/4/6 0006.
 */
public class EditAlert {
    //链接数据库
    public static Connection getconn(){
        Connection conn = null;
        String url = "jdbc:mysql://localhost:3306/test?user=root&password=940504&useUnicode=true&characterEncoding=UTF8";
        try {
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection(url);
        }
        catch (SQLException e){
            e.printStackTrace();
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return conn;
    }

    //删除数据
    public  static  boolean delete(String n) throws SQLException {
        Connection conn = getconn();
        String sql;
        boolean flag = false;
        try {
            Statement stmt = conn.createStatement();
            sql = "select * from alert";
            ResultSet rs = stmt.executeQuery(sql);
            while(rs.next()){
                if(rs.getString(1).equals(n)){
                    flag=stmt.execute("delete from alert where ID=\""+rs.getString(1)+"\"");
                    break;
                }
            }
        }
        catch (SQLException e){
            e.printStackTrace();
        }
        finally {
            conn.close();
        }
        return flag;
    }

    //添加数据
    public  static boolean add(String[] s) throws SQLException {
        Connection conn = getconn();
        String sql;
        int i = 0;
        PreparedStatement pstmt;
        boolean flag = false;
        sql = "INSERT INTO alert VALUES ('" + s[0] + "','" + s[1] + "'," + s[2] + ")";
        try {
            pstmt = conn.prepareStatement(sql);
            i = pstmt.executeUpdate();
            if (i == 1)
                flag = true;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return flag;
    }


    //读取数据库
    public static List<Map<String, Object>> read() throws SQLException{
        Connection conn=getconn();
        String title[] = new String[]{"Id","Name","Geo"};
        String sql;
        sql="select * from alert";
        Statement stmt = conn.createStatement();
        ResultSet rs = stmt.executeQuery(sql);
        List<Map<String,  Object>> list = new ArrayList<Map<String, Object>>();
        while(rs.next()){
            Map<String,Object>map=new HashMap<String,Object>();
            for(int i=1;i<4;i++) {
                if(i<3){
                    map.put(title[i - 1], rs.getString(i));
                }
                else{
                    sql="SELECT Astext(Pgn) From alert WHERE ID = \""+rs.getString(1)+"\"";
                    Statement st = conn.createStatement();
                    ResultSet rf = st.executeQuery(sql);
                    rf.next();
                    String s = rf.getString(1);
                    String s1 = s.replaceAll("[a-zA-Z]+","").replace("(","").replace(")","");
                    map.put(title[2],s1);
                    break;
                }
            }
            list.add(map);
        }
        return list;
    }
}
