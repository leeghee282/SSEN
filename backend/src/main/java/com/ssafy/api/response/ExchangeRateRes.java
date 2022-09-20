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
@ApiModel(value = "ExchangeRateResponse", description = "환율 정보 응답 Dto")
public class ExchangeRateRes {
    @ApiModelProperty(name="uid")
    long uid;
    @ApiModelProperty(name="regedate")
    Date regdate;
    @ApiModelProperty(name = "close_price")
    double closePrice;
    @ApiModelProperty(name = "open_price")
    double openPrice;
    @ApiModelProperty(name = "high_price")
    double highPrice;
    @ApiModelProperty(name = "low_price")
    double lowPrice;
    @ApiModelProperty(name = "variance")
    double variance;

    public static ExchangeRateRes of(UsdKrw usdKrw) { // 달러(USD)
        return ExchangeRateRes.builder()
                .uid(usdKrw.getUid())
                .regdate(usdKrw.getRegdate())
                .closePrice(usdKrw.getClosePrice())
                .openPrice(usdKrw.getOpenPrice())
                .highPrice(usdKrw.getHighPrice())
                .lowPrice(usdKrw.getLowPrice())
                .variance(usdKrw.getVariance())
                .build();

    }

    public static ExchangeRateRes of(JpyKrw jpyKrw) { // 엔(JPY)
        return ExchangeRateRes.builder()
                .uid(jpyKrw.getUid())
                .regdate(jpyKrw.getRegdate())
                .closePrice(jpyKrw.getClosePrice())
                .openPrice(jpyKrw.getOpenPrice())
                .highPrice(jpyKrw.getHighPrice())
                .lowPrice(jpyKrw.getLowPrice())
                .variance(jpyKrw.getVariance())
                .build();

    }

    public static ExchangeRateRes of(EurKrw eurKrw) { // 유로(EUR)
        return ExchangeRateRes.builder()
                .uid(eurKrw.getUid())
                .regdate(eurKrw.getRegdate())
                .closePrice(eurKrw.getClosePrice())
                .openPrice(eurKrw.getOpenPrice())
                .highPrice(eurKrw.getHighPrice())
                .lowPrice(eurKrw.getLowPrice())
                .variance(eurKrw.getVariance())
                .build();

    }

    public static ExchangeRateRes of(GbpKrw gbpKrw) { // 파운드(GBP)
        return ExchangeRateRes.builder()
                .uid(gbpKrw.getUid())
                .regdate(gbpKrw.getRegdate())
                .closePrice(gbpKrw.getClosePrice())
                .openPrice(gbpKrw.getOpenPrice())
                .highPrice(gbpKrw.getHighPrice())
                .lowPrice(gbpKrw.getLowPrice())
                .variance(gbpKrw.getVariance())
                .build();

    }

    public static ExchangeRateRes of(CnyKrw cnyKrw) { // 위안(CNY)
        return ExchangeRateRes.builder()
                .uid(cnyKrw.getUid())
                .regdate(cnyKrw.getRegdate())
                .closePrice(cnyKrw.getClosePrice())
                .openPrice(cnyKrw.getOpenPrice())
                .highPrice(cnyKrw.getHighPrice())
                .lowPrice(cnyKrw.getLowPrice())
                .variance(cnyKrw.getVariance())
                .build();

    }

//    public static ExchangeRateRes of(QUsdKrw usdKrw) {
//        return ExchangeRateRes.builder()
//                .uid(usdKrw.getUid())
//                .regdate(usdKrw.getRegdate())
//                .closePrice(usdKrw.getClosePrice())
//                .openPrice(usdKrw.getOpenPrice())
//                .highPrice(usdKrw.getHighPrice())
//                .lowPrice(usdKrw.getLowPrice())
//                .variance(usdKrw.getVariance())
//                .build();
//
//    }
}
