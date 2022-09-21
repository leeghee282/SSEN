package com.ssafy.api.controller;

import com.ssafy.api.response.CommissionRes;
import com.ssafy.api.response.ExchangeRateRes;
import com.ssafy.api.service.ExchangeRateService;
import io.swagger.annotations.ApiOperation;
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
public class ExchangeRateController {
    private final ExchangeRateService exchangeRateService;

    @GetMapping("/curr/period/{startDate}/{endDate}/{code}")
    @ApiOperation(value = "통화코드에 따른 환율 정보 제공(기간)")
    public ResponseEntity<List<ExchangeRateRes>> getExchangeRatePeriod(@PathVariable String startDate, @PathVariable String endDate, @PathVariable String code) throws ParseException {
        // 날짜를 date 타입으로 변환
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        Date sDate = formatter.parse(startDate);
        Date eDate = formatter.parse(endDate);

        List<ExchangeRateRes> dtoList = exchangeRateService.getExchangeRatePeriod(sDate, eDate, code);
        return new ResponseEntity<>(dtoList, HttpStatus.OK);
    }

    @GetMapping("/curr/one/{date}/{code}")
    @ApiOperation(value = "통화코드 따른 환율 정보 제공(특정 날짜)")
    public ResponseEntity<ExchangeRateRes> getExchangeRateOneDay(@PathVariable String date, @PathVariable String code) throws ParseException {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        Date idate = formatter.parse(date);
        ExchangeRateRes dto = exchangeRateService.getExchangeRateOneDay(idate, code);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @GetMapping("/commission/{code}")
    @ApiOperation(value = "통화코드에 따른 은행별 환율 정보 제공")
    public ResponseEntity<List<CommissionRes>> getCommission(@PathVariable String code){
        List<CommissionRes> dtoList = exchangeRateService.getCommission(code);
        return new ResponseEntity<>(dtoList, HttpStatus.OK);
    }

}
