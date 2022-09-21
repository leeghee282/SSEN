package com.ssafy.api.request;

import com.ssafy.db.entity.CurrencyCategory;
import com.ssafy.db.entity.HoldingCurrency;
import com.ssafy.db.entity.InterestedCurrency;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class InterestedCurrencyReq {
    @ApiModelProperty(name="유저 ID", example="ssafy10")
    private String userId;
    @ApiModelProperty(name="통화 코드", example="USD")
    private String code;
    @ApiModelProperty(name="목표 환율", example="1300")
    private double target;


    public InterestedCurrency toEntity(User user, CurrencyCategory currencyCategory) {
        return InterestedCurrency.builder()
                .user(user)
                .currencyCategory(currencyCategory)
                .build();
    }


}
