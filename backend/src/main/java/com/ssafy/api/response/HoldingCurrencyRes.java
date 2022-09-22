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
@ApiModel(value = "HoldingCurrencyResponse", description = "보유 통화 정보 응답 Dto")
public class HoldingCurrencyRes {
    @ApiModelProperty(name="uid")
    long uid;
    @ApiModelProperty(name="userId")
    String userId;
    @ApiModelProperty(name="code")
    String code;
    @ApiModelProperty(name = "quantity")
    double quantity;
    @ApiModelProperty(name = "price")
    double price;
    @ApiModelProperty(name = "multi")
    double multi;

    public static HoldingCurrencyRes of(HoldingCurrency holdingCurrency) {
        return HoldingCurrencyRes.builder()
                .uid(holdingCurrency.getUid())
                .userId(holdingCurrency.getUser().getUserId())
                .code(holdingCurrency.getCurrencyCategory().getCode())
                .quantity(holdingCurrency.getQuantity())
                .price(holdingCurrency.getPrice())
                .multi(holdingCurrency.getPrice()*holdingCurrency.getQuantity())
                .build();
    }
}
