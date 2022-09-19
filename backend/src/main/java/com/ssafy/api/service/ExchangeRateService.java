package com.ssafy.api.service;

import com.ssafy.api.response.CommissionRes;
import com.ssafy.api.response.ExchangeRateRes;
import com.ssafy.db.entity.BankExchangeRate;

import java.text.ParseException;
import java.util.Date;
import java.util.List;

public interface ExchangeRateService {

    List<ExchangeRateRes> getExchangeRate(Date startDate, Date endDate, String code);

    List<CommissionRes> getCommission(String code);

}
