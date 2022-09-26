package com.ssafy.api.response;

import com.ssafy.db.entity.HoldingCurrency;
import com.ssafy.db.entity.InterestedCurrency;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@ApiModel(value = "InterestedCurrencyResponse", description = "관심 통화 정보 응답 Dto")
public class InterestedCurrencyRes {
    @ApiModelProperty(name="uid")
    long uid;
    @ApiModelProperty(name="userId")
    String userId;
    @ApiModelProperty(name="code")
    String code;
    @ApiModelProperty(name = "target1")
    double target1;
    @ApiModelProperty(name = "target2")
    double target2;
    @ApiModelProperty(name = "target3")
    double target3;

    public static InterestedCurrencyRes of(InterestedCurrency interestedCurrency) {
        return InterestedCurrencyRes.builder()
                .uid(interestedCurrency.getUid())
                .userId(interestedCurrency.getUser().getUserId())
                .code(interestedCurrency.getCurrencyCategory().getCode())
                .target1(interestedCurrency.getTarget1())
                .target2(interestedCurrency.getTarget2())
                .target3(interestedCurrency.getTarget3())
                .build();
    }
}
