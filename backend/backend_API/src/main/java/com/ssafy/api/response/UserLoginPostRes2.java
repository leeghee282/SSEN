package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 로그인 API ([POST] /api/v1/auth) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@Builder
@ApiModel("UserLoginPostResponse2")
public class UserLoginPostRes2 extends BaseResponseBody{
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

	@ApiModelProperty(name="JWT 인증 토큰", example="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN...")
	String accessToken;


	public static UserLoginPostRes2 of(User user, String accessToken) {
		if (user == null) {
			return null;
		} else {
			return UserLoginPostRes2.builder()
					.uid(user.getUid())
					.userId(user.getUserId())
					.name(user.getName())
					.password(user.getPassword())
					.nickname(user.getNickname())
					.phone(user.getPhone())
					.email(user.getEmail())
					.accessToken(accessToken)
					.build();
		}
	}
}
