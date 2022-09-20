package com.ssafy.db.repository;

import com.ssafy.db.entity.Chat;
import com.ssafy.db.entity.GbpKrw;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<Chat, Long> {

}
