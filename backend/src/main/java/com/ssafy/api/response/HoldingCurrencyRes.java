package com.ssafy.api.response;

import com.ssafy.db.entity.BankExchangeRate;
import com.ssafy.db.entity.HoldingCurrency;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Builder
@ApiModel(value = "HoldingCurrencyResponse", description = "관심 통화 정보 응답 Dto")
public class HoldingCurrencyRes {
    @ApiModelProperty(name="uid")
    long uid;
    @ApiModelProperty(name = "quantity")
    double quantity;
    @ApiModelProperty(name = "price")
    double price;

    public static HoldingCurrencyRes of(HoldingCurrency holdingCurrency) {
        return HoldingCurrencyRes.builder()
                .uid(holdingCurrency.getUid())
                .quantity(holdingCurrency.getQuantity())
                .price(holdingCurrency.getPrice())
                .build();
    }
}
