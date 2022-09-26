package com.ssafy.api.response;

import com.ssafy.db.entity.HoldingCurrency;
import com.ssafy.db.entity.VarianceKeyword;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import javassist.compiler.ast.Keyword;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

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
    @ApiModelProperty(name = "keywordList")
    List<KeywordOneRes> keywordsByDate;

    public static KeywordRes of(VarianceKeyword varianceKeyword) {
        return KeywordRes.builder()
                .uid(varianceKeyword.getUid())
                .referenceDate(varianceKeyword.getVarianceDate().getReferenceDate())
                .name(varianceKeyword.getName())
                .frequency(varianceKeyword.getFrequency())
                .build();
    }
    public static KeywordRes of(VarianceKeyword varianceKeyword, List<KeywordOneRes> keywords) {
        return KeywordRes.builder()
                .uid(varianceKeyword.getUid())
                .referenceDate(varianceKeyword.getVarianceDate().getReferenceDate())
                .name(varianceKeyword.getName())
                .frequency(varianceKeyword.getFrequency())
                .keywordsByDate(keywords)
                .build();
    }

    public static KeywordRes of(List<KeywordOneRes> keywords) {
        return KeywordRes.builder()
                .keywordsByDate(keywords)
                .build();
    }
}
