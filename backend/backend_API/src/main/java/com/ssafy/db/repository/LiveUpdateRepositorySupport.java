package com.ssafy.db.repository;

import com.querydsl.core.types.Expression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.api.response.LiveCurrencyRes;
import com.ssafy.api.response.LiveUserRes;
import com.ssafy.db.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.LinkedList;
import java.util.List;

@Repository
public class LiveUpdateRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QLiveCurrency qLiveCurrency = QLiveCurrency.liveCurrency;
    QUser qUser = QUser.user;
    QInterestedCurrency qInterestedCurrency = QInterestedCurrency.interestedCurrency;

    public LiveCurrency findLiveCurrencyByCCUid(long ccUid) {
        LiveCurrency liveCurrency = jpaQueryFactory.select(qLiveCurrency).from(qLiveCurrency).where(qLiveCurrency.currencyCategory.uid.eq(ccUid)).fetchOne();
        return liveCurrency;
    }

    public List<LiveCurrency> getLiveCurrency() {
        List<LiveCurrency> lcList = jpaQueryFactory.select(qLiveCurrency).from(qLiveCurrency).fetch();
        return lcList;
    }

    public List<User> getUserByBuyPrice(LiveCurrencyRes liveCurrencyRes, long ccUid) {
        double price = liveCurrencyRes.getBuyPrice();
        List<User> users = jpaQueryFactory.select(qUser).from(qInterestedCurrency)
                .where(qInterestedCurrency.currencyCategory.uid.eq(ccUid)
                        .and((qInterestedCurrency.target1.between(price * 0.95, price * 1.05))
                                .or(qInterestedCurrency.target2.between(price * 0.95, price * 1.05))
                                .or(qInterestedCurrency.target3.between(price * 0.95, price * 1.05))))
                .fetch();
        return users;
    }

    public List<Double> getTarget(LiveCurrencyRes liveCurrencyRes, long ccUid) {
        double price = liveCurrencyRes.getBuyPrice();
        List<Double> targets = new LinkedList<>();
        List<User> users = jpaQueryFactory.select(qUser).from(qInterestedCurrency)
                .where(qInterestedCurrency.currencyCategory.uid.eq(ccUid)
                        .and((qInterestedCurrency.target1.between(price * 0.95, price * 1.05))
                                .or(qInterestedCurrency.target2.between(price * 0.95, price * 1.05))
                                .or(qInterestedCurrency.target3.between(price * 0.95, price * 1.05))))
                .fetch();
        if (users != null) {
            for (int i = 0; i < users.size(); i++) {
                double target1 = jpaQueryFactory.select(qInterestedCurrency.target1).from(qInterestedCurrency)
                        .where(qInterestedCurrency.user.uid.eq(users.get(i).getUid()).and(qInterestedCurrency.currencyCategory.uid.eq(ccUid))).fetchOne();
                double target2 = jpaQueryFactory.select(qInterestedCurrency.target2).from(qInterestedCurrency)
                        .where(qInterestedCurrency.user.uid.eq(users.get(i).getUid()).and(qInterestedCurrency.currencyCategory.uid.eq(ccUid))).fetchOne();
                double target3 = jpaQueryFactory.select(qInterestedCurrency.target3).from(qInterestedCurrency)
                        .where(qInterestedCurrency.user.uid.eq(users.get(i).getUid()).and(qInterestedCurrency.currencyCategory.uid.eq(ccUid))).fetchOne();
                double target = Math.abs(target1 - price) > Math.abs(target2 - price) ? target2 : target1;
                if (target == target1) {
                    target = Math.abs(target1 - price) > Math.abs(target3 - price) ? target3 : target1;
                } else {
                    target = Math.abs(target2 - price) > Math.abs(target3 - price) ? target3 : target2;
                }
                targets.add(target);
//                System.err.println(target);
            }
        }
        return targets;
    }
}