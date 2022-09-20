package com.ssafy.api.service;

import com.ssafy.api.request.HoldingCurrencyAddReq;
import com.ssafy.api.response.HoldingCurrencyRes;
import com.ssafy.db.entity.CurrencyCategory;
import com.ssafy.db.entity.HoldingCurrency;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.CurrencyCategoryRepository;
import com.ssafy.db.repository.HoldingCurrencyRepository;
import com.ssafy.db.repository.UserRepositorySupport;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class HoldingCurrServiceImpl implements HoldingCurrService {
    private final HoldingCurrencyRepository holdingCurrencyRepository;
    private final UserRepositorySupport userRepositorySupport;
    private final CurrencyCategoryRepository currencyCategoryRepository;

    @Override
    public List<HoldingCurrencyRes> getHoldingCurrByUser(User user) {
        List<HoldingCurrencyRes> dtoList = new LinkedList<>();
        List<HoldingCurrency> holdingCurrencyList = holdingCurrencyRepository.findByUser(user);
        for (HoldingCurrency h : holdingCurrencyList) {
            dtoList.add(HoldingCurrencyRes.of(h));
        }
        return dtoList;
    }

    @Override
    public String addHoldingCurr(HoldingCurrencyAddReq holdingCurrencyReq) {
        // userId와 code가 데이터베이스에 있는 값(존재하는 값)이 들어왔다는 가정

        String message = "";
        String userId = holdingCurrencyReq.getUserId();
        String code = holdingCurrencyReq.getCode();
        User user = userRepositorySupport.findUserByUserId(userId).get();
        CurrencyCategory currencyCategory = currencyCategoryRepository.findByCode(code);
        // 통화코드 중복 체크(존재 중복 체크)
        HoldingCurrency hcDup = holdingCurrencyRepository.findByUserAndCurrencyCategory(user, currencyCategory);

        if (hcDup != null) {
            message = "DUPLICATE";
        } else {
            HoldingCurrency hc = holdingCurrencyReq.toEntity(user, currencyCategory);
            holdingCurrencyRepository.save(hc);
            message = "SUCCESS";
        }
        return message;
    }

    @Override
    public HoldingCurrencyRes updateHoldingCurr(HoldingCurrencyAddReq holdingCurrencyReq) {

        String userId = holdingCurrencyReq.getUserId();
        String code = holdingCurrencyReq.getCode();
        User user = userRepositorySupport.findUserByUserId(userId).get();
        CurrencyCategory currencyCategory = currencyCategoryRepository.findByCode(code);
        HoldingCurrency target = holdingCurrencyRepository.findByUserAndCurrencyCategory(user, currencyCategory);
        HoldingCurrency hcAfter = HoldingCurrency.builder()
                .quantity(holdingCurrencyReq.getQuantity())
                .price(holdingCurrencyReq.getPrice())
                .user(user)
                .currencyCategory(currencyCategory)
                .build();
        target.patch(hcAfter);

        return null;
    }


}
