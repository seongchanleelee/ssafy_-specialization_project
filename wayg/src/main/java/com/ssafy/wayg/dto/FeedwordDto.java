package com.ssafy.wayg.dto;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * A DTO for the {@link com.ssafy.wayg.entity.Feedword} entity
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "", description = "")
public class FeedwordDto implements Serializable {
    private Integer feedwordNo;
    private String feedwordWord;
    private Integer feedwordCount;
    private Integer feedNo;
    private String feedwordName;
}