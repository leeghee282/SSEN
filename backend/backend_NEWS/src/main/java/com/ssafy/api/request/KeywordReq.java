package com.ssafy.api.request;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;


/**
 * 비슷한 키워드 분포를 가지는 날짜 조회 API ([POST] /news/past) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("KewyordRequest")
public class KeywordReq{

    @ApiModelProperty(name="키워드", example = "은행")
    String keyword;
    @ApiModelProperty(name="등장 건수", example = "26")
    int count;

//    public static KeywordReq of(String keyword, int count) {
//        KeywordReq res = new KeywordReq();
//        res.KeywordReq(keyword);
//        res.KeywordReq(count);
//        KeywordReq res;
//    }

    @Override
    public String toString() {
        return keyword+":" +count;
    }
}