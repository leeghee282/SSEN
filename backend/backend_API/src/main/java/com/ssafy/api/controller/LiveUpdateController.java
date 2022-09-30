package com.ssafy.api.controller;

import com.ssafy.api.response.LiveCurrencyRes;
import com.ssafy.api.response.LiveUserRes;
import com.ssafy.api.service.LiveCurrencyService;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 실시간 환율 update 확인 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "실시간 환율 update 확인", tags = {"live_update"})
@RestController
@RequestMapping("/api/v1/live_update")
public class LiveUpdateController {

    @Autowired
    LiveCurrencyService liveCurrencyService;

    //@Scheduled(fixedDelay = 3000, initialDelay = 2000)
    @GetMapping("/{currencyCode}")
    @ApiOperation(value = "실시간 환율 보기", notes = "통화 코드로 실시간 환율 보기")
    @ApiResponses({@ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "없음"), @ApiResponse(code = 500, message = "서버 오류")})
    public ResponseEntity<LiveCurrencyRes> getLiveCurrency(@ApiParam(value = "실시간 환율을 볼 통화코드", required = true) @PathVariable("currencyCode") String currencyCode) {
        LiveCurrencyRes LiveCurrencyRes = liveCurrencyService.findLiveCurrencyByCCUid(currencyCode);
        System.err.println("buyPrice : " + LiveCurrencyRes.getBuyPrice() + ", regdate : " + LiveCurrencyRes.getRegdate());
        return new ResponseEntity<>(LiveCurrencyRes, HttpStatus.OK);
    }

    @GetMapping()
    @ApiOperation(value = "실시간 환율 전체 보기", notes = " 실시간 환율 보기")
    @ApiResponses({@ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "없음"), @ApiResponse(code = 500, message = "서버 오류")})
    public ResponseEntity<List<LiveCurrencyRes>> getLiveCurrency() {
        List<LiveCurrencyRes> lcList = liveCurrencyService.getLiveCurrency();
        return new ResponseEntity<>(lcList, HttpStatus.OK);
    }

//    @GetMapping()
//    @ApiOperation(value = "목표 도달 보기", notes = "")
//    @ApiResponses({@ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
//            @ApiResponse(code = 404, message = "없음"), @ApiResponse(code = 500, message = "서버 오류")})
//    public ResponseEntity<List<LiveUserRes>> getUsers() {
//        List<LiveCurrencyRes> lcList = liveCurrencyService.getLiveUserResByBuyPrice();
//        return new ResponseEntity<>(lcList, HttpStatus.OK);
//    }
}
