package com.ssafy.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 키워드로 뉴스 검색 API ([GET] /news/search2/{keyword}) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("NewsResponse2")
public class NewsRes2 {

    @ApiModelProperty(name="제목", example = "포드 공급망 문제로 생산 차질…주가 11년래 최대폭 급락")
    String title;
    @ApiModelProperty(name="언론사", example = "아시아경제")
    String press;
    @ApiModelProperty(name="보도 시각", example = "2022-09-21 14:37:57")
    String time;
    @ApiModelProperty(name="url", example = "https://n.news.naver.com/mnews/article/277/0005150629")
    String url;


    public static NewsRes2 of(String title, String press, String time, String url) {
        NewsRes2 res = new NewsRes2();
        res.setTitle(title);
        res.setPress(press);
        res.setTime(time);
        res.setUrl(url);
        return res;
    }

    @Override
    public String toString() {
        return "NewsRes{" +
                "title='" + title + '\'' +
                ", press='" + press + '\'' +
                ", time='" + time + '\'' +
                ", url='" + url + '\'' +
                '}';
    }
}
