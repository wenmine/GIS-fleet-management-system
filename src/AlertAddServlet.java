import com.test.com.test.EditAlert;
import com.test.com.test.EditGeo;
import net.sf.json.JSONArray;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2016/4/6 0006.
 */
public class AlertAddServlet extends javax.servlet.http.HttpServlet {
    protected void doPost(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        String[] addstr =new String[3];
        addstr[0]=request.getParameter("Warn_ID");
        addstr[1]=request.getParameter("Warn_Name");

        String warnCoord = request.getParameter("Warn_Coord");
        warnCoord = warnCoord.replace(",", " ");
        addstr[2]="POLYGONFROMTEXT('POLYGON"+"(("+ replacePun(warnCoord) +"))')";

        try {
            EditAlert.add(addstr);
        } catch (SQLException e) {
            e.printStackTrace();
        }

        response.setContentType("text/html; charset=utf-8");
        List<Map<String,  Object>> list = new ArrayList<Map<String, Object>>();
        PrintWriter out = response.getWriter();
        JSONArray jsonArray =new JSONArray();
        try {
            list= EditAlert.read();
            jsonArray=jsonArray.fromObject(list);
            out.print(jsonArray.toString());
            out.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    protected void doGet(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
    }

    protected String replacePun(String s1){
        int n = 0;
        String s="";
        for (int i = 0; i < s1.length(); i++) {
            char c = s1.charAt(i);
            if (c==' ') {
                n++;
            }
            if (n%2==0&&c==' ') {
                s += ",";
            }else {
                s += c;
            }
        }
        return s;
    }
}
