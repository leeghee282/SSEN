package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.InterestRate;
import com.ssafy.db.entity.QInterestRate;
import com.ssafy.db.entity.QStockMarket;
import com.ssafy.db.entity.StockMarket;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 유저 모델 관련 디비 쿼리 생성을 위한 구현 정의.
 */
@Repository
public class StockMarketRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QStockMarket qstockMarket = QStockMarket.stockMarket;

    public List<StockMarket> getStockMarketList() {
        List<StockMarket> list = jpaQueryFactory.select(qstockMarket).from(qstockMarket).fetch();
        return list;
    }
}
