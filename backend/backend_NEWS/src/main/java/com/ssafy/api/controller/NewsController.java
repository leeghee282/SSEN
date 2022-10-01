package com.ssafy.api.controller;

import com.jcraft.jsch.Session;
import com.ssafy.api.request.KeywordReq;
import com.ssafy.api.response.KeywordRes;
import com.ssafy.api.response.NewsRes;
import com.ssafy.api.response.PastRes;
import com.ssafy.api.service.KeywordService;
import com.ssafy.common.util.jsch.SSHUtil;
import com.ssafy.db.entity.VarianceTop;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;

/**
 * 뉴스 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "뉴스 및 키워드 API", tags = {"News."})
@RestController
@RequiredArgsConstructor
@RequestMapping("/news")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class NewsController {

    private final KeywordService keywordService;
    SSHUtil sshUtil = SSHUtil.getInstance();


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
        LocalDate end = LocalDate.parse(endDate);
        for (LocalDate date = end; date.isAfter(start.minusDays(1)); date = date.minusDays(1))
            dateRange.append(" " + date);
        dateRange.append(" ");
        String cmd = "~/mapreduce/keyword.sh " + dateRange.toString() + "> /dev/null 2>&1 &&  /home/hadoop/hadoop/bin/hdfs dfs -cat keyword_out2/*";
        System.out.println("확인하기1" + cmd);
        String response = sshUtil.cmd(jschSession, cmd);

//        System.out.println(response);
        StringTokenizer st = new StringTokenizer(response);

        if (!st.hasMoreTokens())
            return ResponseEntity.status(400).body(null);

        StringBuilder query = new StringBuilder(); //DB에 넣을 키워드 분석 결과를 위한 쿼리(변동률이 심한 특정 날짜)
        query.append("INSERT INTO SSEN.variance_keywords(variance_date_uid, name, frequency) VALUES \n");

        while (st.hasMoreTokens()) {
            query.append("((SELECT uid FROM SSEN.variance_date where reference_date = '" + startDate + "'");
            query.append(") ,'");
            String s = st.nextToken();
            int val = Integer.parseInt(st.nextToken());
            KeywordRes k = new KeywordRes();
            k.setKeyword(s);
            query.append(s + "' ,");
            k.setCount(val);
            query.append(val + "), ");
            keywordList.add(k);
        }
        query.setLength(query.length() - 2);
        query.append(";");
        System.out.println(query.toString());

        return new ResponseEntity<>(keywordList, HttpStatus.OK);
    }

    @GetMapping("/search/{keyword}")
    @ApiOperation(value = "키워드로 뉴스 검색", notes = "<strong> 키워드</strong>를 입력해서 이미 선택했던 날짜의 범위의 키워드를 포함하는 뉴스 목록을 조회한다. (하루만 조회할 경우 start_date만 입력해도 가능)")
    @ApiResponses({@ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "조회 결과 없음(날짜, 하둡 등 확인필요)"),
            @ApiResponse(code = 500, message = "서버 오류")})
    public ResponseEntity<List<NewsRes>> getNewsByKeywordAndDates(
            @ApiParam(value = "키워드", required = true) @PathVariable("keyword") String keyword
    ) {

        List<NewsRes> newsResList = new ArrayList<>();

        Session jschSession = sshUtil.sessionConnect();

        String cmd = "/home/hadoop/hadoop/bin/hadoop jar ~/mapreduce/ssen.jar news " + keyword + " keyword_in news_out > /dev/null 2>&1 &&  /home/hadoop/hadoop/bin/hdfs dfs -cat news_out/*";

//        System.out.println("확인하기2 " + cmd);
        String response = sshUtil.cmd(jschSession, cmd);
        StringTokenizer st = new StringTokenizer(response, "\n");

        if (!st.hasMoreTokens())
            return ResponseEntity.status(400).body(null);

        while (st.hasMoreTokens()) {
            String news = st.nextToken(); // 개별 기사
            StringTokenizer st2 = new StringTokenizer(news, ",");
            while (st2.hasMoreTokens()) {
                String time = st2.nextToken();
                String press = st2.nextToken().trim();
                String title = st2.nextToken();
                String content = st2.nextToken();
                String url = st2.nextToken();
                NewsRes newsRes = NewsRes.of(title, content, press, time, url);
                newsResList.add(newsRes);
            }
        }
        Collections.reverse(newsResList);
        return new ResponseEntity<>(newsResList, HttpStatus.OK);
    }

    @PostMapping("/past")
    @ApiOperation(value = "비슷한 키워드 분포를 가지는 날짜 조회", notes = "<strong>현재 선택한 날짜의 키워드 분포</strong>를 통해서 비슷한 키워드 분포를 가진 날짜-유사도 목록을 조회한다.")
    @ApiResponses({@ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "조회 결과 없음(하둡 맵리듀스 로그, EC2 등 확인필요)"),
            @ApiResponse(code = 500, message = "서버 오류")})
    public ResponseEntity<List<PastRes>> getDatesByKeyword(
            @RequestBody @ApiParam(value = "키워드 분포", required = true) List<KeywordReq> keywordList) throws ParseException {

        StringBuilder query = new StringBuilder();
        for (KeywordReq keyword : keywordList) {
            query.append(keyword.toString() + ":");
        }
        query.setLength(query.length() - 1);
//        System.out.println(args.toString());

        List<PastRes> pastResList = new ArrayList<>();

        Session jschSession = sshUtil.sessionConnect();

        String cmd = "/home/hadoop/hadoop/bin/hadoop jar ~/mapreduce/ssen.jar topksearch 4 " + query + " 10 topksearch topksearch_out1 topksearch_out2 > /dev/null 2>&1 &&  /home/hadoop/hadoop/bin/hdfs dfs -cat topksearch_out2/*";

//        System.out.println("확인하기3 " + cmd);
        String response = sshUtil.cmd(jschSession, cmd);
        StringTokenizer st = new StringTokenizer(response);

        // PostResList 만들기 ===========================================
        
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd"); // 날짜 포맷

        while (st.hasMoreTokens()) {
            st.nextToken();
            String dateStr = st.nextToken(); // 날짜 String
            Date vDate = formatter.parse(dateStr); // 검색할 Date
            VarianceTop info = keywordService.getVarianceTopByDate(vDate);
            String currency_code = info.getCountry(); // 통화코드
            double variance = info.getVariance(); // 변화율
            double similarity = Double.parseDouble(st.nextToken()); // 유사도
            Date date = info.getVarianceDate().getReferenceDate(); // 날짜(출력용)
            pastResList.add(PastRes.of(date, similarity, currency_code, variance)); // List에 추가
        }
        return new ResponseEntity<>(pastResList, HttpStatus.OK);
    }
}
