package com.ssafy.db.repository;

import com.ssafy.db.entity.EurKrw;
import com.ssafy.db.entity.GbpKrw;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface GbpKrwRepository extends JpaRepository<GbpKrw, Long> {

    public List<GbpKrw> findByRegdateBetween(Date startDate, Date endDate);
    public GbpKrw findByRegdate(Date date);
}
