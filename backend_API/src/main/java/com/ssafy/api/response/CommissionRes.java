package com.ssafy.api.response;

import com.ssafy.db.entity.*;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Builder
@ApiModel(value = "BankResponse", description = "은행별 환율 수수료 정보 응답 Dto")
public class CommissionRes {
    @ApiModelProperty(name="uid")
    long uid;
    @ApiModelProperty(name = "bank")
    String bank;
    @ApiModelProperty(name = "commission")
    double commission;
    @ApiModelProperty(name = "basicRate")
    int basicRate;
    @ApiModelProperty(name = "maxRate")
    String maxRate;
    @ApiModelProperty(name = "rateDescription")
    private String rateDescription;
    @ApiModelProperty(name="referenceDate")
    Date referenceDate;

    public static CommissionRes of(BankExchangeRate bankExchangeRate) {
        return CommissionRes.builder()
                .uid(bankExchangeRate.getUid())
                .bank(bankExchangeRate.getBank())
                .commission(bankExchangeRate.getCommission())
                .basicRate(bankExchangeRate.getBasicRate())
                .maxRate(bankExchangeRate.getMaxRate())
                .rateDescription(bankExchangeRate.getRateDescription())
                .referenceDate(bankExchangeRate.getReferenceDate())
                .build();

    }



}
