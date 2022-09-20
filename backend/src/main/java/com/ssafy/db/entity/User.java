package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * 사용자
 */
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "uid", columnDefinition = "int unsigned")
    private Long uid;
    @Column(name = "user_id", length = 20, unique = true, nullable = false)
    private String userId;
    @Column(name = "nickname", length = 45, unique = true, nullable = false)
    private String nickname;
    @Column(name = "name", length = 45, nullable = false)
    private String name;
    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(name = "password", length = 300, nullable = false)
    private String password;
    @Column(name = "phone", length = 11, nullable = false)
    private String phone;
    @Column(name = "email", length = 100, nullable = false)
    private String email;
    @Column(name = "token", length = 200)
    private String token;

    // interested_currencies
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<InterestedCurrency> interestedCurrencyList = new ArrayList<InterestedCurrency>();

    // holding_currencies
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<HoldingCurrency> holdingCurrencyList = new ArrayList<HoldingCurrency>();

    // chat
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Chat> chatList = new ArrayList<Chat>();

}
