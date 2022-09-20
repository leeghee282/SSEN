package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * 날짜별 키워드
 */
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "variance_keywords")
public class VarianceKeyword {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "uid", columnDefinition = "int unsigned")
    private Long uid;

    @Column(name = "name", length = 100, nullable = false)
    private String name;
    @Column(name = "frequency", columnDefinition = "int", nullable = false)
    private int frequency;

    // variance_date
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private VarianceDate varianceDate;

}
