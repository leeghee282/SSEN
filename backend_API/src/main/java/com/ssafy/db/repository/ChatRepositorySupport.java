package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.api.service.CurrencyCategoryService;
import com.ssafy.db.entity.Chat;
import com.ssafy.db.entity.QChat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 유저 모델 관련 디비 쿼리 생성을 위한 구현 정의.
 */
@Repository
public class ChatRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    @Autowired
    CurrencyCategoryService currencyCategoryService;
    QChat qChat = QChat.chat;

    public Chat findChatByUId(long uid) {
        Chat chat = jpaQueryFactory.select(qChat).from(qChat).where(qChat.uid.eq(uid)).fetchOne();
        return chat;
    }

    public List<Chat> findChatList(long ccUid) {
        List<Chat> chatList = jpaQueryFactory.select(qChat).from(qChat).where(qChat.currencyCategory.uid.eq(ccUid)).orderBy(qChat.regdate.desc()).fetch();
        return chatList;
    }
}
