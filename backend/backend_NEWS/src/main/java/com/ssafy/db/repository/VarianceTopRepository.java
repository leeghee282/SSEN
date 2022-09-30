package com.ssafy.db.repository;

import com.ssafy.db.entity.VarianceDate;
import com.ssafy.db.entity.VarianceTop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VarianceTopRepository extends JpaRepository<VarianceTop, Long> {

    public List<VarianceTop> findByVarianceDateOrderByVarianceDesc(VarianceDate varianceDate);

}
