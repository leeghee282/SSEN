package com.ssafy.api.service;

import com.ssafy.api.response.HoldingCurrencyRes;
import com.ssafy.api.response.InterestedCurrencyRes;
import com.ssafy.db.entity.HoldingCurrency;
import com.ssafy.db.entity.InterestedCurrency;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.CurrencyCategoryRepository;
import com.ssafy.db.repository.InterestedCurrencyRepository;
import com.ssafy.db.repository.UserRepositorySupport;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class InterestedCurrServiceImpl implements InterestedCurrService {
    private final InterestedCurrencyRepository interestedCurrencyRepository;
    private final UserRepositorySupport userRepositorySupport;
    private final CurrencyCategoryRepository currencyCategoryRepository;

    @Override
    public List<InterestedCurrencyRes> getInterestedCurrByUser(User user) {
        List<InterestedCurrencyRes> dtoList = new LinkedList<>();
        List<InterestedCurrency> interestedCurrencyList = interestedCurrencyRepository.findByUser(user);
        for (InterestedCurrency i : interestedCurrencyList) {
            dtoList.add(InterestedCurrencyRes.of(i));
        }
        return dtoList;
    }
}
