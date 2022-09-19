package com.ssafy.db.repository;

import com.ssafy.db.entity.BankExchangeRate;
import com.ssafy.db.entity.CurrencyCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CurrencyCategoryRepository extends JpaRepository<CurrencyCategory, Long> {

    public CurrencyCategory findByCode(String code);
}
