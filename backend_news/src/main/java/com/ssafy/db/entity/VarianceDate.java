package com.ssafy.db.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * 상위 날짜
 */
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "variance_date")
public class VarianceDate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "uid", columnDefinition = "int unsigned")
    private Long uid;

    @Column(name = "reference_date", nullable = false)
    private Date referenceDate;

    // variance_top
    @OneToMany(mappedBy = "varianceDate", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<VarianceTop> varianceTopList = new ArrayList<VarianceTop>();

    // variance_keywords
    @OneToMany(mappedBy = "varianceDate", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<VarianceKeyword> varianceKeywordList = new ArrayList<VarianceKeyword>();

}
