package com.ssafy.db.repository;

import com.ssafy.db.entity.BankExchangeRate;
import com.ssafy.db.entity.CnyKrw;
import com.ssafy.db.entity.CurrencyCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface BankExchangeRateRepository extends JpaRepository<BankExchangeRate, Long> {
    public List<BankExchangeRate> findByCurrencyCategory(CurrencyCategory currencyCategory);
}
