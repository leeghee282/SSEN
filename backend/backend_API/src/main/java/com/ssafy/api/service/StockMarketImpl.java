package com.ssafy.api.service;

import com.ssafy.api.response.IntrRateRes;
import com.ssafy.api.response.StockMarketRes;
import com.ssafy.db.entity.InterestRate;
import com.ssafy.db.entity.StockMarket;
import com.ssafy.db.repository.ChatRepository;
import com.ssafy.db.repository.InterestRateRepositorySupport;
import com.ssafy.db.repository.StockMarketRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

/**
 * 유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("StockMarketService")
public class StockMarketImpl implements StockMarketService {
    @Autowired
    StockMarketRepositorySupport stockMarketRepositorySupport;

    @Override
    public List<StockMarketRes> getStockMarketList() {
        List<StockMarketRes> list = new LinkedList<>();
        List<StockMarket> list2= stockMarketRepositorySupport.getStockMarketList();
        for (StockMarket i : list2){
            list.add(StockMarketRes.of(i));
        }

        return list;
    }
}
