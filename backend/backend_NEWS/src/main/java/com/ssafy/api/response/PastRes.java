package com.ssafy.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

/**
 * 비슷한 키워드 분포를 가지는 날짜 조회 API ([POST] /news/past) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("PastResponse")
public class PastRes {
    @ApiModelProperty(name="날짜", example = "2022-09-26")
    Date date;
    @ApiModelProperty(name="유사도", example = "75.46")
    double similarity;
    @ApiModelProperty(name="통화코드", example = "USD")
    String currencyCode;
    @ApiModelProperty(name="변동율", example = "10.45")
    double variance;

    public static PastRes of(Date date, double similarity, String currencyCode, double variance) {
        PastRes res = new PastRes();
        res.setDate(date);
        res.setSimilarity(similarity);
        res.setCurrencyCode(currencyCode);
        res.setVariance(variance);
        return res;
    }
}
