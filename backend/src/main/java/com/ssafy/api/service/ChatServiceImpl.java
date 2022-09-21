package com.ssafy.api.service;

import com.ssafy.api.request.ChatReq;
import com.ssafy.api.response.ChatRes;
import com.ssafy.db.entity.Chat;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.ChatRepository;
import com.ssafy.db.repository.ChatRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

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
    @Autowired
    ChatRepositorySupport chatRepositorySupport;

    @Override
    public Chat createChat(ChatReq chatInfo) {
        Chat chat = new Chat();
        LocalDateTime currentDateTime = LocalDateTime.now();
        Date date = java.sql.Timestamp.valueOf(currentDateTime);
        User user = userService.getUserByNickname(chatInfo.getNickname());
        if (user == null) {
            System.out.println("회원이 없습니다. 실패");
            return null;
        } else {
            System.out.println("회원 있습니다. 성공");
        }
        chat.setUser(user);
        chat.setContent(chatInfo.getContent());
        chat.setCurrencyCategory(currencyCategoryService.getCurrencyCategorybyCode(chatInfo.getCurrencyCode()));
        chat.setRegdate(date);
        return chatRepository.save(chat);
    }

    @Override
    public Chat getChatbyUid(long uid) {
        Chat chat = chatRepositorySupport.findChatByUId(uid);
        return chat;
    }

    @Override
    public boolean deleteChat(long uid) {
        Chat chat = chatRepositorySupport.findChatByUId(uid);
        if (chat == null) return false;

        chatRepository.deleteByUid(uid);
        return true;

    }

    @Override
    public List<ChatRes> serchChatListByCode(long currencyCode) {
        List<ChatRes> chatList = new LinkedList<>();
        List<Chat> chats= chatRepositorySupport.findChatList(currencyCode);
        for (Chat c : chats){
            chatList.add(ChatRes.of(c));
        }

        return chatList;
    }
}
