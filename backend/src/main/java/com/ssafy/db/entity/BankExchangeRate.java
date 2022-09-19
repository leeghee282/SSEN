package com.ssafy.db.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.Date;

/**
 * 은행별 환율
 */
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "bank_exchange_rate")
public class BankExchangeRate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "uid", columnDefinition = "int unsigned")
    private Long uid;
    @Column(name = "bank", nullable = false, length = 50)
    private String bank;
    @Column(name = "commission", nullable = false)
    @ColumnDefault("0.00")
    private double commission;
    @Column(name = "basic_rate", nullable = true, columnDefinition = "int(3)")
    private int basicRate;
    @Column(name = "max_rate", nullable = true, length = 200)
    private String maxRate;
    @Column(name = "rate_description", nullable = true, length = 3000)
    private String rateDescription;
    @Column(name = "reference_date", nullable = false)
    private Date referenceDate;

    // currency_categories
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private CurrencyCategory currencyCategory;

}