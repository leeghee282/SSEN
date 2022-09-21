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

import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

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
    public Map<String, Object> checkTargetCnt(InterestedCurrencyReq interestedCurrencyReq) {
        Map<String, Object> res = new LinkedHashMap<>();
        int cnt = 0;
        String userId = interestedCurrencyReq.getUserId();
        String code = interestedCurrencyReq.getCode();
        User user = userRepositorySupport.findUserByUserId(userId).get();
        CurrencyCategory currencyCategory = currencyCategoryRepository.findByCode(code);
        InterestedCurrency ic = interestedCurrencyRepository.findByUserAndCurrencyCategory(user, currencyCategory);
        if (ic == null) { // 0개(저장된 통화 없음)
            cnt = -1;
        } else {
            double target[] = {ic.getTarget1(), ic.getTarget2(), ic.getTarget3()};
            for (double t : target) {
                if (t != 0)
                    cnt++;
            }
        }
        res.put("cnt", cnt);
        res.put("user", user);
        res.put("cc", currencyCategory);
        return res;
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

    //   =================================================================================================


    @Override
    public String updateTargetInterestedCurr(Map<String, Object> map, InterestedCurrencyReq interestedCurrencyReq) {
        String message = "";
        int targetCnt = (int)map.get("cnt");
        double target = interestedCurrencyReq.getTarget();
        if (targetCnt != -1) { // add
            InterestedCurrency targetIC = interestedCurrencyRepository.findByUserAndCurrencyCategory((User) map.get("user"), (CurrencyCategory) map.get("cc"));
            InterestedCurrency icAfter = interestedCurrencyReq.toEntity((User) map.get("user"), (CurrencyCategory) map.get("cc"));
            double targetBefore[] = {targetIC.getTarget1(), targetIC.getTarget2(), targetIC.getTarget3()};
            for (double t : targetBefore) {
                if(t==target){
                    message = "DUPLICATE";
                    break;
                }
                if(t==0){

                }
            }
        }else{ // edit

        }
//        String userId = holdingCurrencyReq.getUserId();
//        String code = holdingCurrencyReq.getCode();
//        User user = userRepositorySupport.findUserByUserId(userId).get();
//        CurrencyCategory currencyCategory = currencyCategoryRepository.findByCode(code);
//        HoldingCurrency target = holdingCurrencyRepository.findByUserAndCurrencyCategory(user, currencyCategory);
//        HoldingCurrency hcAfter = holdingCurrencyReq.toEntity(user, currencyCategory);
//        target.patch(hcAfter);
//        System.out.println(target.getPrice());
//        HoldingCurrency updated = holdingCurrencyRepository.save(target);
//        return HoldingCurrencyRes.of(updated);

        return null;
    }


}
