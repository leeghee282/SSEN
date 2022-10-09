package com.ssafy.db.repository;

import com.ssafy.api.response.InterestedCurrencyRes2;
import com.ssafy.db.entity.CurrencyCategory;
import com.ssafy.db.entity.HoldingCurrency;
import com.ssafy.db.entity.InterestedCurrency;
import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InterestedCurrencyRepository extends JpaRepository<InterestedCurrency, Long> {

    public InterestedCurrency findByUid(long uid);
    public List<InterestedCurrency> findByUser(User user);
    public InterestedCurrency findByUserAndCurrencyCategory(User user, CurrencyCategory category);
}
