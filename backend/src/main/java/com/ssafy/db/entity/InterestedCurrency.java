package com.ssafy.db.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.Date;

/**
 * 사용자 관심 통화
 */
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "interested_currencies")
public class InterestedCurrency {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "uid", columnDefinition = "int unsigned")
    private Long uid;
    @Column(name = "target1", nullable = true)
    @ColumnDefault("0.00")
    private double target1;
    @Column(name = "target2", nullable = true)
    @ColumnDefault("0.00")
    private double target2;
    @Column(name = "target3", nullable = true)
    @ColumnDefault("0.00")
    private double target3;

    //users
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private User user;

    // currency_categories
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private CurrencyCategory currencyCategory;



}
