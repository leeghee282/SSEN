package com.ssafy.api.service;

import com.ssafy.api.request.ChatReq;
import com.ssafy.api.response.ChatRes;
import com.ssafy.db.entity.Chat;

import java.util.List;

/**
 *	chat 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface ChatService {
    Chat createChat(ChatReq chatInfo);
    Chat getChatbyUid(long uid);
    boolean deleteChat(long uid);
    List<ChatRes> serchChatListByCode(long ccUid);
}
