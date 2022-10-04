package com.ssafy.api.controller;

import com.ssafy.api.response.LiveCurrencyRes;
import com.ssafy.api.response.LiveUserRes;
import com.ssafy.api.service.CurrencyCategoryService;
import com.ssafy.api.service.LiveCurrencyService;
import com.ssafy.api.service.LiveUpdateService;
import com.ssafy.common.exception.handler.WebSocketHandler;
import com.ssafy.db.repository.LiveUpdateRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class CNY {
    LocalDateTime regdate1 = LocalDateTime.now();
    LocalDateTime regdate3 = LocalDateTime.now();
    @Autowired
    LiveCurrencyService liveCurrencyService;
    @Autowired
    LiveUpdateService liveUpdateService;
    @Autowired
    LiveUpdateRepositorySupport liveUpdateRepositorySupport;
    @Autowired
    CurrencyCategoryService currencyCategoryService;

    @Scheduled(fixedRate = 3000)
    public void  LiveCurrency() {
        //실시간 환율 받아오기
        LiveCurrencyRes liveCurrencyRes = liveCurrencyService.findLiveCurrencyByCCUid("CNY");
        LocalDateTime regdate2 = liveCurrencyRes.getRegdate();
        WebSocketHandler webSocketHandler = new WebSocketHandler();
        //시간이 업데이트 되었으면
        if (!regdate1.isEqual(regdate2)) {
            //실시간 환율 보내기
            webSocketHandler.handleTextMessage2(liveCurrencyRes);
            regdate1 = liveCurrencyRes.getRegdate();
        }
    }
    @Scheduled(fixedRate = 60*1000)
    public void push() {
        //실시간 환율 받아오기
        LiveCurrencyRes liveCurrencyRes = liveCurrencyService.findLiveCurrencyByCCUid("CNY");
        LocalDateTime regdate2 = liveCurrencyRes.getRegdate();
        WebSocketHandler webSocketHandler = new WebSocketHandler();
        //시간이 업데이트 되었으면
        if (!regdate3.isEqual(regdate2)) {
            regdate3 = liveCurrencyRes.getRegdate();
            //push알림 res
            List<LiveUserRes> lurList = liveUpdateService.getLiveUserResByBuyPrice(liveCurrencyRes, "CNY");
            for (int i = 0; i < lurList.size(); i++) {
                //push알림 보내기
                webSocketHandler.handleTextMessage(lurList.get(i));

            }
        }
    }
}