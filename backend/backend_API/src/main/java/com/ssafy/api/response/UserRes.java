package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 회원 본인 정보 조회 API ([GET] /api/v1/users/me) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("UserResponse")
public class UserRes {
    @ApiModelProperty(name = "유저 UID", example = "1")
    long uid;
    @ApiModelProperty(name = "유저 ID", example = "ssafy123")
    String userId;
    @ApiModelProperty(name = "유저 이름", example = "김싸피")
    String name;
    @ApiModelProperty(name = "유저 Password", example = "qlalsqjfgh12")
    String password;
    @ApiModelProperty(name = "유저 nickname", example = "보이지않는 손")
    String nickname;
    @ApiModelProperty(name = "유저 phone", example = "01012341234")
    String phone;
    @ApiModelProperty(name = "유저 email", example = "ssafy123@saafy.com")
    String email;

    public static UserRes of(Integer statusCode, String message, User user) {
        if (user == null) {
            return null;
        } else {
            UserRes res = new UserRes();
            res.setUid(user.getUid());
            res.setUserId(user.getUserId());
            res.setName(user.getName());
            res.setPassword(user.getPassword());
            res.setNickname(user.getNickname());
            res.setPhone(user.getPhone());
            res.setEmail(user.getEmail());

            return res;
        }
    }
}
