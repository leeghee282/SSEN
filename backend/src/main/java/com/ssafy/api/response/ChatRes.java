package com.ssafy.api.response;

import com.ssafy.db.entity.Chat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Builder
@ApiModel("ChatResponse")
public class ChatRes {
    @ApiModelProperty(name = "채팅 개별 uid", example = "12")
    long uid;
    @ApiModelProperty(name = "유저 nickname", example = "보이지않는 손")
    String nickname;
    @ApiModelProperty(name = "채팅내용", example = "사과전화기 사고싶은데 달러가 너무 비싸네요")
    String content;
    @ApiModelProperty(name = "currencyCode", example = "USD")
    String currencyCode;
    @ApiModelProperty(name = "채팅 작성 날짜, 시간", example = "2022-09-20 14:23:41")
    Date regdate;

    public static ChatRes of(Chat chat) {
        return ChatRes.builder()
                .uid(chat.getUid())
                .currencyCode(chat.getCurrencyCategory().getCode())
                .nickname(chat.getUser().getNickname())
                .content(chat.getContent())
                .regdate(chat.getRegdate())
                .build();
    }
}
