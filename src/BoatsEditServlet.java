import com.test.com.test.EditBoats;
import net.sf.json.JSONObject;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2016/3/23 0023.
 */
public class BoatsEditServlet extends javax.servlet.http.HttpServlet {
    protected void doPost(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        response.setContentType("text/html; charset=utf-8");
        String n=request.getParameter("Official_Number");
        List<Map<String,  Object>> list = new ArrayList<Map<String, Object>>();
        PrintWriter out = response.getWriter();
        JSONObject jsonObject =new JSONObject();
        try {
            list= EditBoats.read();
            for (Map<String, Object> stringObjectMap : list){
                if(stringObjectMap.get("Official_Number").equals(n)) {
                    jsonObject= JSONObject.fromObject(stringObjectMap);
                }
            }
            out.print(jsonObject.toString());
            out.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    protected void doGet(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        doPost(request, response);
    }
}
