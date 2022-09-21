package com.ssafy.api.service;

import com.ssafy.api.request.InterestedCurrencyReq;
import com.ssafy.api.response.HoldingCurrencyRes;
import com.ssafy.api.response.InterestedCurrencyRes;
import com.ssafy.db.entity.CurrencyCategory;
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

    @Override
    public int checkTargetCnt(InterestedCurrencyReq interestedCurrencyReq) {
        int cnt = 0;
        String userId = interestedCurrencyReq.getUserId();
        String code = interestedCurrencyReq.getCode();
        User user = userRepositorySupport.findUserByUserId(userId).get();
        CurrencyCategory currencyCategory = currencyCategoryRepository.findByCode(code);
        InterestedCurrency ic = interestedCurrencyRepository.findByUserAndCurrencyCategory(user, currencyCategory);
        if (ic == null) { // 0개(저장된 통화 없음)
            cnt = -1;
        } else {
            // target 수정, 삭제에서 값을 앞으로 밀 때
//            if (interestedCurrencyReq.getTarget1() == 0)
//                cnt = 0;
//            else if (interestedCurrencyReq.getTarget2() == 0)
//                cnt = 1;
//            else if (interestedCurrencyReq.getTarget3() == 0)
//                cnt = 2;
//            else if (interestedCurrencyReq.getTarget3() != 0)
//                cnt = 3;
            // target 수정, 삭제에서 값을 안 밀 때
            double target[] = {ic.getTarget1(), ic.getTarget2(), ic.getTarget3()};
            for (double t : target) {
                if(t!=0)
                    cnt++;
            }
        }
        return cnt;
    }


    @Override
    public String addInterestedCurr(InterestedCurrencyReq interestedCurrencyReq) {
        // userId와 code가 데이터베이스에 있는 값(존재하는 값)이 들어왔다는 가정
        String message = "";
        String userId = interestedCurrencyReq.getUserId();
        String code = interestedCurrencyReq.getCode();
        User user = userRepositorySupport.findUserByUserId(userId).get();
        CurrencyCategory currencyCategory = currencyCategoryRepository.findByCode(code);
        InterestedCurrency icNew = interestedCurrencyReq.toEntity(user, currencyCategory);
        icNew.setTarget1(interestedCurrencyReq.getTarget());
        interestedCurrencyRepository.save(icNew);
        message = "SUCCESS";
        return message;
    }

}
