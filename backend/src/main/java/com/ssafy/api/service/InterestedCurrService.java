package com.ssafy.api.service;

import com.ssafy.api.request.InterestedCurrencyReq;
import com.ssafy.api.response.InterestedCurrencyRes;
import com.ssafy.db.entity.User;

import java.util.List;
import java.util.Map;

public interface InterestedCurrService{
    List<InterestedCurrencyRes> getInterestedCurrByUser(User user);
    Map<String, Object> checkTargetCnt(InterestedCurrencyReq interestedCurrencyReq);
    Map<String, Object> addInterestedCurr(InterestedCurrencyReq interestedCurrencyReq);
    Map<String, Object> updateInterestedCurr(long uid, InterestedCurrencyReq interestedCurrencyReq);
    String deleteInterestedCurr(long uid);
    String deleteTargetInterestedCurr(long uid, double target);
}
