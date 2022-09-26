package com.ssafy.api.controller;

import com.ssafy.api.response.KeywordRes;
import com.ssafy.api.service.ExchangeRateService;
import com.ssafy.api.service.KeywordService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/news")
@Api(tags = {"키워드 검색"})
public class KeywordController {
    private final KeywordService keywordService;

    @GetMapping("/past/{keyword}")
    @ApiOperation(value = "키워드 검색", notes ="키워드를 입력하여 해당 키워드가 포함되며 변동폭이 큰 날짜와 키워드를 반환하는 키워드 정보 조회 기능. \n성공 시 키워드 정보 Res List를 반환.")
    public ResponseEntity<List<KeywordRes>> searchKeyword(@ApiParam(value = "검색할 키워드", example = "서울", required = true)@PathVariable String keyword) {
        List<KeywordRes> dtoList = keywordService.getKeywordListByName(keyword);
        return new ResponseEntity<>(dtoList, HttpStatus.OK);
    }

}
