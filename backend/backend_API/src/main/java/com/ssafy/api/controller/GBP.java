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
public class GBP {
    LocalDateTime regdate1 = LocalDateTime.now();
    @Autowired
    LiveCurrencyService liveCurrencyService;
    @Autowired
    LiveUpdateService liveUpdateService;
    @Autowired
    LiveUpdateRepositorySupport liveUpdateRepositorySupport;
    @Autowired
    CurrencyCategoryService currencyCategoryService;

    @Scheduled(fixedRate = 3000)
    public void reportCurrentTime() {
        String str = "";
        String msgSId = "";
        LiveCurrencyRes liveCurrencyRes = liveCurrencyService.findLiveCurrencyByCCUid("GBP");
        LocalDateTime regdate2 = liveCurrencyRes.getRegdate();
        WebSocketHandler webSocketHandler = new WebSocketHandler();
        if (!regdate1.isEqual(regdate2)) {
            webSocketHandler.handleTextMessage2(liveCurrencyRes);
//            System.out.println("==============");
//            System.out.println("regdate1 : " + regdate1 + ",getRegdate : " + liveCurrencyRes.getRegdate());
            double price = liveCurrencyRes.getBuyPrice();
//            System.out.println("code : GBP" + ", buyPrice : " + price + ", regdate : " + liveCurrencyRes.getRegdate());
            regdate1 = liveCurrencyRes.getRegdate();
            List<LiveUserRes> lurList = liveUpdateService.getLiveUserResByBuyPrice(liveCurrencyRes, "GBP");
            // List<Double> targets = liveUpdateRepositorySupport.getTarget(liveCurrencyRes, currencyCategoryService.getCurrencyCategorybyCode("GBP").getUid());

//            System.err.println("여기에요 : "+webSocketHandler.getWebsocketSession());
            for (int i = 0; i < lurList.size(); i++) {

                String[] s = lurList.get(i).getRegdate().toString().split("T");
                msgSId = lurList.get(i).getUserId();
                str = s[1] + " GBP 환율 " + lurList.get(i).getBuyPrice() + ", "
                        + msgSId + "님의 목표 환율 " + lurList.get(i).getTargetPrice() + "원에 도달하였습니다.";
           //     webSocketHandler.handleTextMessage(str);

//                System.out.println(lurList.get(i).getRegdate() + " : 현재 환율" + lurList.get(i).getBuyPrice() + ", "
//                        + lurList.get(i).getUserId() + "님의 GBP 목표 환율 "+lurList.get(i).getTargetPrice()+"원에 도달하였습니다.");
            }
//            System.out.println("==============");
        }
    }
}