package com.ssafy.api.service;

import com.ssafy.api.response.KeywordRes;
import com.ssafy.db.entity.VarianceTop;

import java.util.Date;
import java.util.List;

public interface KeywordService {

    VarianceTop getVarianceTopByDate(Date date);

}
