package com.ssafy.api.controller;

import com.jcraft.jsch.Session;
import com.ssafy.api.response.KeywordRes;
import com.ssafy.api.response.NewsRes;
import com.ssafy.common.util.jsch.SSHUtil;
import io.swagger.annotations.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

/**
 * 뉴스 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "뉴스 및 키워드 API", tags = {"News."})
@RestController
@RequestMapping("/news")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class NewsController {
    SSHUtil sshUtil = SSHUtil.getInstance();

    private class Keyword {
        String keyword;
        int count;

        public Keyword(String keyword, int count) {
            this.keyword = keyword;
            this.count = count;
        }

        @Override
        public String toString() {
            return "Keyword{" +
                    "keyword='" + keyword + '\'' +
                    ", count=" + count +
                    '}';
        }
    }

    @GetMapping("/keyword/{start_date}/{end_date}")
    @ApiOperation(value = "뉴스 키워드 분석", notes = "<strong>시작 날짜, 종료 날짜</strong>를 입력해서 해당 범위의 뉴스 키워드 결과를 50개 조회한다. (하루만 조회할 경우 start_date만 입력해도 가능)")
    @ApiResponses({@ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "조회 결과 없음(날짜, 하둡 등 확인필요)"),
            @ApiResponse(code = 500, message = "서버 오류")})
    public ResponseEntity<List<KeywordRes>> getKeywordsBetweenDates(
            @ApiParam(value = "시작 날짜(YYYY-MM-DD)", required = true) @PathVariable("start_date") String startDate,
            @ApiParam(value = "종료 날짜(YYYY-MM-DD)", required = false) @PathVariable("end_date") String endDate
    ) {

        List<KeywordRes> keywordList = new ArrayList<>();

        if (endDate.equals("undefined")) {
            endDate = startDate;
        }

        Session jschSession = sshUtil.sessionConnect();

        // 전체 범위 날짜별로 모두 더한 String 만들기
        // (쉘 길이 2097152 정도 까지 가능 -> 십년치도 될듯)
        StringBuilder dateRange = new StringBuilder();
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate).plusDays(1);
        for (LocalDate date = start; date.isBefore(end); date = date.plusDays(1))
            dateRange.append(" " + date);
        dateRange.append(" ");
        String cmd = "~/mapreduce/keyword.sh " + dateRange.toString() + "> /dev/null 2>&1 &&  /home/hadoop/hadoop/bin/hdfs dfs -cat keyword_out2/*";
//        System.out.println(cmd);

        String response = sshUtil.cmd(jschSession, cmd);

//        System.out.println(response);
        StringTokenizer st = new StringTokenizer(response);

        if (!st.hasMoreTokens())
            return ResponseEntity.status(400).body(null);

        StringBuilder query = new StringBuilder();
//        query.append("INSERT INTO SSEN.variance_keywords(variance_date_uid, name, frequency) VALUES \n");

        int cnt = 0;
        while (st.hasMoreTokens()) {
            if (++cnt > 10)
                break;
//            query.append("((SELECT uid FROM SSEN.variance_date where reference_date = '" + startDate + "'");
//            query.append(") ,'");
            String s = st.nextToken();
            int val = Integer.parseInt(st.nextToken());
            KeywordRes k = new KeywordRes();
            k.setKeyword(s);
//            query.append(s + "' ,");
            k.setCount(val);
//            query.append(val + "), ");
            keywordList.add(k);

        }
//        query.setLength(query.length()-2);
//        query.append(";");
//        System.out.println(query.toString());

        return new ResponseEntity<>(keywordList, HttpStatus.OK);
    }

    @GetMapping("/search/{keyword}/{start_date}/{end_date}")
    @ApiOperation(value = "키워드로 뉴스 검색", notes = "<strong>시작 날짜, 종료 날짜, 키워드</strong>를 입력해서 해당 범위의 키워드를 포함하는 뉴스 목록을 조회한다. (하루만 조회할 경우 start_date만 입력해도 가능)")
    @ApiResponses({@ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "조회 결과 없음(날짜, 하둡 등 확인필요)"),
            @ApiResponse(code = 500, message = "서버 오류")})
    public ResponseEntity<List<NewsRes>> getNewsByKeywordAndDates(
            @ApiParam(value = "시작 날짜(YYYY-MM-DD)", required = true) @PathVariable("start_date") String startDate,
            @ApiParam(value = "종료 날짜(YYYY-MM-DD)", required = false) @PathVariable("end_date") String endDate,
            @ApiParam(value = "키워드", required = true) @PathVariable("keyword") String keyword
    ) {

        List<NewsRes> newsResList = new ArrayList<>();

//        System.out.println("확인하기" + endDate);
        if (endDate.equals("undefined")) {
            endDate = startDate;
        }
//        System.out.println("확인하기2" + endDate);
        Session jschSession = sshUtil.sessionConnect();

        // 전체 범위 날짜별로 모두 더한 String 만들기
        // (쉘 길이 2097152 정도 까지 가능 -> 십년치도 될듯)
        StringBuilder dateRange = new StringBuilder();
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate).plusDays(1);
        for (LocalDate date = start; date.isBefore(end); date = date.plusDays(1))
            dateRange.append(" " + date);
        dateRange.append(" " + keyword);
        String cmd = "~/mapreduce/news.sh " + dateRange.toString() + "> /dev/null 2>&1 &&  /home/hadoop/hadoop/bin/hdfs dfs -cat news_out/*";
//        System.out.println(cmd);

        String response = sshUtil.cmd(jschSession, cmd);

        StringTokenizer st = new StringTokenizer(response, "\n");

        if (!st.hasMoreTokens())
            return ResponseEntity.status(400).body(null);

        while (st.hasMoreTokens()) {
            String news = st.nextToken(); // 개별 기사
            StringTokenizer st2 = new StringTokenizer(news, ",");  // 개별 csv 셀

//            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            while (st2.hasMoreTokens()) {
//                String time = LocalDateTime.parse(st2.nextToken(), formatter);
                String time = st2.nextToken();
                st2.nextToken(); //언론사, 개선할 여지 있음..
                String press = st2.nextToken().trim();
                String title = st2.nextToken();
                String content = st2.nextToken();
                String url = st2.nextToken();
                st2.nextToken(); //키워드 분석 결과, 개선할 여지 있음..
                NewsRes newsRes = new NewsRes();
                newsRes.setUrl(url);
                newsRes.setContent(content);
                newsRes.setTime(time);
                newsRes.setPress(press);
                newsRes.setTitle(title);

                newsResList.add(newsRes);
            }
        }
        return new ResponseEntity<>(newsResList, HttpStatus.OK);
    }

}
