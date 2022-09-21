package com.ssafy.api.service;

import com.ssafy.api.request.HoldingCurrencyReq;
import com.ssafy.api.request.InterestedCurrencyReq;
import com.ssafy.api.response.HoldingCurrencyRes;
import com.ssafy.api.response.InterestedCurrencyRes;
import com.ssafy.db.entity.InterestedCurrency;
import com.ssafy.db.entity.User;

import java.util.List;

public interface InterestedCurrService{
    List<InterestedCurrencyRes> getInterestedCurrByUser(User user);

    int checkTargetCnt(InterestedCurrencyReq interestedCurrencyReq);
    String addInterestedCurr(InterestedCurrencyReq interestedCurrencyReq);
}
