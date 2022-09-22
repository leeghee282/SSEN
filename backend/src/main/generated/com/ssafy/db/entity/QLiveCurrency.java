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
public class QLiveCurrency extends EntityPathBase<QLiveCurrency> {

    private static final long serialVersionUID = 846542477L;

    public static final QLiveCurrency liveCurrency = new QLiveCurrency("liveCurrency");

    public final QBaseEntity _super = new QBaseEntity(this);


    //inherited

    public final NumberPath<double> buyPrice = createNumber("buyPrice", double.class);

    public final NumberPath<double> sellPrice = createNumber("sellPrice", double.class);

    public final NumberPath<double> highPrice = createNumber("highPrice", double.class);

    public final NumberPath<double> lowPrice = createNumber("lowPrice", double.class);

    public final NumberPath<double> variancePrice = createNumber("variancePrice", double.class);

    public final NumberPath<double> variance = createNumber("variance", double.class);

    public final DatePath<Date> regDate = createDate("regDate", Date.class);


    public QLiveCurrency(String variable) {
        super(LiveCurrency.class, forVariable(variable));
    }

    public QLiveCurrency(Path<? extends LiveCurrency> path) {
        super(path.getType(), path.getMetadata());
    }

    public QLiveCurrency(PathMetadata metadata) {
        super(LiveCurrency.class, metadata);
    }

}

