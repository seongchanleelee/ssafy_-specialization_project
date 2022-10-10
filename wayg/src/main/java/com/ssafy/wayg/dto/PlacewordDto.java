package com.ssafy.wayg.dto;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * A DTO for the {@link com.ssafy.wayg.entity.Placeword} entity
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "", description = "")
public class PlacewordDto implements Serializable {
    private Integer placewordNo;
    private String placewordName;
    private String placewordWord;
    private Integer placewordCount;
//    private Integer placeNo;
}