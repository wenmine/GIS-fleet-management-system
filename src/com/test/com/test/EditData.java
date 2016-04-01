package com.test.com.test;

import net.sf.json.JSONArray;

import java.sql.*;
import java.util.*;

/**
 * Created by Administrator on 2016/2/26 0026.
 */
public class EditData {
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
            sql = "select * from boats";
            ResultSet rs = stmt.executeQuery(sql);
            while(rs.next()){
                if(rs.getString(1).equals(n)){
                    flag=stmt.execute("delete from boats where Official_Number="+rs.getInt(1));
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
        int t=0,x=0;
        String title[] = {"Chinese_Name=",",English_Name=",",Call_Sign=",",Type=",",Flag=",",Owner=",",Port_Registry="};
        sql = "select * from boats";
        Statement stmt = conn.createStatement();
        ResultSet rs = stmt.executeQuery(sql);
        while (rs.next()) {
            if (rs.getString(1).equals(s[0])){
                t = 1;
//                sql="UPDATE  boats SET Call_Sign = 'AAAA' WHERE Official_Number="+s[0];
                sql="UPDATE boats SET ";
                for(i=0;i<7;i++){
                    sql= sql + title[i] + "'"+s[i+1] + "'";
                }
                sql=sql+" WHERE Official_Number="+s[0];
                x=stmt.executeUpdate(sql);
                if(x!=0)
                    flag=true;
                break;
            }
        }
        if (t != 1) {
            //分配经纬度；
            Random random = new Random();
            double lat = 0;
            double lon = random.nextDouble() * (131 - 109.33) + 109.33;
            if (lon >= 109.33 && lon < 117.50)
                lat = random.nextDouble() * (34 - 11.5) + 11.55;
            else if (lon >= 117.50 && lon < 121.10)
                lat = random.nextDouble() * (41 - 37.07) + 37.07;
            else if (lon >= 121.10 && lon < 123)
                lat = random.nextDouble() * (45 - 35) + 35;
            else if (lon >= 123 && lon < 131)
                lat = random.nextDouble() * (33.10 - 23) + 23;
            s[8]=Double.toString(lon);
            s[9]=Double.toString(lat);
            sql = "INSERT INTO boats VALUES (" + s[0] + ",'" + s[1] + "','" + s[2] + "','" + s[3] + "','" + s[4] + "','" + s[5] + "','" + s[6] + "','" + s[7] + "','" + s[8] + "','" + s[9] + "')";
            try {
                pstmt = conn.prepareStatement(sql);
                i = pstmt.executeUpdate();
                if (i == 1)
                    flag = true;
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        else {
        }
        return flag;
    }


    //读取数据库
    public static List<Map<String, Object>> read() throws SQLException{
        Connection conn=getconn();
        String title[] = new String[]{"Official_Number","Chinese_Name","English_Name","Call_Sign","Type","Flag","Owner","Port_Registry","LONG","LAT"};
        String datalist[] = new String[11];
        String sql;
        sql="select * from boats";
        Statement stmt = conn.createStatement();
        ResultSet rs = stmt.executeQuery(sql);
        List<Map<String,  Object>> list = new ArrayList<Map<String, Object>>();
        while(rs.next()){
            Map<String,Object>map=new HashMap<String,Object>();
            for(int i=1;i<11;i++)
                 map.put(title[i-1],rs.getString(i));
            list.add(map);
        }
        return list;
    }
}
