package com.test.com.test;

import net.sf.json.JSONArray;

import java.sql.*;
import java.util.*;

/**
 * Created by Administrator on 2016/2/26 0026.
 */
public class EditBoats {
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
            String[] position=new String[2];
            String[] res= new String[2];
            position=Pos();
            res=check(position[0],position[1]);
            while(res[0]==null&&res[1]==null)
            {
                position=Pos();
                res=check(position[0],position[1]);
            }
            String alert[] = AlertArea(position[0],position[1]);
            s[8]=position[0];
            s[9]=position[1];
            s[10]=alert[0];
            s[11]=alert[1];
            sql = "INSERT INTO boats VALUES (" + s[0] + ",'" + s[1] + "','" + s[2] + "','" + s[3] + "','" + s[4] + "','" + s[5] + "','" + s[6] + "','" + s[7] + "','" + s[8] + "','" + s[9] + "','" + s[10] + "','" + s[11] + "')";
            try {
                pstmt = conn.prepareStatement(sql);
                i = pstmt.executeUpdate();
                if (i == 1)
                    flag = true;
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return flag;
    }


    //读取数据库
    public static List<Map<String, Object>> read() throws SQLException{
        Connection conn=getconn();
        String title[] = new String[]{"Official_Number","Chinese_Name","English_Name","Call_Sign","Type","Flag","Owner","Port_Registry","LONG","LAT","Alert","Area"};
        String sql;
        sql="select * from boats";
        Statement stmt = conn.createStatement();
        ResultSet rs = stmt.executeQuery(sql);
        List<Map<String,  Object>> list = new ArrayList<Map<String, Object>>();
        while(rs.next()){
            Map<String,Object>map=new HashMap<String,Object>();
            for(int i=1;i<13;i++)
                 map.put(title[i-1],rs.getString(i));
            list.add(map);
        }
        return list;
    }

    //船舶移动
    public  static void move() throws  SQLException{
        Connection conn=getconn();
        String sql;
        sql="select * from boats";
        Statement stmt = conn.createStatement();
        ResultSet rs = stmt.executeQuery(sql);
        Statement st = conn.createStatement();
        while (rs.next()) {
            String x = rs.getString(9);
            String y = rs.getString(10);
            String[] pos=new String[2];
            String[] res=new String[2];
            pos=Position(x,y);
            res=check(pos[0],pos[1]);
            while(res[0]==null&&res[1]==null)
            {
                pos=Position(x,y);
                res=check(pos[0],pos[1]);
            }
            String flag[] = AlertArea(pos[0], pos[1]);
            sql="UPDATE boats SET LNG="+pos[0]+",LAT="+pos[1]+",Alert='"+flag[0]+"',Area='"+flag[1]+"' WHERE Official_Number="+rs.getInt(1);
            st.executeUpdate(sql);
        }
    }

    public static String[] check(String x,String y) throws SQLException {
        Connection conn=getconn();String sql;
        sql="select * from boats";
        Statement st = null;
        st = conn.createStatement();
        ResultSet rf = st.executeQuery(sql);
        String[] res = new String[2];
        res[0]=x;
        res[1]=y;
        while (rf.next()) {
            if ((rf.getString(9).equals(x)) && (rf.getString(10).equals(y))) {
                res[0]="";
                res[1]="";
            }
        }
        return res;
    }

    public static String[] Pos() {
        String[] s = new String[2];
        Random random = new Random();
        double lat = 0;
        int f = random.nextInt()*(1-0)+1;
        double lon;
        if(f==0) {
            lon = random.nextDouble() * (120.9639 - 111) + 111;
        }
        else{
            lon = random.nextDouble() * (129 - 122) + 122;
        }

        if(lon >= 119.2939 && lon < 120.9639){
            lat = random.nextDouble() * (39.4022 - 37.7881) + 37.7881;
        }
        else if (lon >= 111.3398 && lon < 120.1948) {
            lat = random.nextDouble() * (20 - 10) + 10;
        }
        else if (lon >= 122.3921 && lon < 124.3037) {
            lat = random.nextDouble() * (38.6855 - 37.7186) + 37.7186;
        }
        else if (lon >= 122 && lon < 126) {
            lat = random.nextDouble() * (36.3151 - 32) + 32;
        }
        else if (lon >= 122 && lon < 129) {
            lat = random.nextDouble() * (32 - 25.2646) + 25.2646;
        }
        s[0]=Double.toString(lon);
        s[1]=Double.toString(lat);
        return s;
    }

    public static String[] Position(String s1,String s2) {
        String[] s = new String[2];
        Double x = Double.parseDouble(s1);
        Double y = Double.parseDouble(s2);
        Random random = new Random();
        Double xf ;
        Double yf ;
        //修改经度
        if(x>=111&&x<120.9639) {
            xf =  random.nextDouble() * (120.9639 - 111) + 111;
            while(Math.abs(x-xf)>0.03)
            {
                xf =  random.nextDouble() * (120.9639 - 111) + 111;
            }
        }
        else {
            xf = random.nextDouble() * (129 - 122) + 122;
            while(Math.abs(x-xf)>0.03)
            {
                xf = random.nextDouble() * (129 - 122) + 122;
            }
        }


        //修改纬度
        if(y>=10&&y<20){
            yf=random.nextDouble() * (20 - 10) + 10;
            while(Math.abs(yf-y)>0.03)
            {
                yf=random.nextDouble() * (20 - 10) + 10;
            }
        }
        else if(y>=25.2646&&y<=32){
            yf=random.nextDouble() * (32 - 25.2646) + 25.2646;
            while(Math.abs(yf-y)>0.03)
            {
                yf=random.nextDouble() * (32 - 25.2646) + 25.2646;
            }
        }
        else if(y>=32&&y<=36.3151){
            yf=random.nextDouble() * (36.3151 - 32) + 32;
            while(Math.abs(yf-y)>0.03)
            {
                yf=random.nextDouble() * (36.3151 - 32) + 32;
            }
        }
        else if(y>=37.7186&&y<=38.6855){
            yf=random.nextDouble() * (38.6855 - 37.7186) + 37.7186;
            while(Math.abs(yf-y)>0.03)
            {
                yf=random.nextDouble() * (38.6855 - 37.7186) + 37.7186;
            }
        }
        else{
            yf=random.nextDouble() * (39.4022 - 37.7881) + 37.7881;
            while(Math.abs(yf-y)>0.03)
            {
                yf=random.nextDouble() * (39.4022 - 37.7881) + 37.7881;
            }
        }

        s[0]=Double.toString(xf);
        s[1]=Double.toString(yf);
        return s;
    }

    public static String[] AlertArea(String x,String y) throws SQLException {
        String alert[]=new String[2];
        String point="POINT(";
        point = point + x + " " + y + ")";
        Connection conn=getconn();String sql;
        sql="select * from alert";
        Statement st = null;
        st = conn.createStatement();
        ResultSet rf = st.executeQuery(sql);
        while (rf.next()){
            String name = rf.getString(2);
            sql="SELECT Astext(Pgn) From alert WHERE ID = \""+rf.getString(1)+"\"";
            Statement s = null;
            s = conn.createStatement();
            ResultSet rt = s.executeQuery(sql);
            rt.next();
            String area = rt.getString(1);
            sql="SELECT MBRContains(GeomFromText('"+area+"'),GeomFromText('"+point+"'))";
            rt = s.executeQuery(sql);
            rt.next();
            String n = rt.getString(1);
            if(n.equals("1")){
                alert[0]="1";
                alert[1]=name;
            }
            else{
                alert[0]="0";
                alert[1]="";
            }
        }
        return alert;
    }
}
