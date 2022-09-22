package com.ssafy.api.controller;

import com.ssafy.api.response.IntrRateRes;
import com.ssafy.api.response.LiveCurrencyRes;
import com.ssafy.api.service.IntrRateService;
import com.ssafy.api.service.LiveCurrencyService;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api(value = "LiveCurrency API", tags = {"LiveCurrency"})
@RestController
@RequestMapping("/api/v1/live")
public class LiveCurrencyController {

    @Autowired
    LiveCurrencyService liveCurrencyService;

    @GetMapping("/{currencyCode}")
    @ApiOperation(value = "실시간 환율 보기", notes = "통화 코드로 실시간 환율 보기")
    @ApiResponses({@ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "없음"), @ApiResponse(code = 500, message = "서버 오류")})
    public ResponseEntity<LiveCurrencyRes> getLiveCurrency(@ApiParam(value = "실시간 환율을 볼 통화코드", required = true) @PathVariable("currencyCode") String currencyCode) {
        LiveCurrencyRes LiveCurrencyRes = liveCurrencyService.findLiveCurrencyByCCUid(currencyCode);
        return new ResponseEntity<>(LiveCurrencyRes, HttpStatus.OK);
    }

}
