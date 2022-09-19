package com.ssafy.db.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.Date;

/**
 * 중국 위안/원 환율
 */
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "cny_krw")
public class CnyKrw {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "uid", columnDefinition = "int unsigned")
    private Long uid;

    @Column(name = "regdate", nullable = false)
    private Date regdate;

    @Column(name = "close_price", nullable = false)
    @ColumnDefault("0.00")
    private double closePrice;
    @Column(name = "open_price", nullable = false)
    @ColumnDefault("0.00")
    private double OpenPrice;
    @Column(name = "high_price", nullable = false)
    @ColumnDefault("0.00")
    private double highPrice;
    @Column(name = "low_price", nullable = false)
    @ColumnDefault("0.00")
    private double lowPrice;
    @Column(name = "variance", nullable = false)
    @ColumnDefault("0.00")
    private double variance;

}
