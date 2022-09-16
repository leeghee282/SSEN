package com.ssafy.db.repository;

import com.ssafy.db.entity.JpyKrw;
import com.ssafy.db.entity.UsdKrw;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface JpyKrwRepository extends JpaRepository<JpyKrw, Long> {

    public List<JpyKrw> findByRegdateBetween(Date startDate, Date endDate);

}
