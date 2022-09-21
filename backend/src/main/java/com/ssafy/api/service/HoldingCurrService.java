package com.ssafy.api.service;

import com.ssafy.api.request.HoldingCurrencyAddReq;
import com.ssafy.api.response.HoldingCurrencyRes;
import com.ssafy.db.entity.User;

import java.util.List;

public interface HoldingCurrService {
    List<HoldingCurrencyRes> getHoldingCurrByUser(User user);
    String addHoldingCurr(HoldingCurrencyAddReq holdingCurrencyReq);
    HoldingCurrencyRes updateHoldingCurr(HoldingCurrencyAddReq holdingCurrencyReq);
    String deleteHoldingCurr(HoldingCurrencyAddReq holdingCurrencyReq);
}
