package com.ssafy.api.service;

import com.ssafy.api.response.CommissionRes;
import com.ssafy.api.response.HoldingCurrencyRes;
import com.ssafy.db.entity.HoldingCurrency;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.HoldingCurrencyRepository;
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

    @Override
    public List<HoldingCurrencyRes> getHoldingCurrByUser(User user) {
        List<HoldingCurrencyRes> dtoList = new LinkedList<>();
        List<HoldingCurrency> holdingCurrencyList = holdingCurrencyRepository.findByUser(user);
        for (HoldingCurrency h : holdingCurrencyList) {
            dtoList.add(HoldingCurrencyRes.of(h));
        }
        return dtoList;
    }
}
