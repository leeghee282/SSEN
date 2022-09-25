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
public class QStockMarket extends EntityPathBase<StockMarket> {

    private static final long serialVersionUID = 846542477L;

    public static final QStockMarket stockMarket = new QStockMarket("stockMarket");

    public final QBaseEntity _super = new QBaseEntity(this);


    //inherited
    public final StringPath name; = createString("name;");

    public final NumberPath<double> closePrice = createNumber("closePrice", double.class);

    public final NumberPath<double> highPrice = createNumber("highPrice", double.class);

    public final NumberPath<double> lowPrice = createNumber("lowPrice", double.class);

    public final NumberPath<double> variance = createNumber("variance", double.class);

    public final DatePath<Date> regDate = createDate("regDate", Date.class);


    public QStockMarket(String variable) {
        super(StockMarket.class, forVariable(variable));
    }

    public QStockMarket(Path<? extends StockMarket> path) {
        super(path.getType(), path.getMetadata());
    }

    public QStockMarket(PathMetadata metadata) {
        super(StockMarket.class, metadata);
    }

}

