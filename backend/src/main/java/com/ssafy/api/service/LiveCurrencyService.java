package com.ssafy.api.service;

import com.ssafy.api.response.IntrRateRes;
import com.ssafy.api.response.LiveCurrencyRes;

import java.util.List;

public interface LiveCurrencyService {
    LiveCurrencyRes findLiveCurrencyByCCUid(String currencyCode);
}
