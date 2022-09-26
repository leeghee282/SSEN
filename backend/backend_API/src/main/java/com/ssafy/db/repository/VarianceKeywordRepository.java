package com.ssafy.db.repository;

import com.ssafy.db.entity.VarianceKeyword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface VarianceKeywordRepository extends JpaRepository<VarianceKeyword, Long> {

    public List<VarianceKeyword> findByNameOrderByFrequencyDesc(String name);

}
