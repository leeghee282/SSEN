package com.ssafy.api.service;

import com.ssafy.api.request.InterestedCurrencyReq;
import com.ssafy.api.response.InterestedCurrencyRes;
import com.ssafy.db.entity.User;

import java.util.List;
import java.util.Map;

public interface InterestedCurrService{
    List<InterestedCurrencyRes> getInterestedCurrByUser(User user);
    Map<String, Object> checkTargetCnt(InterestedCurrencyReq interestedCurrencyReq);
    String addInterestedCurr(InterestedCurrencyReq interestedCurrencyReq);
    String addTargetInterestedCurr(Map<String, Object> map, InterestedCurrencyReq interestedCurrencyReq);
    String updateInterestedCurr(Map<String, Object> map, InterestedCurrencyReq interestedCurrencyReq);
    String deleteInterestedCurr(String userId, String code);
}
