package com.ssafy.api.service;

import com.ssafy.db.entity.CurrencyCategory;
import com.ssafy.db.entity.User;

/**
 *	CurrencyCategory 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface CurrencyCategoryService {
    CurrencyCategory getCurrencyCategorybyCode(String Code);
}
