package com.ssafy.api.controller;

import com.ssafy.api.response.IntrRateRes;
import com.ssafy.api.response.StockMarketRes;
import com.ssafy.api.service.IntrRateService;
import com.ssafy.api.service.StockMarketService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 채팅 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "StockMarket API", tags = {"StockMarket"})
@RestController
@RequestMapping("/api/v1/stock")
public class StockMarketController {

    @Autowired
    StockMarketService stockMarketService;

    @GetMapping()
    @ApiOperation(value = "증시 보기", notes = "증시 보기")
    @ApiResponses({@ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "없음"), @ApiResponse(code = 500, message = "서버 오류")})
    public ResponseEntity<List<StockMarketRes>> getStockMarketList() {
        List<StockMarketRes> stockMarketList = stockMarketService.getStockMarketList();
       return new ResponseEntity<>(stockMarketList, HttpStatus.OK);
    }

}
