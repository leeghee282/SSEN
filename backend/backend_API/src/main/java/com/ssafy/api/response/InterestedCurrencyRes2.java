package com.ssafy.api.response;

import com.ssafy.db.entity.InterestedCurrency;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@ApiModel(value = "InterestedCurrencyResponse2", description = "관심 통화 알람 on/off")
public class InterestedCurrencyRes2 {
    @ApiModelProperty(name="uid")
    long uid;
    @ApiModelProperty(name = "notification")
    boolean notification;

    public static InterestedCurrencyRes2 of(Integer statusCode,InterestedCurrency interestedCurrency) {
        return InterestedCurrencyRes2.builder()
                .uid(interestedCurrency.getUid())
                .notification(interestedCurrency.isNotification())
                .build();
    }


}
