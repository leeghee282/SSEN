package com.ssafy.api.service;

import com.ssafy.api.response.ExchangeRateRes;
import com.ssafy.api.response.HoldingCurrencyRes;
import com.ssafy.db.entity.User;

import java.util.Date;
import java.util.List;

public interface HoldingCurrService {
    List<HoldingCurrencyRes> getHoldingCurrByUser(User user);
}
