package com.ssafy.api.controller;

import com.google.gson.JsonObject;
import com.jcraft.jsch.Session;
import com.ssafy.api.request.UserLoginPostReq;
import com.ssafy.api.response.KeywordRes;
import com.ssafy.api.response.UserLoginPostRes;
import com.ssafy.api.service.UserService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.db.entity.User;
import com.ssafy.jsch.SSHUtil;
import io.swagger.annotations.*;
import org.checkerframework.checker.units.qual.K;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Key;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

/**
 * 뉴스 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "뉴스 및 키워드 API", tags = {"News."})
@RestController
@RequestMapping("/api/v1/news")
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
    @ApiOperation(value = "뉴스 키워드 분석", notes = "<strong>시작 날짜, 종료 날짜</strong>를 입력해서 해당 범위의 뉴스 키워드 결과를 50개 조회한다.")
    @ApiResponses({@ApiResponse(code = 200, message = "성공"),
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
        String cmd = "~/mapreduce/keyword.sh " + dateRange.toString() + "> /dev/null 2>&1 &&  /home/hadoop/hadoop/bin/hdfs dfs -cat keyword_out2/part-r-00000";
//        System.out.println(cmd);

        String response = sshUtil.cmd(jschSession, cmd);

        System.out.println(response);
        StringTokenizer st = new StringTokenizer(response);
        while (st.hasMoreTokens()) {
            String s = st.nextToken();
            int val = Integer.parseInt(st.nextToken());
            KeywordRes k = new KeywordRes();
            k.setKeyword(s);
            k.setCount(val);
            keywordList.add(k);
        }


        return new ResponseEntity<>(keywordList, HttpStatus.OK);
    }

}
