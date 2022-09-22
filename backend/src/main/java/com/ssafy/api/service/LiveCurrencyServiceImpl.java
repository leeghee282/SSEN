package com.ssafy.api.service;

import com.ssafy.api.response.IntrRateRes;
import com.ssafy.api.response.LiveCurrencyRes;
import com.ssafy.db.entity.CurrencyCategory;
import com.ssafy.db.entity.InterestRate;
import com.ssafy.db.entity.LiveCurrency;
import com.ssafy.db.repository.ChatRepository;
import com.ssafy.db.repository.CurrencyCategoryRepository;
import com.ssafy.db.repository.InterestRateRepositorySupport;
import com.ssafy.db.repository.LiveCurrencyRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

/**
 * 유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("LiveCurrencyService")
public class LiveCurrencyServiceImpl implements LiveCurrencyService {

    @Autowired
    LiveCurrencyRepositorySupport liveCurrencyRepositorySupport;
    @Autowired
    CurrencyCategoryService currencyCategoryService;
    @Override
    public LiveCurrencyRes findLiveCurrencyByCCUid(String currencyCode) {
        System.err.println("여기: " +currencyCode );
        long ccUid = currencyCategoryService.getCurrencyCategorybyCode(currencyCode).getUid();
        System.err.println("uid: " +ccUid );
        LiveCurrency lc = liveCurrencyRepositorySupport.findLiveCurrencyByCCUid(ccUid);
        if(lc==null){
            return null;
        }
        LiveCurrencyRes lcs = LiveCurrencyRes.of(lc);
        System.err.println("lcs : "+ lcs);
        return lcs;
    }
}
