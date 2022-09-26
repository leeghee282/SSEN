package com.ssafy.api.response;

import com.ssafy.db.entity.HoldingCurrency;
import com.ssafy.db.entity.VarianceKeyword;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Builder
@ApiModel(value = "KeywordResponse", description = "키워드 정보 응답 Dto")
public class KeywordRes {
    @ApiModelProperty(name="uid")
    long uid;
    @ApiModelProperty(name="date")
    Date referenceDate;
    @ApiModelProperty(name="name")
    String name;
    @ApiModelProperty(name = "frequency")
    int frequency;
    // 변동폭(%) 추가?

    public static KeywordRes of(VarianceKeyword varianceKeyword) {
        return KeywordRes.builder()
                .uid(varianceKeyword.getUid())
                .referenceDate(varianceKeyword.getVarianceDate().getReferenceDate())
                .name(varianceKeyword.getName())
                .frequency(varianceKeyword.getFrequency())
                .build();
    }
}
