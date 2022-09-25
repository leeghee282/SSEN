package com.ssafy.db.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

/**
 * 실시간 환율
 */
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "live_currencies")
public class LiveCurrency {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "uid", columnDefinition = "int unsigned")
    private Long uid;
    @Column(name = "buy_price", nullable = false)
    @ColumnDefault("0.00")
    private double buyPrice;
    @Column(name = "sell_price", nullable = false)
    @ColumnDefault("0.00")
    private double sellPrice;
    @Column(name = "high_price", nullable = false)
    @ColumnDefault("0.00")
    private double highPrice;
    @Column(name = "low_price", nullable = false)
    @ColumnDefault("0.00")
    private double lowPrice;
    @Column(name = "variance_price", nullable = false)
    @ColumnDefault("0.00")
    private double variancePrice;
    @Column(name = "variance", nullable = false)
    @ColumnDefault("0.00")
    private double variance;
    @Column(name = "regdate", nullable = false)
    private LocalDateTime regdate;

    // currency_categories
    @OneToOne
    @JoinColumn(nullable = false)
    private CurrencyCategory currencyCategory;

}
