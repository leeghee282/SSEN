package com.ssafy.api.service;

import com.ssafy.api.response.HoldingCurrencyRes;
import com.ssafy.api.response.InterestedCurrencyRes;
import com.ssafy.db.entity.User;

import java.util.List;

public interface InterestedCurrService{
    List<InterestedCurrencyRes> getInterestedCurrByUser(User user);
}
