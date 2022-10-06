package com.ssafy.api.service;

import com.ssafy.api.response.LiveCurrencyRes;
import com.ssafy.api.response.LiveUserRes;
import com.ssafy.db.entity.LiveCurrency;
import com.ssafy.db.entity.User;

import java.util.List;

public interface LiveUpdateService {
    LiveCurrencyRes findLiveCurrencyByCCUid(String currencyCode);

    List<LiveUserRes> getLiveUserResByBuyPrice(LiveCurrencyRes liveCurrencyRes, String currencyCode);

   // List<LiveUserRes> getLiveUserResByBuyPrice();
}
