package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 회원가입 API ([POST] /api/users) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("UserRegisterPostRequest")
public class UserRegisterPostReq {
	@ApiModelProperty(name="유저 ID", example="ssafy123")
	String userId;
	@ApiModelProperty(name="유저 이름", example="김싸피")
	String name;
	@ApiModelProperty(name="유저 Password", example="qlalsqjfgh12")
	String password;
	@ApiModelProperty(name="유저 nickname", example="보이지않는 손")
	String nickname;
	@ApiModelProperty(name="유저 phone", example="01012341234")
	int phone;
	@ApiModelProperty(name="유저 email", example="ssafy123@saafy.com")
	String email;
}
