package com.ssafy.api.service;

import com.ssafy.api.request.HoldingCurrencyReq;
import com.ssafy.api.response.HoldingCurrencyRes;
import com.ssafy.db.entity.User;

import java.util.List;

public interface HoldingCurrService {
    List<HoldingCurrencyRes> getHoldingCurrByUser(User user);
    String addHoldingCurr(HoldingCurrencyReq holdingCurrencyReq);
    HoldingCurrencyRes updateHoldingCurr(HoldingCurrencyReq holdingCurrencyReq);
    String deleteHoldingCurr(HoldingCurrencyReq holdingCurrencyReq);
}
