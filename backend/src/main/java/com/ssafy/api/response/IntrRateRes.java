package com.ssafy.api.response;

import com.ssafy.db.entity.Chat;
import com.ssafy.db.entity.InterestRate;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Builder
@ApiModel("IntRateRes")
public class IntrRateRes {
    @ApiModelProperty(name = "currency_code", example = "USD")
    String currencyCode;
    @ApiModelProperty(name = "rate ", example = "2.5")
    Double rate;
    @ApiModelProperty(name = "기준 날짜", example = "2022-09-20")
    Date regdate;

    public static IntrRateRes of(InterestRate intrRate) {
        return IntrRateRes.builder()
                .currencyCode(intrRate.getCurrencyCategory().getCode())
                .rate(intrRate.getRate())
                .regdate(intrRate.getRegdate())
                .build();
    }
}
