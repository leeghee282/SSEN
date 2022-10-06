package com.ssafy.api.response;

import com.ssafy.db.entity.VarianceKeyword;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@ApiModel(value = "KeywordOneResponse", description = "키워드, 빈도수 응답 Dto")
public class KeywordOneRes {
    @ApiModelProperty(name="name")
    String name;
    @ApiModelProperty(name = "frequency")
    int frequency;

    public static KeywordOneRes of(VarianceKeyword varianceKeyword) {
        return KeywordOneRes.builder()
                .name(varianceKeyword.getName())
                .frequency(varianceKeyword.getFrequency())
                .build();
    }

}
