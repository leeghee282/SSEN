package com.ssafy.api.response;

import com.ssafy.db.entity.Chat;
import com.ssafy.db.entity.StockMarket;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@Builder
@ApiModel("ChatResponse")
public class StockMarketRes {
    @ApiModelProperty(name = "증시 이름", example = "코스닥")
    String name;
    @ApiModelProperty(name = "종가", example = "754.89")
    double closePrice;
    @ApiModelProperty(name = "고가", example = "761.89")
    double highPrice;
    @ApiModelProperty(name = "저가 ", example = "751.89")
    double lowPrice;
    @ApiModelProperty(name = "변동률", example = "5.6")
    double variance;
    @ApiModelProperty(name = "증시 기준 날짜, 시간", example = "2022-09-20 14:23:41")
    LocalDateTime regdate;

    public static StockMarketRes of(StockMarket sm) {
        return StockMarketRes.builder()
                .name(sm.getName())
                .closePrice(sm.getClosePrice())
                .highPrice(sm.getHighPrice())
                .lowPrice(sm.getLowPrice())
                .variance(sm.getVariance())
                .regdate(sm.getRegdate())
                .build();
    }
}
