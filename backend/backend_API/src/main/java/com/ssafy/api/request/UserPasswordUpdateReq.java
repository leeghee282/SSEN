package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 로그인 API ([POST] /api/v1/auth/login) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("UserPasswordUpdateReq")
public class UserPasswordUpdateReq {
	@ApiModelProperty(name="유저 ID", example="ssafy123")
	String userId;
	@ApiModelProperty(name="유저 Password", example="qlalsqjsfh123")
	String password;
	@ApiModelProperty(name="유저 new Password", example="123qlqjs")
	String newPassword;
}
