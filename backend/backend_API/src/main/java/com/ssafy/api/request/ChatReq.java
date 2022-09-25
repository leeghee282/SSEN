package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
/**
 * chat 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("ChatRequest")
public class ChatReq {
    @ApiModelProperty(name="유저 nickname", example="보이지않는 손")
    String nickname;
    @ApiModelProperty(name="채팅내용", example="사과전화기 사고싶은데 달러가 너무 비싸네요")
    String content;
    @ApiModelProperty(name="currencyCode", example="USD")
    String currencyCode;
}
