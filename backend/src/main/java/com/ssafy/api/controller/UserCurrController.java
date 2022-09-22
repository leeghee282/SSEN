package com.ssafy.api.controller;

import com.ssafy.api.request.HoldingCurrencyReq;
import com.ssafy.api.request.InterestedCurrencyReq;
import com.ssafy.api.response.HoldingCurrencyRes;
import com.ssafy.api.response.InterestedCurrencyRes;
import com.ssafy.api.service.HoldingCurrService;
import com.ssafy.api.service.InterestedCurrService;
import com.ssafy.api.service.UserService;
import com.ssafy.db.entity.User;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import retrofit2.http.Path;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/*
 * 사용자 부가 기능(보유 통화 , 관심 통화)
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
@Api(tags = {"사용자 부가 기능 API(보유 통화, 관심 통화)"})
public class UserCurrController {
    private final UserService userService;
    private final HoldingCurrService holdingCurrService;
    private final InterestedCurrService interestedCurrService;

    @GetMapping("/holdcurr/{userId}")
    @ApiOperation(value = "보유 통화 조회", notes ="사용자 아이디에 따른 보유 통화 정보 조회 기능. \n성공 시 보유 통화 정보 Res List를 반환.")
    public ResponseEntity<List<HoldingCurrencyRes>> getHoldingCurr(@ApiParam(value = "사용자 아이디", example = "ssafy10", required = true)@PathVariable String userId) {
        List<HoldingCurrencyRes> dtoList = null;

        User user = userService.getUserByUserId(userId);
        dtoList = holdingCurrService.getHoldingCurrByUser(user);

        return new ResponseEntity<>(dtoList, HttpStatus.OK);
    }

    @PostMapping("/holdcurr")
    @ApiOperation(value = "보유 통화 등록", notes ="보유 통화 등록 기능. \nmap 반환(message, dto)\n" +
            "\n성공 => 성공: SUCCESS + 등록한 데이터 dto" +
            "\n실패 => 이미 들어있던 통화: DUPLICATE")
    public ResponseEntity<Map<String, Object>> addHoldingCurr(@RequestBody HoldingCurrencyReq holdingCurrencyReq) {
        Map<String, Object> dto = holdingCurrService.addHoldingCurr(holdingCurrencyReq);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @PatchMapping("/holdcurr/{uid}")
    @ApiOperation(value = "보유 통화 수정", notes ="보유 통화 수정 기능. \nmap 반환(message, dto)\n" +
            "\n성공 => 성공: SUCCESS + 수정한 데이터 dto" +
            "\n실패 => 없는 통화: NO DATA | 기타 실패: FAIL")
    public ResponseEntity<Map<String, Object>> updateHoldingCurr(@PathVariable long uid, @RequestBody HoldingCurrencyReq holdingCurrencyReq) {
        Map<String, Object> dto = holdingCurrService.updateHoldingCurr(uid, holdingCurrencyReq);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @DeleteMapping("/holdcurr/{userId}/{code}")
    @ApiOperation(value = "보유 통화 삭제", notes ="보유 통화 삭제 기능. \nString 반환\n" +
            "\n성공 => 성공: SUCCESS" +
            "\n실패 => 없는 통화: NO DATA")
    public ResponseEntity<String> deleteHoldingCurr(@ApiParam(value = "사용자 아이디", example = "ssafy10", required = true)@PathVariable String userId,
                                                    @ApiParam(value = "통화코드", example = "USD", required = true)@PathVariable String code) {
        String message = holdingCurrService.deleteHoldingCurr(userId, code);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

//    =================================================================================================================

    @GetMapping("/intrcurr/{userId}")
    @ApiOperation(value = "관심 통화 조회", notes ="사용자 아이디에 따른 관심 통화 정보 조회 기능. \n성공 시 관심 통화 정보 Res List를 반환.")
    public ResponseEntity<List<InterestedCurrencyRes>> getInterestedCurr(@ApiParam(value = "사용자 아이디", example = "ssafy10", required = true)@PathVariable String userId) {
        List<InterestedCurrencyRes> dtoList = null;

        User user = userService.getUserByUserId(userId);
        dtoList = interestedCurrService.getInterestedCurrByUser(user);

        return new ResponseEntity<>(dtoList, HttpStatus.OK);
    }

    @PostMapping("/intrcurr")
    @ApiOperation(value = "관심 통화 등록", notes ="관심 통화 등록 기능. \nmap 반환(message, dto)\n" +
            "\n성공 => 성공: SUCCESS(ADD TARGET)/SUCCESS(ADD INTRCURR), + 등록한 데이터 dto" +
            "\n실패 => 이미 들어있던 금액: DUPLICATE | target 다 참: FULL | 기타 실패: FAIL")
    public ResponseEntity<Map<String, Object>> addInterestedCurr(@RequestBody InterestedCurrencyReq interestedCurrencyReq) {
        Map<String, Object> dto = interestedCurrService.addInterestedCurr(interestedCurrencyReq);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @PatchMapping("/intrcurr")
    @ApiOperation(value = "관심 통화 수정", notes ="관심 통화 수정 기능. \nmap 반환(message, dto)\n" +
            "\n성공 => 성공: SUCCESS + 수정한 데이터 dto " +
            "\n실패 => 이미 들어있던 금액: DUPLICATE | 0 들어옴: ZERO VALUE | 없는 금액이 previous 들어옴: NO VALUE")
    public ResponseEntity<Map<String, Object>> updateInterestedCurr(@RequestBody InterestedCurrencyReq interestedCurrencyReq) {
        Map<String, Object> dto = interestedCurrService.updateInterestedCurr(interestedCurrencyReq);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @DeleteMapping("/intrcurr/{userId}/{code}")
    @ApiOperation(value = "관심 통화 삭제", notes ="관심 통화 삭제 기능. \nString 반환\n" +
            "\n성공 => 성공: SUCCESS" +
            "\n실패 => 없는 통화: NO DATA")
    public ResponseEntity<String> deleteInterestedCurr(@ApiParam(value = "사용자 아이디", example = "ssafy10", required = true)@PathVariable String userId,
                                                       @ApiParam(value = "통화코드", example = "USD", required = true)@PathVariable String code) {
        String message = interestedCurrService.deleteInterestedCurr(userId, code);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @DeleteMapping("/intrcurr/{userId}/{code}/{target}")
    @ApiOperation(value = "관심 통화 타겟 삭제", notes ="관심 통화 타겟 삭제 기능. \nString 반환\n" +
            "\n성공 => 성공: SUCCESS" +
            "\n실패 => target이 하나만 있을 때 타겟 삭제: SUCCESS(DELETE INTRCURR) | 없는 통화: NO INTRCURR | 타겟 없음: NO TARGET | 기타 실패: FAIL")
    public ResponseEntity<String> deleteTargetInterestedCurr(@ApiParam(value = "사용자 아이디", example = "ssafy10", required = true)@PathVariable String userId,
                                                             @ApiParam(value = "통화코드", example = "USD", required = true)@PathVariable String code,
                                                             @ApiParam(value = "타겟(목표환율)", example = "1200", required = true)@PathVariable String target) {
        String message = interestedCurrService.deleteTargetInterestedCurr(userId, code, Double.parseDouble(target));
        return new ResponseEntity<>(message, HttpStatus.OK);
    }


}
