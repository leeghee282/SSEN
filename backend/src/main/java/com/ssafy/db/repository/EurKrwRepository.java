package com.ssafy.db.repository;

import com.ssafy.db.entity.EurKrw;
import com.ssafy.db.entity.JpyKrw;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface EurKrwRepository extends JpaRepository<EurKrw, Long> {

    public List<EurKrw> findByRegdateBetween(Date startDate, Date endDate);
    public EurKrw findByRegdate(Date date);

}
