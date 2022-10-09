package com.ssafy.db.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.Date;

/**
 * 사용자 관심 통화
 */
@Entity
@Setter
@Getter
@Builder
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
    @Column(name = "notification", nullable = true)
    private boolean notification;

    //users
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private User user;

    // currency_categories
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private CurrencyCategory currencyCategory;

    public void setTarget(double[] target){
        if(target.length == 3){
            this.target1 = target[0];
            this.target2 = target[1];
            this.target3 = target[2];
        }
    }

    public void patch(InterestedCurrency interestedCurrency){
        if(interestedCurrency.getTarget1() != 0)
            this.target1 = interestedCurrency.getTarget1();
        if(interestedCurrency.getTarget2() != 0)
            this.target2 = interestedCurrency.getTarget2();
        if(interestedCurrency.getTarget3() != 0)
            this.target3 = interestedCurrency.getTarget3();
    }


}
