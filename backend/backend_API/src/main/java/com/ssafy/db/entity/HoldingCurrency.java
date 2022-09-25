package com.ssafy.db.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

/**
 * 사용자 보유 통화
 */
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "holding_currencies")
public class HoldingCurrency {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "uid", columnDefinition = "int unsigned")
    private Long uid;
    @Column(name = "quantity", nullable = false)
    @ColumnDefault("0.00")
    private double quantity;
    @Column(name = "price", nullable = false)
    @ColumnDefault("0.00")
    private double price;

    //users
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private User user;

    // currency_categories
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private CurrencyCategory currencyCategory;

    public void patch(HoldingCurrency holdingCurrency){
        if(holdingCurrency.getPrice() != 0)
            this.price = holdingCurrency.getPrice();
        if(holdingCurrency.getQuantity() != 0)
            this.quantity = holdingCurrency.getQuantity();
    }


}
