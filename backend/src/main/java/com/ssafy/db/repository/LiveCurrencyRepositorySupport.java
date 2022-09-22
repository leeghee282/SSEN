package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.InterestRate;
import com.ssafy.db.entity.QInterestRate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 유저 모델 관련 디비 쿼리 생성을 위한 구현 정의.
 */
@Repository
public class LiveCurrencyRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QLiveCurrency liveCurrency = QLiveCurrency.liveCurrency;

//    public List<InterestRate> findRateList() {
//        List<InterestRate> list = jpaQueryFactory.select(qinterestRate).from(qinterestRate).fetch();
//        return list;
//    }
}
