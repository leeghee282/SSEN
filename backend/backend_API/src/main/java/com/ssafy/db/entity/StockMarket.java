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
 * 증시
 */
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "stock_market")
public class StockMarket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "uid", columnDefinition = "int unsigned")
    private Long uid;
    @Column(name = "name", length = 15, nullable = false)
    private String name;
    @Column(name = "close_price", nullable = false)
    @ColumnDefault("0.00")
    private double closePrice;
    @Column(name = "high_price", nullable = false)
    @ColumnDefault("0.00")
    private double highPrice;
    @Column(name = "low_price", nullable = false)
    @ColumnDefault("0.00")
    private double lowPrice;
    @Column(name = "variance", nullable = false)
    @ColumnDefault("0.00")
    private double variance;
    @Column(name = "regdate", nullable = false)
    private LocalDateTime regdate;

}
