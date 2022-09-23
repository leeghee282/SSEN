package com.ssafy.api.request;

import com.ssafy.db.entity.CurrencyCategory;
import com.ssafy.db.entity.HoldingCurrency;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class HoldingCurrencyReq {
    @ApiModelProperty(name="유저 ID", example="ssafy10")
    private String userId;
    @ApiModelProperty(name="통화 코드", example="USD")
    private String code;
    @ApiModelProperty(name="구매 가격", example="1300")
    private double price;
    @ApiModelProperty(name="구매 수량", example="4")
    private double quantity;

    public HoldingCurrency toEntity(User user, CurrencyCategory currencyCategory) {
        return HoldingCurrency.builder()
                .user(user)
                .currencyCategory(currencyCategory)
                .price(price)
                .quantity(quantity)
                .build();
    }


}
