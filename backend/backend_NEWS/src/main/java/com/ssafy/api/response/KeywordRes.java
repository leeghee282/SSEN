package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;


/**
 * 뉴스 키워드 분석 API ([GET] /news/keyword/{start_date}/{end_date}) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("KeywordResponse")
public class KeywordRes {

    @ApiModelProperty(name="키워드", example = "은행")
    String keyword;
    @ApiModelProperty(name="등장 건수", example = "26")
    int count;

    public static KeywordRes of(String keyword, int count) {
        KeywordRes res = new KeywordRes();
        res.setKeyword(keyword);
        res.setCount(count);
        return res;
    }

    @Override
    public String toString() {
        return keyword+":" +count;
    }
}