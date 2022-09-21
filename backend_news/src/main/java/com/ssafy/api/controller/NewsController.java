package com.ssafy.api.controller;

import com.jcraft.jsch.Session;
import com.ssafy.api.request.UserLoginPostReq;
import com.ssafy.api.response.UserLoginPostRes;
import com.ssafy.api.service.UserService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.db.entity.User;
import com.ssafy.jsch.SSHUtil;
import io.swagger.annotations.*;
import org.checkerframework.checker.units.qual.K;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Key;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

/**
 * 뉴스 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "뉴스 및 키워드 API" , tags = {"News."})
@RestController
@RequestMapping("/api/v1/news")
public class NewsController {
	SSHUtil sshUtil = SSHUtil.getInstance();

	@GetMapping("/keyword/{start_date}/{end_date}")
	@ApiOperation(value = "키워드 분석 결과 조회", notes = "<strong>시작 날짜, 종료 날짜</strong>를 입력해서 해당 범위의 뉴스 키워드 결과를 50개 조회한다. (하루 당 1분정도 걸림), <h2>현재는 하루씩만 가능</h2>")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<List<String>> test(
			@ApiParam(value = "시작 날짜(YYYY-MM-DD)", required = true) @PathVariable("start_date") String startDate,
			@ApiParam(value = "종료 날짜(YYYY-MM-DD)", required = false) @PathVariable("end_date") String endDate
	) {

		List<String> ret = new ArrayList<>();

		if (endDate.equals("undefined")) {
			endDate = startDate;
		}

		Session jschSession = sshUtil.sessionConnect();

		// 하루만 뉴스 키워드 분석 하는 경우
		// 생각보다, 실시간 맵 리듀스를 통해 받아오는 시간이 많이 걸림...
		// 이미 구해놓은 걸 cat으로 하는걸 고려해보는것도 필요해보임
		// 나중에 조금이라도 빨리 하는법 생각해보기
		if(startDate.equals(endDate)) {
			String script = 		script =
					"hdfs dfs -rm -r keyword_in keyword_out1 keyword_out2; " +
					"hdfs dfs -mkdir keyword_in keyword_out1 keyword_out2; " +
					"hdfs dfs -put input/news/FILENAME.csv keyword_in; " +
					"hadoop jar ssen.jar keyword keyword_in keyword_out1 keyword_out2; " +
					"rm output/keyword/FILENAME.txt; " +
					"hdfs dfs -get keyword_out2/part-r-00000 output/keyword/FILENAME.txt";

			script = script.replaceAll("FILENAME", startDate);
			sshUtil.cmd(jschSession, script);

			script = "cat output/keyword/"+ startDate+ ".txt";
			String response = sshUtil.cmd(jschSession, script);
			sshUtil.sessionDisconnect(jschSession);

			StringTokenizer st = new StringTokenizer(response);
			while(st.hasMoreTokens()) {
				String s = st.nextToken();
				int val = Integer.parseInt(st.nextToken());
				Keyword k = new Keyword(s, val);
				System.out.println(k);
				ret.add(s +" " +val);
			}
			return ResponseEntity.status(401).body(ret);
		}

		// 날짜 범위를 두고 뉴스 키워드 분석을 하는 경우
		String script;
//
		script =
				"hdfs dfs -rm -r keyword_in keyword_out1 keyword_out2; " +
				"hdfs dfs -mkdir keyword_in keyword_out1 keyword_out2; " +
				"hdfs dfs -put input/keyword/FILENAME.csv keyword_in; " +
				"hadoop jar ssen.jar keywordsort keyword_in keyword_out1 keyword_out2; " +
				"rm output/keyword/FILENAME.txt; " +
				"hdfs dfs -get keyword_out2/part-r-00000 output/keyword/FILENAME.txt";
//
//		script = script.replaceAll("FILENAME", "20220919");
//		sshUtil.cmd(jschSession, script);
//		script = "cat output/keyword/20220919.txt";
//		ret = sshUtil.cmd(jschSession, script);
//		sshUtil.sessionDisconnect(jschSession);

		return ResponseEntity.status(401).body(ret);
	}

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
}
