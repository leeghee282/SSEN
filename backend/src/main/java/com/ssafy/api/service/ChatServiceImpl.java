package com.ssafy.api.service;

import com.ssafy.api.request.ChatReq;
import com.ssafy.db.entity.Chat;
import com.ssafy.db.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;

/**
 * 유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("chatService")
public class ChatServiceImpl implements ChatService {
    @Autowired
    UserService userService;
    @Autowired
    CurrencyCategoryService currencyCategoryService;
    @Autowired
    ChatRepository chatRepository;

    @Override
    public boolean deleteChat(int uid) {
        return true;
    }


    @Override
    public Chat createChat(ChatReq chatInfo) {
        Chat chat = new Chat();
        long userUid = userService.getUserByNickname(chatInfo.getNickname()).getUid();
        LocalDateTime currentDateTime = LocalDateTime.now();
        Date date = java.sql.Timestamp.valueOf(currentDateTime);

       // Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        System.out.println("===========");
        System.out.println(date);
        System.out.println("===========");
        chat.setUser(userService.getUserByNickname(chatInfo.getNickname()));
        chat.setContent(chatInfo.getContent());
        chat.setCurrencyCategory(currencyCategoryService.getCurrencyCategorybyCode(chatInfo.getCurrencyCode()));
        chat.setRegdate(date);
        return chatRepository.save(chat);
    }
}
