package com.ssafy.api.response;

import com.ssafy.db.entity.LiveCurrency;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@ToString
@ApiModel("LiveCurrencyRes")
public class LiveCurrencyRes {
    @ApiModelProperty(name = "currencyCode", example = "USD")
    String cc2;
    @ApiModelProperty(name = "buyPrice", example = "1300")
    Double buyPrice;
    @ApiModelProperty(name = "sellPrice", example = "1290.55")
    Double sellPrice;
    @ApiModelProperty(name = "highPrice", example = "1320")
    Double highPrice;
    @ApiModelProperty(name = "lowPrice", example = "1280.55")
    Double lowPrice;
    @ApiModelProperty(name = "variancePrice", example = "39.45")
    Double variancePrice;
    @ApiModelProperty(name = "variance", example = "2.5")
    Double variance;
    @ApiModelProperty(name = "기준 날짜", example = "2022-09-20")
    LocalDateTime regdate;

    public static LiveCurrencyRes of(LiveCurrency liveCurrency) {
        return LiveCurrencyRes.builder()
                .cc2(liveCurrency.getCurrencyCategory().getCode())
                .buyPrice(liveCurrency.getBuyPrice())
                .sellPrice(liveCurrency.getSellPrice())
                .highPrice(liveCurrency.getHighPrice())
                .lowPrice(liveCurrency.getLowPrice())
                .variancePrice(liveCurrency.getVariancePrice())
                .variance(liveCurrency.getVariance())
                .regdate(liveCurrency.getRegdate())
                .build();
    }
}
