package com.ssafy.wayg.dto;

import io.swagger.annotations.ApiModel;
import lombok.*;

import java.io.Serializable;

/**
 * A DTO for the {@link com.ssafy.wayg.entity.Feedlike} entity
 */
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "", description = "")
public class FeedlikeDto implements Serializable {
    private Integer likeNo;
    private Integer userNo;
    private Integer feedNo;
}