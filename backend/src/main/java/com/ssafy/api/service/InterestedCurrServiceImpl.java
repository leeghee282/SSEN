package com.ssafy.api.service;

import com.ssafy.api.request.InterestedCurrencyReq;
import com.ssafy.api.response.InterestedCurrencyRes;
import com.ssafy.db.entity.CurrencyCategory;
import com.ssafy.db.entity.InterestedCurrency;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.CurrencyCategoryRepository;
import com.ssafy.db.repository.InterestedCurrencyRepository;
import com.ssafy.db.repository.UserRepositorySupport;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

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
    public Map<String, Object> addInterestedCurr(InterestedCurrencyReq interestedCurrencyReq) {
        // userId와 code가 데이터베이스에 있는 값(존재하는 값)이 들어왔다는 가정
        Map<String, Object> map = new HashMap<>();
        String message = "FAIL";
        Map<String, Object> checkTarget = this.checkTargetCnt(interestedCurrencyReq);
        int targetCnt = (int)checkTarget.get("cnt");
        User user = (User)checkTarget.get("user");
        CurrencyCategory currencyCategory = (CurrencyCategory)checkTarget.get("cc");
        if (targetCnt == 3) { // 타겟 3개(가득 참)
            message = "FULL";
        } else if(targetCnt == -1){
            InterestedCurrency icNew = interestedCurrencyReq.toEntity(user, currencyCategory);
            icNew.setTarget1(interestedCurrencyReq.getTarget());
            InterestedCurrencyRes added = InterestedCurrencyRes.of(interestedCurrencyRepository.save(icNew));
            message = "SUCCESS(ADD INTRCURR)";
            map.put("dto", added);
        } else{
            double target = interestedCurrencyReq.getTarget();
            InterestedCurrency targetIC = interestedCurrencyRepository.findByUserAndCurrencyCategory(user, currencyCategory);
            InterestedCurrency icAfter = interestedCurrencyReq.toEntity(user, currencyCategory);
            double targetArr[] = {targetIC.getTarget1(), targetIC.getTarget2(), targetIC.getTarget3()};
            for (int i = 0; i < targetArr.length; i++) {
                if (targetArr[i] == target) {
                    message = "DUPLICATE";
                    break;
                }
                if (targetArr[i] == 0) {
                    targetArr[i] = target;
                    message = "SUCCESS(ADD TARGET)";
                    icAfter.setTarget(targetArr);
                    targetIC.patch(icAfter);
                    InterestedCurrencyRes added = InterestedCurrencyRes.of(interestedCurrencyRepository.save(targetIC));
                    map.put("dto", added);
                    break;
                }
            }
        }
        map.put("message", message);
        return map;
    }


    @Override
    public Map<String, Object> updateInterestedCurr(long uid, InterestedCurrencyReq interestedCurrencyReq) {
        Map<String, Object> map = new HashMap<>();
        String message = "FAIL";
        InterestedCurrency targetIC = interestedCurrencyRepository.findByUid(uid);
        if (targetIC != null) {
            InterestedCurrency icAfter = interestedCurrencyReq.toEntity(targetIC.getUser(), targetIC.getCurrencyCategory());
            // target 재설정
            double previous = interestedCurrencyReq.getPrevious();
            double target = interestedCurrencyReq.getTarget();
            if (previous != 0 && target != 0) {
                double targetArr[] = {targetIC.getTarget1(), targetIC.getTarget2(), targetIC.getTarget3()};
                boolean duplicateCheck = false;
                boolean existCheck = false;
                for (int i = 0; i < targetArr.length; i++) {
                    if (targetArr[i] == target) {
                        duplicateCheck = true;
                        break;
                    }
                }
                if (!duplicateCheck) {
                    for (int i = 0; i < targetArr.length; i++) {
                        if (targetArr[i] == previous) {
                            targetArr[i] = target;
                            existCheck = true;
                            icAfter.setTarget(targetArr);
                            targetIC.patch(icAfter);
                            InterestedCurrencyRes updated = InterestedCurrencyRes.of(interestedCurrencyRepository.save(targetIC));
                            map.put("dto", updated);
                            break;
                        }
                    }
                }
                // message 세팅
                if (existCheck) {
                    message = "SUCCESS";
                } else if (duplicateCheck) {
                    message = "DUPLICATE";
                } else {
                    message = "NO VALUE";
                }
            } else {
                message = "ZERO VALUE";
            }
        }
        map.put("message",message);
        return map;
    }

    @Override
    public String deleteInterestedCurr(long uid) {
        // userId와 code가 데이터베이스에 있는 값(존재하는 값)이 들어왔다는 가정
        String message = "";
        InterestedCurrency targetIC = interestedCurrencyRepository.findByUid(uid);
        if (targetIC == null) {
            message = "NO DATA";
        } else {
            interestedCurrencyRepository.delete(targetIC);
            message = "SUCCESS";
        }
        return message;
    }

    @Override
    public String deleteTargetInterestedCurr(String userId, String code, double target) {
        // userId와 code가 데이터베이스에 있는 값(존재하는 값)이 들어왔다는 가정
        String message = "FAIL";
        User user = userRepositorySupport.findUserByUserId(userId).get();
        CurrencyCategory currencyCategory = currencyCategoryRepository.findByCode(code);
        InterestedCurrency targetIC = interestedCurrencyRepository.findByUserAndCurrencyCategory(user, currencyCategory);
        if (targetIC == null) { // 통화 없음
            message = "NO INTRCURR";
        } else {
            double targetArr[] = {targetIC.getTarget1(), targetIC.getTarget2(), targetIC.getTarget3()};
            boolean existCheck = false;
            for (int i = 0; i < targetArr.length; i++) { // target 찾기
                if (targetArr[i] == target) {
                    existCheck = true;
                    targetArr[i] = 0;
                    break;
                }
            }
            if (existCheck) { // target 존재
                if(targetArr[0]==0&&targetArr[1]==0&&targetArr[2]==0){ // 통화 삭제
                    interestedCurrencyRepository.delete(targetIC);
                    message = "SUCCESS(DELETE INTRCURR)";
                }else{ // 0 뒤로 밀기
                    int idx = 0;
                    for (int i = 0; i< targetArr.length; i++){
                        if(targetArr[i] !=0){
                            targetArr[idx] = targetArr[i];
                            idx++;
                        }
                    }
                    while(idx < targetArr.length){
                        targetArr[idx]=0;
                        idx++;
                    }
                    // update to 0
                    targetIC.setTarget(targetArr);
                    interestedCurrencyRepository.save(targetIC);
                    message = "SUCCESS";
                }
            }else{
                message = "NO TARGET";
            }
        }
        return message;

    }


}
