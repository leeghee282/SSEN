package com.ssafy.api.service;

import com.ssafy.api.response.LiveCurrencyRes;
import com.ssafy.api.response.LiveUserRes;
import com.ssafy.db.entity.LiveCurrency;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.LiveCurrencyRepositorySupport;
import com.ssafy.db.repository.LiveUpdateRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

/**
 * 유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("LiveUpdateService")
public class LiveUpdateServiceImpl implements LiveUpdateService {

    @Autowired
    LiveCurrencyRepositorySupport liveCurrencyRepositorySupport;
    @Autowired
    CurrencyCategoryService currencyCategoryService;
    @Autowired
    LiveUpdateRepositorySupport liveUpdateRepositorySupport;

    @Autowired
    LiveCurrencyService liveCurrencyService;
    @Autowired
    LiveUpdateService liveUpdateService;

    @Override
    public LiveCurrencyRes findLiveCurrencyByCCUid(String currencyCode) {
        long ccUid = currencyCategoryService.getCurrencyCategorybyCode(currencyCode).getUid();
        LiveCurrency lc = liveCurrencyRepositorySupport.findLiveCurrencyByCCUid(ccUid);
        if (lc == null) {
            return null;
        }
        LiveCurrencyRes lcs = LiveCurrencyRes.of(lc);
        return lcs;
    }

    @Override
    public List<LiveUserRes> getLiveUserResByBuyPrice(LiveCurrencyRes liveCurrencyRes, String currencyCode) {
        List<LiveUserRes> lur = new LinkedList<>();
        long ccUid = currencyCategoryService.getCurrencyCategorybyCode(currencyCode).getUid();
        List<User> users = liveUpdateRepositorySupport.getUserByBuyPrice(liveCurrencyRes, ccUid);
        List<Double> targets = liveUpdateRepositorySupport.getTarget(liveCurrencyRes, ccUid);
        for (int i = 0; i < users.size(); i++) {
            lur.add(LiveUserRes.of(liveCurrencyRes, users.get(i), targets.get(i)));
        }
        return lur;
    }

//    @Override
//    public List<LiveUserRes> getLiveUserResByBuyPrice(LiveCurrencyRes liveCurrencyRes, String currencyCode) {
//        LiveCurrencyRes liveCurrency = liveCurrencyService.findLiveCurrencyByCCUid("USD");
//        List<LiveUserRes> lurList = liveUpdateService.getLiveUserResByBuyPrice(liveCurrency, "USD");
//        return lurList;
//    }

}
