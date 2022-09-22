package com.ssafy.api.service;

import com.ssafy.api.request.HoldingCurrencyReq;
import com.ssafy.api.response.HoldingCurrencyRes;
import com.ssafy.db.entity.User;

import java.util.List;
import java.util.Map;

public interface HoldingCurrService {
    List<HoldingCurrencyRes> getHoldingCurrByUser(User user);
    Map<String, Object> addHoldingCurr(HoldingCurrencyReq holdingCurrencyReq);
    HoldingCurrencyRes updateHoldingCurr(HoldingCurrencyReq holdingCurrencyReq);
    String deleteHoldingCurr(String userId, String code);
}
