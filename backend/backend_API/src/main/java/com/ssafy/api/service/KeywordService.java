package com.ssafy.api.service;

import com.ssafy.api.response.KeywordRes;

import java.util.List;

public interface KeywordService {

    List<KeywordRes> getKeywordListByName(String keyword);

}
