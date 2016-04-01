import com.test.com.test.EditData;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import javax.swing.*;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2016/3/24 0024.
 */
public class ReadDataServlet extends javax.servlet.http.HttpServlet {
    protected void doPost(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        List<Map<String,  Object>> list = new ArrayList<Map<String, Object>>();
        try {
            list=EditData.read();
            request.setAttribute("datalist",list);
            request.getRequestDispatcher("main.jsp").forward(request, response);

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    protected void doGet(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        doPost(request, response);
    }
}
