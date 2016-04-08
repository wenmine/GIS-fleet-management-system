import com.test.com.test.EditBoats;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;

/**
 * Created by Administrator on 2016/4/6 0006.
 */
public class BoatsReadServlet extends javax.servlet.http.HttpServlet {
    protected void doPost(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        response.setContentType("text/html; charset=utf-8");
        List<Map<String,  Object>> list = new ArrayList<Map<String, Object>>();
        PrintWriter out = response.getWriter();
        JSONArray jsonArray =new JSONArray();
        try {
            EditBoats.move();
            list = EditBoats.read();
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
