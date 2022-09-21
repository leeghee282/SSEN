package com.ssafy.api.controller;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.api.request.HoldingCurrencyAddReq;
import com.ssafy.api.response.HoldingCurrencyRes;
import com.ssafy.api.service.HoldingCurrService;
import com.ssafy.api.service.UserService;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PostMapping("/holdcurr")
    @ApiOperation(value = "보유 통화 등록")
    public ResponseEntity<String> addHoldingCurr(@RequestBody HoldingCurrencyAddReq holdingCurrencyReq){
        String message = holdingCurrService.addHoldingCurr(holdingCurrencyReq);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PatchMapping("/holdcurr")
    @ApiOperation(value = "보유 통화 수정")
    public ResponseEntity<HoldingCurrencyRes> updateHoldingCurr(@RequestBody HoldingCurrencyAddReq holdingCurrencyReq){
        HoldingCurrencyRes dto = holdingCurrService.updateHoldingCurr(holdingCurrencyReq);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }




}
