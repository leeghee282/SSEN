package com.ssafy.api.service;

import com.ssafy.api.response.CommissionRes;
import com.ssafy.api.response.ExchangeRateRes;
import com.ssafy.db.entity.BankExchangeRate;

import java.text.ParseException;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface ExchangeRateService {

    List<ExchangeRateRes> getExchangeRatePeriod(Date startDate, Date endDate, String code);
    ExchangeRateRes getExchangeRateOneDay(Date date, String code);
    List<CommissionRes> getCommission(String code);


}
