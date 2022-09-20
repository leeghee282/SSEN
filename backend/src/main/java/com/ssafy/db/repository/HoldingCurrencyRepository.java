package com.ssafy.db.repository;

import com.ssafy.db.entity.HoldingCurrency;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HoldingCurrencyRepository extends JpaRepository<HoldingCurrency, Long> {
}
