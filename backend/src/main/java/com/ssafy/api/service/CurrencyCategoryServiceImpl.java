package com.ssafy.api.service;

import com.ssafy.api.response.CommissionRes;
import com.ssafy.api.response.ExchangeRateRes;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.LinkedList;
import java.util.List;


@Service("chatService")
public class CurrencyCategoryServiceImpl implements CurrencyCategoryService {

    @Autowired
    CurrencyCategoryRepository currencyCategoryRepository;

    @Override
    public CurrencyCategory getCurrencyCategorybyCode(String code) {
        CurrencyCategory currencyCategory = currencyCategoryRepository.findByCode(code);
        return currencyCategory;
    }
}
