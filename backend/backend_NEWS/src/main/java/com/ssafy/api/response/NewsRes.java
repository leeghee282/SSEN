package com.ssafy.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 키워드로 뉴스 검색 API ([GET] /news/search/{keyword}) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("NewsResponse")
public class NewsRes {

    @ApiModelProperty(name="제목", example = "포드 공급망 문제로 생산 차질…주가 11년래 최대폭 급락")
    String title;
    @ApiModelProperty(name="내용", example = "납품업체 비용 예상보다 10억달러 늘어 사진 제공 AP연합뉴스 미국 자동차업체 포드 주가가 20일 현지시간 12.3% 폭락해 11년 만에 최대 하락을 기록했다고 CNBC가 이날 보도했다. ...")
    String content;
    @ApiModelProperty(name="언론사", example = "아시아경제")
    String press;
    @ApiModelProperty(name="보도 시각", example = "2022-09-21 14:37:57")
    String time;
    @ApiModelProperty(name="url", example = "https://n.news.naver.com/mnews/article/277/0005150629")
    String url;


    public static NewsRes of(String title, String content, String press, String time, String url) {
        NewsRes res = new NewsRes();
        res.setTitle(title);
        res.setContent(content);
        res.setPress(press);
        res.setTime(time);
        res.setUrl(url);
        return res;
    }

    @Override
    public String toString() {
        return "NewsRes{" +
                "title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", press='" + press + '\'' +
                ", time='" + time + '\'' +
                ", url='" + url + '\'' +
                '}';
    }
}
