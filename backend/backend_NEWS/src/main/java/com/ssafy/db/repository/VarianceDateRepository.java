package com.ssafy.db.repository;

import com.ssafy.db.entity.VarianceDate;
import com.ssafy.db.entity.VarianceTop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface VarianceDateRepository extends JpaRepository<VarianceDate, Long> {

    public VarianceDate findByUid(Long uid);

    public VarianceDate findByReferenceDate(Date date);
    
}
