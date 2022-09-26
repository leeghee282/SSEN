package com.ssafy.api.controller;

import com.ssafy.api.request.ChatReq;
import com.ssafy.api.response.ChatRes;
import com.ssafy.api.service.ChatService;
import com.ssafy.api.service.CurrencyCategoryService;
import com.ssafy.api.service.UserService;
import com.ssafy.db.entity.Chat;
import com.ssafy.db.entity.CurrencyCategory;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 채팅 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "Chat API", tags = {"Chat"})
@RestController
@RequestMapping("/api/v1/chat")
public class ChatController {

    @Autowired
    UserService userService;
    @Autowired
    ChatService chatService;
    @Autowired
    CurrencyCategoryService currencyCategoryService;

    @PostMapping()
    @ApiOperation(value = "채팅 등록", notes = "채팅을 등록한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<String> register(
            @RequestBody @ApiParam(value = "채팅 등록 정보", required = true) ChatReq chatInfo) {
        Chat chat = chatService.createChat(chatInfo);
        if (chat == null) return ResponseEntity.status(404).body("등록 실패");
        else
            return ResponseEntity.status(200).body("등록 성공");
    }

    @DeleteMapping()
    @ApiOperation(value = "채팅 삭제", notes = "<strong>uid</strong>를 통해 채팅을 삭제한다.")
    @ApiResponses({@ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")})
    public ResponseEntity<String> delete(
            @ApiParam(value = "삭제할 채팅 uid", required = true) @RequestParam("uid") long uid) {
        Chat chat = chatService.getChatbyUid(uid);
        if (chat == null) {
            return ResponseEntity.status(404).body("채팅 없음");
        }
        boolean result = chatService.deleteChat(uid);
        if (result)
            return ResponseEntity.status(200).body("Success");
        else
            return ResponseEntity.status(404).body("Fail");
    }

    @GetMapping()
    @ApiOperation(value = "채팅 보기", notes = "통화 코드별로 채팅 전체 보기")
    @ApiResponses({@ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "게임 방 없음"), @ApiResponse(code = 500, message = "서버 오류")})
    public ResponseEntity<List<ChatRes>> searchChatListByCode(
            @ApiParam(value = "검색할 통화 코드", required = true) @RequestParam("currencyCode") String currencyCode) {
        CurrencyCategory cc = currencyCategoryService.getCurrencyCategorybyCode(currencyCode);
        List<ChatRes> chatList = chatService.serchChatListByCode(cc.getUid());
       return new ResponseEntity<>(chatList, HttpStatus.OK);
    }

}
