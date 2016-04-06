package com.test.com.test;

import java.sql.*;
import java.util.*;

/**
 * Created by Administrator on 2016/4/1 0001.
 */
public class EditGeo {
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
            sql = "select * from geo";
            ResultSet rs = stmt.executeQuery(sql);
            while(rs.next()){
                if(rs.getString(1).equals(n)){
                    flag=stmt.execute("delete from geo where ID=\""+rs.getString(1)+"\"");
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
        sql = "INSERT INTO geo VALUES ('" + s[0] + "','" + s[1] + "'," + s[2] + ","+ s[3] +","+ s[4] +")";
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
        String title[] = new String[]{"Id","Name","Type","Geo"};
        String sql;
        sql="select * from geo";
        Statement stmt = conn.createStatement();
        ResultSet rs = stmt.executeQuery(sql);
        List<Map<String,  Object>> list = new ArrayList<Map<String, Object>>();
        while(rs.next()){
            Map<String,Object>map=new HashMap<String,Object>();
            for(int i=1;i<6;i++) {
                if(i<3){
                    map.put(title[i - 1], rs.getString(i));
                }
                else if(rs.getString(i) !=null){
                    String type = new String();
                    switch(i){
                        case 3:sql="SELECT Astext(Pnt) From geo WHERE ID = \""+rs.getString(1)+"\"";
                            type="Point";
                            break;
                        case 4:sql="SELECT Astext(Line) From geo WHERE ID = \""+rs.getString(1)+"\"";
                            type="LineString";
                            break;
                        case 5:sql="SELECT Astext(Pgn) From geo WHERE ID = \""+rs.getString(1)+"\"";
                            type="Polygon";
                            break;
                    }
                    Statement st = conn.createStatement();
                    ResultSet rf = st.executeQuery(sql);
                    rf.next();
                    String s = rf.getString(1);
                    String s1 = s.replaceAll("[a-zA-Z]+","").replace("(","").replace(")","");
                    map.put(title[2],type);
                    map.put(title[3],s1);
                    break;
                }
            }
            list.add(map);
        }
        return list;
    }
}
