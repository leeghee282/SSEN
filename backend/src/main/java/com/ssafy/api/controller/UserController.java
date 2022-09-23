package com.ssafy.api.controller;

import com.ssafy.api.request.UserLoginPostReq;
import com.ssafy.api.request.UserPasswordUpdateReq;
import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.request.UserUpdateReq;
import com.ssafy.api.response.UserLoginPostRes;
import com.ssafy.api.response.UserRes;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.db.entity.User;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "유저 API", tags = {"User"})
@RestController
@RequestMapping("/api/v1/user")
public class UserController {
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    UserService userService;

    @PostMapping("/signin")
    @ApiOperation(value = "회원 가입", notes = "<strong>아이디와 패스워드</strong>를 통해 회원가입 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<UserRes> register(
            @RequestBody @ApiParam(value = "회원가입 정보", required = true) UserRegisterPostReq registerInfo) {
        System.out.println("sign in controller");
        //임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
        User user = userService.createUser(registerInfo);
        return ResponseEntity.status(200).body(UserRes.of(200, "Success",user));
    }

    @GetMapping("/id-info/{userId}")
    @ApiOperation(value = "아이디 중복 검사", notes = "<strong>아이디가 DB에 있는 지 확인한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<UserRes> idOverlapCheck(
            @ApiParam(value = "아이디 정보", required = true)  @PathVariable("userId") String userId) {
        System.out.println("중복확인 시작");
        User user = userService.getUserByUserId(userId);
        if (user == null) {
            System.out.println("중복이 없습니다. 성공");
            return ResponseEntity.ok(UserRes.of(200, "Success", null));
        } else {
            System.out.println("중복 아이디가 있습니다. 실패");
            return ResponseEntity.status(401).body(UserRes.of(409, "중복된 아이디가 있습니다.", user));
        }
    }

    @GetMapping("/nickname-info/{nickname}")
    @ApiOperation(value = "닉네임 중복 검사", notes = "<strong>닉네임이 DB에 있는 지 확인한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<UserRes> nicknameOverlapCheck(
            @ApiParam(value = "닉네임 정보", required = true) @PathVariable("nickname") String nickname) {
        System.out.println("중복확인 시작");
        User user = userService.getUserByNickname(nickname);
        if (user == null) {
            System.out.println("중복이 없습니다. 성공");
            return ResponseEntity.ok(UserRes.of(200, "Success", null));
        } else {
            System.out.println("중복 닉네임이 있습니다. 실패");
            return ResponseEntity.status(409).body(UserRes.of(401, "중복된 아이디가 있습니다.", user));
        }
    }

    @GetMapping("/me")
    @ApiOperation(value = "회원 본인 정보 조회", notes = "로그인한 회원 본인의 정보를 응답한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<UserRes> getUserInfo(@ApiIgnore Authentication authentication) {
        /**
         * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
         * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
         */
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);

        return ResponseEntity.status(200).body(UserRes.of(200, "user_info 호출", user));
    }

    @PostMapping("/login")
    @ApiOperation(value = "로그인", notes = "<strong>아이디와 패스워드</strong>를 통해 로그인 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
            @ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<UserLoginPostRes> login(@RequestBody @ApiParam(value = "로그인 정보", required = true) UserLoginPostReq loginInfo) {
        String userId = loginInfo.getUserId();
        String password = loginInfo.getPassword();

        User user = userService.getUserByUserId(userId);
        // 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
        if (passwordEncoder.matches(password, user.getPassword())) {
            // 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
            return ResponseEntity.ok(UserLoginPostRes.of(200, "Success", JwtTokenUtil.getToken(userId)));
        }
        // 유효하지 않는 패스워드인 경우, 로그인 실패로 응답.
        return ResponseEntity.status(401).body(UserLoginPostRes.of(401, "Invalid Password", null));
    }

    @GetMapping("/mypage/{userId}")
    @ApiOperation(value = "아이디로 회원 정보 보기", notes = "회원정보를 확인한다.")
    @ApiResponses({@ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
            @ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)})
    public ResponseEntity<UserRes> profileSearch(
            @ApiParam(value = "아이디 정보", required = true) @PathVariable("userId") String userId) {

        // user를 가져와서
        User user = userService.getUserByUserId(userId);

        if (user != null) {
            return ResponseEntity.ok(UserRes.of(200, "Success", user));
        } else {
            return ResponseEntity.status(401).body(UserRes.of(401, "닉네임 정보가 없습니다.", null));
        }
    }


    @PutMapping("/edit")
    @ApiOperation(value = "프로필 수정", notes = "<strong>프로필을 수정한다.")
    @ApiResponses({@ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
            @ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)})
    public ResponseEntity<UserRes> updateUser(
            @RequestBody @ApiParam(value = "변경할 유저 정보", required = true) UserUpdateReq updateInfo) {

        User user = userService.updateUser(updateInfo);
        return ResponseEntity.ok(UserRes.of(200, "Success", user));

    }

    @PutMapping("/edit/password")
    @ApiOperation(value = "회원 비밀번호 수정", notes = "<strong>비밀번호</strong>를 수정한다.")
    @ApiResponses({@ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")})
    public ResponseEntity<UserRes> updatePassword(
            @RequestBody @ApiParam(value = "수정할 회원 비밀번호 정보", required = true) UserPasswordUpdateReq passwordUpdateInfo) {
        User user = userService.updateUserPassword(passwordUpdateInfo);
        if (user == null)
            return ResponseEntity.status(401).body(null);
        return ResponseEntity.ok(UserRes.of(200, "Success", user));
    }

    @DeleteMapping("/{userId}")
    @ApiOperation(value = "아이디로 회원 탈퇴", notes = "<strong>아이디</strong>를 통해 회원 정보를 삭제한다.")
    @ApiResponses({@ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")})
    public ResponseEntity<String> delete(
            @ApiParam(value = "삭제할 회원 닉네임", required = true) @PathVariable("userId") String userId) {
        User user = userService.getUserByUserId(userId);
        if (user == null) {
            return ResponseEntity.status(404).body("회원 없음");
        }
        boolean result = userService.deleteUser(userId);
        if (result)
            return ResponseEntity.status(200).body("Success");
        else
            return ResponseEntity.status(404).body("Fail");
    }

}
