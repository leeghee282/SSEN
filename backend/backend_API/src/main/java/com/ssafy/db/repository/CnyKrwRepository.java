package com.ssafy.db.repository;

import com.ssafy.db.entity.CnyKrw;
import com.ssafy.db.entity.EurKrw;
import com.ssafy.db.entity.GbpKrw;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface CnyKrwRepository extends JpaRepository<CnyKrw, Long> {

    public List<CnyKrw> findByRegdateBetween(Date startDate, Date endDate);
    public CnyKrw findByRegdate(Date date);
}
