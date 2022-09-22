package com.ssafy.api.service;

import com.ssafy.api.response.IntrRateRes;
import com.ssafy.api.response.StockMarketRes;

import java.util.List;

/**
 *	chat 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface StockMarketService {
    List<StockMarketRes> getStockMarketList();
}
