package com.ssafy.api.service;

import com.ssafy.api.response.ExchangeRateRes;
import com.ssafy.db.entity.UsdKrw;
import com.ssafy.db.repository.UsdKrwRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

import static com.ssafy.db.entity.QUsdKrw.usdKrw;


@Service
@RequiredArgsConstructor
@Transactional
public class ExchangeRateServiceImpl implements ExchangeRateService {

    private final UsdKrwRepository usdKrwRepository;

    @Override
    public List<ExchangeRateRes> getExchangeRate(Date startDate, Date endDate, String code) {

        List<ExchangeRateRes> dtoList = new LinkedList<>();

        // code에 따라서 repository 구분하기
        if (code.equals("USD")) {
            List<UsdKrw> usdKrwList = usdKrwRepository.findByRegdateBetween(startDate, endDate);
            for (UsdKrw u : usdKrwList) {
                dtoList.add(ExchangeRateRes.of(u));
            }
        } else if (code.equals("JPY")) {

        } else if (code.equals("EUR")) {

        } else if (code.equals("GBP")) {

        } else if (code.equals("CNY")) {

        }

        return dtoList;
    }
}
