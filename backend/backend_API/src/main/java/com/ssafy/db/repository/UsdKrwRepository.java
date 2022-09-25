package com.ssafy.db.repository;

import com.ssafy.db.entity.UsdKrw;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface UsdKrwRepository extends JpaRepository<UsdKrw, Long> {
    public List<UsdKrw> findByRegdateBetween(Date startDate, Date endDate);
    public UsdKrw findByRegdate(Date date);

}
