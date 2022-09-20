package com.ssafy.db.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

/**
 * 국가별 상위 날짜
 */
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "variance_top")
public class VarianceTop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "uid")
    private Long uid;

    @Column(name = "country", length = 100, nullable = false)
    private String country;

    @Column(name = "variance", nullable = false)
    private double variance;

    // variance_date
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private VarianceDate varianceDate;

}
