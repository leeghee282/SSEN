package com.ssafy.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 비슷한 키워드 분포를 가지는 날짜 조회 API ([POST] /news/past) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("PastResponse")
public class PastRes {
    @ApiModelProperty(name="날짜", example = "2022-09-26")
    String date;
    @ApiModelProperty(name="유사도", example = "75.46")
    double value;
    @ApiModelProperty(name="통화코드", example = "USD")
    String currency_code;
    @ApiModelProperty(name="변동율", example = "10.45")
    double variance;

    public static PastRes of(String date, double value, String currency_code, double variance) {
        PastRes res = new PastRes();
        res.setDate(date);
        res.setValue(value);
        res.setCurrency_code(currency_code);
        res.setVariance(variance);
        return res;
    }
}
