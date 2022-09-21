package com.ssafy.db.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * 통화 종류
 */
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "currency_categories")
public class CurrencyCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "uid", columnDefinition = "int unsigned")
    private Long uid;
    @Column(name = "name", length = 100, nullable = false)
    private String name;
    @Column(name = "code", columnDefinition = "char(3)", nullable = false)
    private String code;
    @Column(name = "country", length = 100, nullable = false)
    private String country;
    @Column(name = "unit", length = 50, nullable = false)
    private String unit;
    @Column(name = "img", length = 1500)
    private String img;

    // interested_currencies
    @OneToMany(mappedBy = "currencyCategory", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<InterestedCurrency> interestedCurrencyList = new ArrayList<InterestedCurrency>();

    // holding_currencies
    @OneToMany(mappedBy = "currencyCategory", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<HoldingCurrency> holdingCurrencyList = new ArrayList<HoldingCurrency>();

    // chat
    @OneToMany(mappedBy = "currencyCategory", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Chat> chatList = new ArrayList<Chat>();

    // interest_rate
    @OneToOne(mappedBy = "currencyCategory", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private InterestRate interestRate;

    // bank_exchange_rate
    @OneToMany(mappedBy = "currencyCategory", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<BankExchangeRate> bankExchangeRateList = new ArrayList<BankExchangeRate>();

}
