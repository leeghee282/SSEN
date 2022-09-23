package com.ssafy.api.service;

import com.ssafy.api.response.ChatRes;
import com.ssafy.api.response.IntrRateRes;
import com.ssafy.db.entity.Chat;
import com.ssafy.db.entity.InterestRate;
import com.ssafy.db.repository.ChatRepository;
import com.ssafy.db.repository.InterestRateRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

/**
 * 유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("IntrRateService")
public class IntrRateServiceImpl implements IntrRateService {
    @Autowired
    UserService userService;
    @Autowired
    CurrencyCategoryService currencyCategoryService;
    @Autowired
    ChatRepository chatRepository;
    @Autowired
    InterestRateRepositorySupport interestRateRepositorySupport;
    @Override
    public List<IntrRateRes> getIntrRate() {
        List<IntrRateRes> list = new LinkedList<>();
        List<InterestRate> list2= interestRateRepositorySupport.findRateList();
        for (InterestRate i : list2){
            list.add(IntrRateRes.of(i));
        }

        return list;
    }
}
