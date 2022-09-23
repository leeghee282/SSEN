package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.InterestRate;
import com.ssafy.db.entity.LiveCurrency;
import com.ssafy.db.entity.QInterestRate;
import com.ssafy.db.entity.QLiveCurrency;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class LiveCurrencyRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QLiveCurrency qLiveCurrency = QLiveCurrency.liveCurrency;

    public LiveCurrency findLiveCurrencyByCCUid(long ccUid) {
        LiveCurrency liveCurrency = jpaQueryFactory.select(qLiveCurrency).from(qLiveCurrency).where(qLiveCurrency.currencyCategory.uid.eq(ccUid)).fetchOne();
        return liveCurrency;
    }

    public List<LiveCurrency> getLiveCurrency() {
        List<LiveCurrency> lcList = jpaQueryFactory.select(qLiveCurrency).from(qLiveCurrency).fetch();
        return  lcList;
    }
}
