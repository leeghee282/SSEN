package com.ssafy.api.service;

import com.ssafy.api.response.CommissionRes;
import com.ssafy.api.response.ExchangeRateRes;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.LinkedList;
import java.util.List;



@Service
@RequiredArgsConstructor
@Transactional
public class ExchangeRateServiceImpl implements ExchangeRateService {

    private final UsdKrwRepository usdKrwRepository;
    private final JpyKrwRepository jpyKrwRepository;
    private final EurKrwRepository eurKrwRepository;
    private final GbpKrwRepository gbpKrwRepository;
    private final CnyKrwRepository cnyKrwRepository;
    private final CurrencyCategoryRepository currencyCategoryRepository;
    private final BankExchangeRateRepository bankExchangeRateRepository;



    @Override
    public List<ExchangeRateRes> getExchangeRatePeriod(Date startDate, Date endDate, String code) {

        List<ExchangeRateRes> dtoList = new LinkedList<>();

        // code에 따라서 repository 구분하기
        if (code.equals("USD")) {
            List<UsdKrw> usdKrwList = usdKrwRepository.findByRegdateBetween(startDate, endDate);
            for (UsdKrw u : usdKrwList) {
                dtoList.add(ExchangeRateRes.of(u));
            }
        } else if (code.equals("JPY")) {
            List<JpyKrw> jpyKrwList = jpyKrwRepository.findByRegdateBetween(startDate, endDate);
            for (JpyKrw j : jpyKrwList) {
                dtoList.add(ExchangeRateRes.of(j));
            }
        } else if (code.equals("EUR")) {
            List<EurKrw> eurKrwList = eurKrwRepository.findByRegdateBetween(startDate, endDate);
            for (EurKrw e : eurKrwList) {
                dtoList.add(ExchangeRateRes.of(e));
            }
        } else if (code.equals("GBP")) {
            List<GbpKrw> gbpKrwList = gbpKrwRepository.findByRegdateBetween(startDate, endDate);
            for (GbpKrw g : gbpKrwList) {
                dtoList.add(ExchangeRateRes.of(g));
            }
        } else if (code.equals("CNY")) {
            List<CnyKrw> cnyKrwList = cnyKrwRepository.findByRegdateBetween(startDate, endDate);
            for (CnyKrw c : cnyKrwList) {
                dtoList.add(ExchangeRateRes.of(c));
            }
        }
        return dtoList;
    }

    @Override
    public ExchangeRateRes getExchangeRateOneDay(Date date, String code) {
        ExchangeRateRes dto = null;
        // code에 따라서 repository 구분하기
        if (code.equals("USD")) {
            UsdKrw usdKrw = usdKrwRepository.findByRegdate(date);
            dto = ExchangeRateRes.of(usdKrw);
        } else if (code.equals("JPY")) {
            JpyKrw jpyKrw = jpyKrwRepository.findByRegdate(date);
            dto = ExchangeRateRes.of(jpyKrw);
        } else if (code.equals("EUR")) {
            EurKrw eurKrw = eurKrwRepository.findByRegdate(date);
            System.out.println(eurKrw==null?"null":"not null");
            System.out.println("=-=========================================================================================================");
            dto = ExchangeRateRes.of(eurKrw);
        } else if (code.equals("GBP")) {
            GbpKrw gbpKrw = gbpKrwRepository.findByRegdate(date);
            dto = ExchangeRateRes.of(gbpKrw);
        } else if (code.equals("CNY")) {
            CnyKrw cnyKrw = cnyKrwRepository.findByRegdate(date);
            dto = ExchangeRateRes.of(cnyKrw);
        }
        return dto;
    }

    @Override
    public List<CommissionRes> getCommission(String code) {
        List<CommissionRes> dtoList = new LinkedList<>();
        CurrencyCategory currencyCategory = currencyCategoryRepository.findByCode(code);
        List<BankExchangeRate> bankExchangeRateList = bankExchangeRateRepository.findByCurrencyCategory(currencyCategory);
        for (BankExchangeRate b : bankExchangeRateList) {
            dtoList.add(CommissionRes.of(b));
        }
        return dtoList;
    }

}
