package com.ssafy.api.service;

import org.springframework.stereotype.Service;

/**
 * 유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("chatService")
public class ChatServiceImpl implements ChatService{
    @Override
    public boolean deleteChat(int uid) {
        return true;
    }
}
