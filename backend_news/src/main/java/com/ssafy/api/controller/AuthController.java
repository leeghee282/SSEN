package com.ssafy.api.controller;

import com.jcraft.jsch.Session;
import com.ssafy.jsch.SSHUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.ssafy.api.request.UserLoginPostReq;
import com.ssafy.api.response.UserLoginPostRes;
import com.ssafy.api.service.UserService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepositorySupport;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.ApiResponse;

/**
 * 인증 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
//@Api(value = "인증 API", tags = {"Auth."})
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
	@Autowired
	UserService userService;
	
	@Autowired
	PasswordEncoder passwordEncoder;

	SSHUtil sshUtil = SSHUtil.getInstance();

	@PostMapping("/login")
	@ApiOperation(value = "로그인", notes = "<strong>아이디와 패스워드</strong>를 통해 로그인 한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
        @ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
        @ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
        @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
	public ResponseEntity<UserLoginPostRes> login(@RequestBody @ApiParam(value="로그인 정보", required = true) UserLoginPostReq loginInfo) {
		String userId = loginInfo.getId();
		String password = loginInfo.getPassword();
		
		User user = userService.getUserByUserId(userId);
		// 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
		if(passwordEncoder.matches(password, user.getPassword())) {
			// 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
			return ResponseEntity.ok(UserLoginPostRes.of(200, "Success", JwtTokenUtil.getToken(userId)));
		}
		// 유효하지 않는 패스워드인 경우, 로그인 실패로 응답.
		return ResponseEntity.status(401).body(UserLoginPostRes.of(401, "Invalid Password", null));
	}

	@GetMapping("/keyword/{start_date}/{end_date}")
	@ApiOperation(value = "키워드 분석 결과 조회", notes = "<strong>시작 날짜, 종료 날짜</strong>를 입력해서 해당 범위의 뉴스 키워드 결과를 50개 조회한다. (하루 당 1분정도 걸림), 현재는 20220919만 가능")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 500, message = "서버 오류") })
	public String test(
			@ApiParam(value = "시작 날짜(YYYY-MM-DD)", required = true) @PathVariable("start_date") String startDate,
			@ApiParam(value = "종료 날짜(YYYY-MM-DD)", required = false) @PathVariable("end_date") String endDate
	) {



		if (endDate.equals("undefined")) {
			endDate = startDate;
		}


		Session jschSession = sshUtil.sessionConnect();

		// 하루만 뉴스 키워드 분석 하는 경우
		// 생각보다, 실시간 맵 리듀스를 통해 받아오는 시간이 많이 걸림... 우선은 이미 구해놓은 걸 cat으로 읽어오는걸로 해놓겠음
		// 나중에 조금이라도 빨리 하는법 생각해보기
		if(startDate.equals(endDate)) {
			String script = "hdfs dfs -get keyword_out2/part-r-00000 output/keyword/FILENAME.txt";
			script = script.replaceAll("FILENAME", startDate);
			String response = sshUtil.cmd(jschSession, script);
			sshUtil.sessionDisconnect(jschSession);
			return response;
		}


		// 범위를 두고 뉴스 키워드 분석을 하는 경우


		String ret = "test";
		String script;
//


		script =
				"hdfs dfs -rm -r keyword_in keyword_out1 keyword_out2; " +
				"hdfs dfs -mkdir keyword_in keyword_out1 keyword_out2; " +
				"hdfs dfs -put input/keyword/FILENAME.csv keyword_in; " +
				"hadoop jar ssafy.jar keywordsort keyword_in keyword_out1 keyword_out2; " +
				"rm output/keyword/FILENAME.txt; " +
				"hdfs dfs -get keyword_out2/part-r-00000 output/keyword/FILENAME.txt";
//
//		script = script.replaceAll("FILENAME", "20220919");
//		sshUtil.cmd(jschSession, script);
//		script = "cat output/keyword/20220919.txt";
//		ret = sshUtil.cmd(jschSession, script);
//		sshUtil.sessionDisconnect(jschSession);

		return ret;
	}
}
