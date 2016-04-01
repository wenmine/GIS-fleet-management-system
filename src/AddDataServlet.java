import com.test.com.test.EditData;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import javax.servlet.ServletException;
import javax.swing.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2016/3/22 0022.
 */
public class AddDataServlet extends javax.servlet.http.HttpServlet {
    protected void doPost(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        String addstr[]=new String[10];
        addstr[0]=request.getParameter("Official_Number");
        addstr[1]=request.getParameter("Chinese_Name");
        addstr[2]=request.getParameter("English_Name");
        addstr[3]=request.getParameter("Call_Sign");
        addstr[4]=request.getParameter("Type");
        addstr[5]=request.getParameter("Flag");
        addstr[6]=request.getParameter("Owner");
        addstr[7]=request.getParameter("Port_Registry");
        try {
            EditData.add(addstr);
        } catch (SQLException e) {
            e.printStackTrace();
        } response.setContentType("text/html; charset=utf-8");
        List<Map<String,  Object>> list = new ArrayList<Map<String, Object>>();
        PrintWriter out = response.getWriter();
        JSONArray jsonArray =new JSONArray();
        try {
            list=EditData.read();
            jsonArray=jsonArray.fromObject(list);
            out.print(jsonArray.toString());
            out.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
    }

    protected void doGet(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }

}
