package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QInterestRate extends EntityPathBase<Chat> {

    private static final long serialVersionUID = 846542477L;

    public static final QInterestRate interestRate = new QInterestRate("interestRate");

    public final QBaseEntity _super = new QBaseEntity(this);


    //inherited

    public final NumberPath<double> rate = createNumber("rate", double.class);

    public final DatePath<Date> regDate = createDate("regDate", Date.class);


    public QInterestRate(String variable) {
        super(InterestRate.class, forVariable(variable));
    }

    public QInterestRate(Path<? extends InterestRate> path) {
        super(path.getType(), path.getMetadata());
    }

    public QInterestRate(PathMetadata metadata) {
        super(InterestRate.class, metadata);
    }

}

