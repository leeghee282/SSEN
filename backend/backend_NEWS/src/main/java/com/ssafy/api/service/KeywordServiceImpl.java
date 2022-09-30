package com.ssafy.api.service;

import com.ssafy.db.entity.VarianceDate;
import com.ssafy.db.entity.VarianceTop;
import com.ssafy.db.repository.VarianceDateRepository;
import com.ssafy.db.repository.VarianceTopRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class KeywordServiceImpl implements KeywordService {

    private final VarianceTopRepository varianceTopRepository;
    private final VarianceDateRepository varianceDateRepository;

    @Override
    public VarianceTop getVarianceTopByDate(Date date) {
        VarianceDate varianceDate = varianceDateRepository.findByReferenceDate(date);
        List<VarianceTop> varianceTopList = varianceTopRepository.findByVarianceDateOrderByVarianceDesc(varianceDate);
        // 절댓값 가장 큰 것 찾기
        VarianceTop varianceTop = varianceTopList.get(0);
        for (int i = 1; i < varianceTopList.size(); i++) {
            VarianceTop elmt = varianceTopList.get(i);
            if (Math.abs(varianceTop.getVariance()) < Math.abs(elmt.getVariance())) {
                varianceTop = elmt;
            }
        }
        return varianceTop; // 절댓값 가장 큰 것 리턴
    }
}
