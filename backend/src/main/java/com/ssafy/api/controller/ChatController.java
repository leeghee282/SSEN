package com.ssafy.api.controller;

import com.ssafy.api.request.ChatReq;
import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.service.ChatService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 채팅 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "유저 API", tags = {"User"})
@RestController
@RequestMapping("/api/v1/chat")
public class ChatController {

    @Autowired
    UserService userService;
    @Autowired
    ChatService chatService;
    @Autowired
    CurrencyCategoryService currencyCategoryService;

    //등록, 삭제, 전체조회
    @PostMapping()
    @ApiOperation(value = "채팅 등록", notes = "채팅을 등록한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> register(
            @RequestBody @ApiParam(value = "채팅 등록 정보", required = true) ChatReq chatInfo) {
        System.out.println("============chat controller");
        User user = userService.getUserByNickname(chatInfo.getNickname());
        long userUid = user.getUid();


        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

}
