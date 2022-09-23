package com.ssafy.api.controller;

import com.ssafy.api.response.CommissionRes;
import com.ssafy.api.response.ExchangeRateRes;
import com.ssafy.api.service.ExchangeRateService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import retrofit2.http.Path;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
@Api(tags = {"환율 정보 API"})
public class ExchangeRateController {
    private final ExchangeRateService exchangeRateService;

    @GetMapping("/curr/period/{startDate}/{endDate}/{code}")
    @ApiOperation(value = "환율 정보 조회(기간)", notes ="기간, 통화코드에 따른 환율 정보 조회 기능. \n성공 시 환율 정보 Res List를 반환.")
    public ResponseEntity<List<ExchangeRateRes>> getExchangeRatePeriod(
            @ApiParam(value = "시작 날짜", example = "2022-01-14", required = true)@PathVariable String startDate,
            @ApiParam(value = "끝 날짜", example = "2022-01-15", required = true)@PathVariable String endDate,
            @ApiParam(value = "통화코드", example = "USD", required = true)@PathVariable String code) throws ParseException {
        // 날짜를 date 타입으로 변환
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        Date sDate = formatter.parse(startDate);
        Date eDate = formatter.parse(endDate);

        List<ExchangeRateRes> dtoList = exchangeRateService.getExchangeRatePeriod(sDate, eDate, code);
        return new ResponseEntity<>(dtoList, HttpStatus.OK);
    }

    @GetMapping("/curr/one/{date}/{code}")
    @ApiOperation(value = "환율 정보 조회(특정 날짜)", notes ="날짜, 통화코드에 따른 환율 정보 조회. \n성공 시 환율 정보 Res List를 반환.")
    public ResponseEntity<ExchangeRateRes> getExchangeRateOneDay(@ApiParam(value = "날짜", example = "2022-01-17", required = true)@PathVariable String date,
                                                                 @ApiParam(value = "통화코드", example = "USD", required = true)@PathVariable String code) throws ParseException {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        Date idate = formatter.parse(date);
        ExchangeRateRes dto = exchangeRateService.getExchangeRateOneDay(idate, code);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @GetMapping("/commission/{code}")
    @ApiOperation(value = "은행별 환율 정보 조회", notes ="통화코드에 따른 은행별 환율 정보 조회. \n성공 시 은행 수수료 정보 Res List를 반환.")
    public ResponseEntity<List<CommissionRes>> getCommission(
            @ApiParam(value = "통화코드", example = "USD", required = true)@PathVariable String code){
        List<CommissionRes> dtoList = exchangeRateService.getCommission(code);
        return new ResponseEntity<>(dtoList, HttpStatus.OK);
    }

}
