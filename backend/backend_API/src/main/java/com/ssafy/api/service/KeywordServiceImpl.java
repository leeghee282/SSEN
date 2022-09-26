package com.ssafy.api.service;

import com.ssafy.api.response.KeywordRes;
import com.ssafy.db.entity.VarianceKeyword;
import com.ssafy.db.repository.InterestedCurrencyRepository;
import com.ssafy.db.repository.VarianceKeywordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class KeywordServiceImpl implements KeywordService{

    private final VarianceKeywordRepository varianceKeywordRepository;

    @Override
    public List<KeywordRes> getKeywordListByName(String keyword) {
        List<KeywordRes> dtoList = new LinkedList<>();
        List<VarianceKeyword> varianceKeywordList = varianceKeywordRepository.findByNameOrderByFrequencyDesc(keyword);
        for (VarianceKeyword v: varianceKeywordList) {
            dtoList.add(KeywordRes.of(v));
        }
        return dtoList;
    }
}
