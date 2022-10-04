package com.ssafy.api.response;

import com.ssafy.db.entity.LiveCurrency;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@ToString
@ApiModel("LiveUserRes")
public class LiveUserRes {
    @ApiModelProperty(name = "currencyCode", example = "USD")
    String currencyCode;
    @ApiModelProperty(name = "buyPrice", example = "1300")
    Double buyPrice;
    @ApiModelProperty(name = "targetPrice", example = "1305")
    Double targetPrice;
    @ApiModelProperty(name = "userId", example = "ssafy123")
    String userId;
    @ApiModelProperty(name = "name", example = "김싸피")
    String name;
    @ApiModelProperty(name = "기준 날짜", example = "2022-09-20")
    LocalDateTime regdate;

    public static LiveUserRes of(LiveCurrencyRes liveCurrencyRes, User user, Double target) {
        return LiveUserRes.builder()
                .currencyCode(liveCurrencyRes.getCc2())
                .buyPrice(liveCurrencyRes.getBuyPrice())
                .targetPrice(target)
                .userId(user.getUserId())
                .name(user.getName())
                .regdate(liveCurrencyRes.getRegdate())
                .build();
    }
}
