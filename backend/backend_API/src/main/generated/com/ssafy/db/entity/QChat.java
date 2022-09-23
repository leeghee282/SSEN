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
public class QChat extends EntityPathBase<Chat> {

    private static final long serialVersionUID = 846542477L;

    public static final QChat chat = new QChat("chat");

    public final QBaseEntity _super = new QBaseEntity(this);

    public final StringPath department = createString("department");

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final StringPath content = createString("content");

    public final DatePath<Date> regDate = createDate("regDate", Date.class);


    public QChat(String variable) {
        super(Chat.class, forVariable(variable));
    }

    public QChat(Path<? extends Chat> path) {
        super(path.getType(), path.getMetadata());
    }

    public QChat(PathMetadata metadata) {
        super(Chat.class, metadata);
    }

}

