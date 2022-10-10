package com.ssafy.wayg.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.List;

/**
 * A DTO for the {@link com.ssafy.wayg.entity.Feed} entity
 */
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "Feed (피드정보)", description = "글번호(아이디), 제목, 내용, 좋아요 개수, 작성자 번호를 가진 Domain Class")
public class FeedDto implements Serializable {
	@ApiModelProperty(value = "글번호")
    private Integer feedNo;
	@ApiModelProperty(value = "제목")
    private String feedTitle;
	@ApiModelProperty(value = "내용")
    private String feedContent;
	@ApiModelProperty(value = "닉네임")
    private String feedNickname;
	@ApiModelProperty(value = "작성일")
	private Instant feedRegdate;
	@ApiModelProperty(value = "작성자 번호")
    private int userNo;
	@ApiModelProperty(value = "좋아요 개수")
    private long feedLike;
	@ApiModelProperty(value = "좋아요 여부")
	private boolean feedLikeYn;
	@ApiModelProperty(value = "장소 이름")
	private String feedPlacename;
	@ApiModelProperty(value = "사진 주소")
	private String feedFile;

}