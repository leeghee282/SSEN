package com.ssafy.db.repository;

import com.ssafy.db.entity.BankExchangeRate;
import com.ssafy.db.entity.CurrencyCategory;
import com.ssafy.db.entity.HoldingCurrency;
import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HoldingCurrencyRepository extends JpaRepository<HoldingCurrency, Long> {
    public List<HoldingCurrency> findByUser(User user);
}
