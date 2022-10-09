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
@ApiModel("NotificationFlagReq")
public class NotificationFlagReq {
	@ApiModelProperty(name="Uid", example="1")
	long Uid;
	@ApiModelProperty(name="on/off 값", example="flase")
	boolean flag;
}
