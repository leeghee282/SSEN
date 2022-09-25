package com.ssafy.db.repository;

import com.ssafy.db.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {
    @Transactional
    Optional<Chat> deleteByUid(long Uid);
}
