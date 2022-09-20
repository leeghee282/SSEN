package com.ssafy.api.controller;

import com.ssafy.api.response.ExchangeRateRes;
import com.ssafy.api.response.HoldingCurrencyRes;
import com.ssafy.api.service.ExchangeRateService;
import com.ssafy.api.service.HoldingCurrService;
import com.ssafy.api.service.UserService;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

/*
 * 사용자 부가 기능(보유 통화 , 관심 통화)
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class UserCurrController {

    private final UserService userService;

    private final HoldingCurrService holdingCurrService;

    @GetMapping("/holdcurr")
    @ApiOperation(value = "보유 통화 조회")
    public ResponseEntity<List<HoldingCurrencyRes>> getHoldingCurr(@RequestBody String userId){
        List<HoldingCurrencyRes> dtoList = null;

        User user = userService.getUserByUserId(userId);
        dtoList = holdingCurrService.getHoldingCurrByUser(user);

        return new ResponseEntity<>(dtoList, HttpStatus.OK);
    }



}
