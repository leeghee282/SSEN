package com.ssafy.common.exception.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.ssafy.api.response.LiveCurrencyRes;
import com.ssafy.api.response.LiveUserRes;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class WebSocketHandler extends TextWebSocketHandler {

    private static final ConcurrentHashMap<String, WebSocketSession> CLIENTS = new ConcurrentHashMap<String, WebSocketSession>();
    Gson gson = new Gson();
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        CLIENTS.put(session.getId(), session);
    }

    public ConcurrentHashMap getWebsocketSession() {
        return CLIENTS;
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        CLIENTS.remove(session.getId());
    }
    //push 알림용
    public void handleTextMessage(LiveUserRes lurList) {

        CLIENTS.entrySet().forEach(arg -> {
            try {
                arg.getValue().sendMessage(new TextMessage(gson.toJson(lurList)));
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
    }
    //실시간 알림용
    public void handleTextMessage2(LiveCurrencyRes liveCurrencyRes) {
        CLIENTS.entrySet().forEach(arg -> {
            try {
                arg.getValue().sendMessage(new TextMessage(gson.toJson(liveCurrencyRes)));
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
    }

}