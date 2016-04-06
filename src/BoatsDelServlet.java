import com.test.com.test.EditBoats;
import net.sf.json.JSONArray;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2016/3/23 0023.
 */
public class BoatsDelServlet extends javax.servlet.http.HttpServlet {
    protected void doPost(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {

        String n=request.getParameter("Official_Number");
        try {
            EditBoats.delete(n);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        response.setContentType("text/html; charset=utf-8");
        List<Map<String,  Object>> list = new ArrayList<Map<String, Object>>();
        PrintWriter out = response.getWriter();
        JSONArray jsonArray =new JSONArray();
        try {
            list= EditBoats.read();
            jsonArray=jsonArray.fromObject(list);
            out.print(jsonArray.toString());
            out.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    protected void doGet(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {

    }

}
