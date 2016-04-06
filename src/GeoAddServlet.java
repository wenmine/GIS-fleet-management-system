import com.test.com.test.EditBoats;
import com.test.com.test.EditGeo;
import net.sf.json.JSONArray;
import org.apache.commons.lang.StringUtils;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2016/4/1 0001.
 */
public class GeoAddServlet extends javax.servlet.http.HttpServlet {
    protected void doPost(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        String[] addstr =new String[5];
        addstr[0]=request.getParameter("Mark_ID");
        addstr[1]=request.getParameter("Mark_Name");
        String type=request.getParameter("Mark_Type");

        String markCoord = request.getParameter("Mark_Coord");
        markCoord = markCoord.replace(",", " ");
        if(type.equals("Point")){
            addstr[2]="POINTFROMTEXT('POINT"+"("+markCoord+")')";
        }
        else if(type.equals("LineString")){
            addstr[3]="LINESTRINGFROMTEXT('LINESTRING"+"("+ replacePun(markCoord) +")')";
        }
        else{
            addstr[4]="POLYGONFROMTEXT('POLYGON"+"(("+ replacePun(markCoord) +"))')";
        }

        try {
            EditGeo.add(addstr);
        } catch (SQLException e) {
            e.printStackTrace();
        }

        response.setContentType("text/html; charset=utf-8");
        List<Map<String,  Object>> list = new ArrayList<Map<String, Object>>();
        PrintWriter out = response.getWriter();
        JSONArray jsonArray =new JSONArray();
        try {
            list= EditGeo.read();
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
