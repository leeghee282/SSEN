package com.ssafy.api.service;

import com.ssafy.api.request.UserPasswordUpdateReq;
import com.ssafy.api.request.UserUpdateReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;
import com.ssafy.db.repository.UserRepositorySupport;

/**
 * 유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("userService")
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    UserRepositorySupport userRepositorySupport;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public User createUser(UserRegisterPostReq userRegisterInfo) {
        User user = new User();
        user.setUserId(userRegisterInfo.getUserId());
        user.setName(userRegisterInfo.getName());
        // 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
        user.setPassword(passwordEncoder.encode(userRegisterInfo.getPassword()));
        user.setNickname(userRegisterInfo.getNickname());
        user.setPhone(userRegisterInfo.getPhone());
        user.setEmail(userRegisterInfo.getEmail());
        return userRepository.save(user);
    }

    @Override
    public User getUserByUserId(String userId) {
        // 디비에 유저 정보 조회 (userId 를 통한 조회).
        if (!userRepository.findByUserId(userId).isPresent())
            return null;
        User user = userRepositorySupport.findUserByUserId(userId).get();
        return user;
    }

    @Override
    public User getUserByNickname(String nickname) {
        // 디비에 유저 정보 조회 (nickname 를 통한 조회).
        if (!userRepository.findByUserId(nickname).isPresent())
            return null;
        User user = userRepositorySupport.findUserByNickname(nickname).get();
        return user;
    }

    @Override
    public User updateUser(UserUpdateReq updateInfo) {
        User user = userRepository.findByUserId(updateInfo.getUserId()).get();

        user.setName(updateInfo.getName());
        user.setPhone(updateInfo.getPhone());
        user.setNickname(updateInfo.getNickname());
        user.setPhone(updateInfo.getPhone());
        user.setEmail(updateInfo.getEmail());
        return userRepository.save(user);

    }

    @Override
    public User updateUserPassword(UserPasswordUpdateReq passwordUpdateInfo) {
        User user = userRepository.findByUserId(passwordUpdateInfo.getUserId()).get();
        // user가 null이거나 현재 비밀번호가 틀렸을 때 null 리턴
        if(user == null || !passwordEncoder.matches(passwordUpdateInfo.getPassword(), user.getPassword()))
            return null;
        // 비밀번호만 수정
        user.setPassword(passwordEncoder.encode(passwordUpdateInfo.getNewPassword()));
        return userRepository.save(user);
    }

    @Override
    public boolean deleteUser(String userId) {
        User user = userRepository.findByUserId(userId).get();
        // user가 null이면 false 리턴
        if(user == null) return false;
        userRepository.deleteByUserId(userId);
        return true;
    }
}
