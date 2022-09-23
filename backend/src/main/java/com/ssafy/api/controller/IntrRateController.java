package com.ssafy.api.controller;

import com.ssafy.api.request.ChatReq;
import com.ssafy.api.response.ChatRes;
import com.ssafy.api.response.IntrRateRes;
import com.ssafy.api.service.ChatService;
import com.ssafy.api.service.CurrencyCategoryService;
import com.ssafy.api.service.IntrRateService;
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
@Api(value = "InterestedRate API", tags = {"InterestedRate"})
@RestController
@RequestMapping("/api/v1/intrrate")
public class IntrRateController {

    @Autowired
    IntrRateService intrRateService;

    @GetMapping()
    @ApiOperation(value = "금리 보기", notes = "금리 보기")
    @ApiResponses({@ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = " 없음"), @ApiResponse(code = 500, message = "서버 오류")})
    public ResponseEntity<List<IntrRateRes>> getIntrRate() {
        List<IntrRateRes> intrRateList = intrRateService.getIntrRate();
       return new ResponseEntity<>(intrRateList, HttpStatus.OK);
    }

}
